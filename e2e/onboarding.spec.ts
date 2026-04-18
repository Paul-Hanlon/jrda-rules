import { expect, Page, test } from '@playwright/test';

/** Returns a YYYY-MM-DD string for a DOB that yields approximately the requested age. */
function dobFor(age: number): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - age);
  d.setMonth(0, 15); // mid-January to avoid boundary flicker
  return d.toISOString().slice(0, 10);
}

async function startFresh(
  page: Page,
  opts: { auth?: boolean; parentOnboarding?: boolean } = {}
): Promise<void> {
  // Wipe local storage so the landing splash + onboarding both trigger.
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  if (opts.auth) {
    // `auth` flag defaults to false in Remote Config. Flip the dev override
    // for tests that specifically exercise the sign-in / sign-up step.
    await page.evaluate(() => localStorage.setItem('flag:auth', 'true'));
  }
  if (opts.parentOnboarding) {
    // `parentOnboarding` flag defaults to false — flip it on for tests that
    // exercise the parent/guardian onboarding path.
    await page.evaluate(() => localStorage.setItem('flag:parentOnboarding', 'true'));
  }
  await page.goto('/');
  // Dismiss the landing splash so tests can reach the onboarding flow.
  await page.getByRole('button', { name: /i'm new here — start/i }).click();
  await expect(page.getByRole('heading', { name: /welcome to derby rules/i })).toBeVisible();
}

async function pickSkater(page: Page): Promise<void> {
  await page.getByRole('button', { name: /i'm a skater/i }).click();
}

async function fillSkaterName(page: Page, name: string): Promise<void> {
  await expect(page.getByRole('heading', { name: /what's your derby name/i })).toBeVisible();
  await page.getByPlaceholder(/rolla fister/i).fill(name);
  await page.getByRole('button', { name: /^next$/i }).click();
}

async function fillSkaterNumber(page: Page, value: string): Promise<void> {
  await expect(page.getByRole('heading', { name: /what's your number/i })).toBeVisible();
  if (value) {
    await page.getByPlaceholder('42').fill(value);
  }
  await page.getByRole('button', { name: /^next$/i }).click();
}

async function fillDob(page: Page, age: number): Promise<void> {
  await expect(page.getByRole('heading', { name: /when's your birthday/i })).toBeVisible();
  await fillDobPicker(page, dobFor(age));
  await expect(page.locator('.age-pill')).toContainText(String(age));
}

/** Fills the custom day/month/year picker with a YYYY-MM-DD string. */
async function fillDobPicker(page: Page, iso: string, scope?: string): Promise<void> {
  const [year, month, day] = iso.split('-');
  const root = scope ? page.locator(scope) : page;
  await root.locator('[data-dob="day"]').fill(day);
  await root.locator('[data-dob="month"]').fill(month);
  await root.locator('[data-dob="year"]').fill(year);
}

test.describe('Onboarding — Derby Rules', () => {
  test('Welcome screen defaults: skater only; parent + sign-in hidden (flags off)', async ({ page }) => {
    await startFresh(page);
    await expect(page.getByRole('button', { name: /i'm a skater/i })).toBeVisible();
    // parentOnboarding flag off by default → no parent entry.
    await expect(page.getByRole('button', { name: /i'm a parent or guardian/i })).toHaveCount(0);
    // auth flag off by default → no sign-in link.
    await expect(page.getByRole('button', { name: /already have an account\? sign in/i })).toHaveCount(0);
  });

  test('Welcome screen shows parent entry when parentOnboarding flag is on', async ({ page }) => {
    await startFresh(page, { parentOnboarding: true });
    await expect(page.getByRole('button', { name: /i'm a parent or guardian/i })).toBeVisible();
  });

  test('Welcome screen shows sign-in link when auth flag is on', async ({ page }) => {
    await startFresh(page, { auth: true });
    await expect(page.getByRole('button', { name: /already have an account\? sign in/i })).toBeVisible();
  });

  test('Auth flag off: adult flow finishes directly after team (no account step)', async ({ page }) => {
    await startFresh(page);
    await pickSkater(page);
    await fillSkaterName(page, 'Flag Off');
    await page.getByRole('button', { name: /skip for now/i }).click();
    await fillDob(page, 25);
    await page.getByRole('button', { name: /^next$/i }).click();

    // Team is the last step when auth is off.
    await expect(page.locator('.kicker').filter({ hasText: /last step/i })).toBeVisible();
    await expect(page.locator('.step-count')).toHaveText('5/5');
    await page.getByRole('button', { name: /^next$/i }).click();

    // Lands straight on the dashboard — no account prompt.
    await expect(page.getByRole('heading', { name: /save progress across devices/i })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Flag Off', exact: true })).toBeVisible();
  });

  test('Landing splash shows first, primary CTA advances to onboarding', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/');

    // Splash renders the hero
    await expect(page.locator('.plate')).toHaveText(/roller derby · rules \+ glossary/i);
    await expect(page.locator('.title')).toContainText(/learn/i);
    await expect(page.locator('.title .mark')).toHaveText('rules');
    await expect(page.locator('.title em')).toHaveText(/fearless/i);

    // Stats grid — 3 cards, middle one inverted
    const stats = page.locator('.stat');
    await expect(stats).toHaveCount(3);
    await expect(stats.nth(1)).toHaveClass(/stat--primary/);

    // Both CTAs present; ticker is aria-hidden
    await expect(page.getByRole('button', { name: /i'm new here — start/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /i've been here before/i })).toBeVisible();
    await expect(page.locator('.ticker')).toHaveAttribute('aria-hidden', 'true');

    // Primary CTA flips the `landed` flag and advances to onboarding welcome
    await page.getByRole('button', { name: /i'm new here — start/i }).click();
    await expect(page.getByRole('heading', { name: /welcome to derby rules/i })).toBeVisible();

    // Reloading keeps the user past the landing (landed is persisted)
    await page.reload();
    await expect(page.getByRole('heading', { name: /welcome to derby rules/i })).toBeVisible();
    await expect(page.locator('.plate')).toHaveCount(0);
  });

  test('Icons render SVG path children (regression guard for sanitizer stripping)', async ({ page }) => {
    await startFresh(page);
    // Skater choice card has a helmet icon; it must have rendered path children.
    const card = page.getByRole('button', { name: /i'm a skater/i });
    await expect(card.locator('app-icon svg path').first()).toBeVisible();
    // Count SVG children across all icons on the welcome screen.
    const svgChildren = await page.locator('app-icon svg *').count();
    expect(svgChildren).toBeGreaterThan(0);
  });

  test('Adult skater (18) → team → account → skip → dashboard (level skipped for adults)', async ({ page }) => {
    await startFresh(page, { auth: true });
    await pickSkater(page);
    await fillSkaterName(page, 'Adult Smash');
    await fillSkaterNumber(page, '7');
    await fillDob(page, 18);
    await page.getByRole('button', { name: /^next$/i }).click();

    // Team step (optional) — adults jump from team straight to account.
    await expect(page.getByRole('heading', { name: /what team do you skate with/i })).toBeVisible();
    await page.getByPlaceholder(/iron jaws jr/i).fill('Derby Dolls');
    await page.getByRole('button', { name: /^next$/i }).click();

    // Account prompt (no level step for adults)
    await expect(page.getByRole('heading', { name: /save progress across devices/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /continue with google/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /use email instead/i })).toBeVisible();

    await page.getByRole('button', { name: /skip for now/i }).click();

    // Lands on dashboard with skater card
    await expect(page.getByRole('heading', { name: 'Adult Smash', exact: true })).toBeVisible();
    await expect(page.getByText(/adult derby/i).first()).toBeVisible();
    await expect(page.getByText(/derby dolls/i).first()).toBeVisible();
  });

  test('Junior skater (14) → L2 → account skip → dashboard shows junior badge', async ({ page }) => {
    await startFresh(page, { auth: true });
    await pickSkater(page);
    await fillSkaterName(page, 'Rolla Junior');
    await fillSkaterNumber(page, '42');
    await fillDob(page, 14);
    await page.getByRole('button', { name: /^next$/i }).click();

    // Team
    await page.getByRole('button', { name: /^skip$/i }).click();

    // Level choices visible for junior
    await expect(page.getByRole('heading', { name: /where are you at/i })).toBeVisible();
    await page.getByRole('button', { name: /level 2 — limited contact/i }).click();
    await page.getByRole('button', { name: /start skating/i }).click();

    // Account → skip
    await page.getByRole('button', { name: /skip for now/i }).click();

    await expect(page.getByRole('heading', { name: 'Rolla Junior', exact: true })).toBeVisible();
    await expect(page.getByText(/junior · l2/i).first()).toBeVisible();
  });

  test('Under-13 skater sees the parent hand-off screen', async ({ page }) => {
    await startFresh(page);
    await pickSkater(page);
    await fillSkaterName(page, 'Tiny Wheels');
    await page.getByRole('button', { name: /skip for now/i }).click();
    await fillDob(page, 10);
    await page.getByRole('button', { name: /^next$/i }).click();

    // Share-with-parent screen
    await expect(
      page.getByRole('heading', { name: /you're under 13, so a parent needs to set this up/i })
    ).toBeVisible();
    await expect(page.locator('.handoff-code')).toHaveText(/^\d{6}$/);
    await expect(page.getByRole('button', { name: /text it/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /email it/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /copy link/i })).toBeVisible();
    // parentOnboarding flag off (default) → no "my parent is here" CTA.
    await expect(page.getByRole('button', { name: /my parent is here/i })).toHaveCount(0);
  });

  test('Under-13 "my parent is here" jumps into parent flow pre-seeded', async ({ page }) => {
    await startFresh(page, { parentOnboarding: true });
    await pickSkater(page);
    await fillSkaterName(page, 'Tiny Wheels');
    await page.getByRole('button', { name: /skip for now/i }).click();
    await fillDob(page, 10);
    await page.getByRole('button', { name: /^next$/i }).click();

    await page.getByRole('button', { name: /my parent is here/i }).click();
    await expect(page.getByRole('heading', { name: /who are we setting up/i })).toBeVisible();
    await expect(page.locator('#jr-name')).toHaveValue('Tiny Wheels');
  });

  test('Parent flow — add two juniors, finish, account skip, dashboard', async ({ page }) => {
    await startFresh(page, { auth: true, parentOnboarding: true });
    await page.getByRole('button', { name: /i'm a parent or guardian/i }).click();

    // Parent intro
    await expect(page.getByRole('heading', { name: /let's set up your junior skater/i })).toBeVisible();
    await page.getByRole('button', { name: /add first junior/i }).click();

    // First junior
    await page.locator('#jr-name').fill('Speedy Pete');
    await page.locator('#jr-number').fill('9');
    await fillDobPicker(page, dobFor(10));
    await page.locator('#jr-team').fill('Iron Jaws Jr.');
    await page.getByRole('radio', { name: 'L1' }).click();
    await page.getByRole('button', { name: /add skater/i }).click();

    // Junior add more
    await expect(page.getByRole('heading', { name: /any others to add/i })).toBeVisible();
    await expect(page.getByText('Speedy Pete')).toBeVisible();
    await page.getByRole('button', { name: /add another junior/i }).click();

    // Second junior
    await page.locator('#jr-name').fill('Quick Kid');
    await fillDobPicker(page, dobFor(8));
    await page.getByRole('radio', { name: 'L3' }).click();
    await page.getByRole('button', { name: /add skater/i }).click();

    await expect(page.getByText('Speedy Pete')).toBeVisible();
    await expect(page.getByText('Quick Kid')).toBeVisible();

    // Finish → account prompt → skip
    await page.getByRole('button', { name: /we're done — finish setup/i }).click();
    await expect(page.getByRole('heading', { name: /save progress across devices/i })).toBeVisible();
    await page.getByRole('button', { name: /skip for now — keep it local/i }).click();

    // Parents land on the custodian dashboard (not the skater dashboard).
    await expect(page).toHaveURL(/\/custodian$|\/$/);
    await expect(page.getByRole('heading', { name: /your skaters/i })).toBeVisible();
    // Both juniors render as cards.
    await expect(page.locator('app-junior-card')).toHaveCount(2);
    await expect(page.getByText('Speedy Pete')).toBeVisible();
    await expect(page.getByText('Quick Kid')).toBeVisible();
    await expect(page.getByText(/iron jaws jr\./i).first()).toBeVisible();
  });

  test('Custodian: create login + reveal PIN + step into junior', async ({ page }) => {
    await startFresh(page, { auth: true, parentOnboarding: true });
    await page.getByRole('button', { name: /i'm a parent or guardian/i }).click();
    await page.getByRole('button', { name: /add first junior/i }).click();

    // First junior
    await page.locator('#jr-name').fill('Test Kid');
    await page.locator('#jr-number').fill('42');
    await fillDobPicker(page, dobFor(11));
    await page.locator('#jr-team').fill('Iron Jaws Jr.');
    await page.getByRole('radio', { name: 'L2' }).click();
    await page.getByRole('button', { name: /add skater/i }).click();

    // Finish parent flow + skip account
    await page.getByRole('button', { name: /we're done — finish setup/i }).click();
    await page.getByRole('button', { name: /skip for now — keep it local/i }).click();

    // Land on custodian
    await expect(page.getByRole('heading', { name: /your skater$/i })).toBeVisible();
    const card = page.locator('app-junior-card').first();
    await expect(card).toBeVisible();

    // Initial state: no login → Create login CTA
    await expect(card.getByRole('button', { name: /create login/i })).toBeVisible();
    await card.getByRole('button', { name: /create login/i }).click();

    // Form: username auto-slugged, PIN inputs in a row
    const usernameInput = card.locator('input[type="text"].mono').first();
    await expect(usernameInput).toHaveValue('test-kid');
    const pinInputs = card.locator('.pin-input');
    await expect(pinInputs).toHaveCount(4);

    // Enter PIN — advances focus automatically.
    await pinInputs.nth(0).fill('1');
    await pinInputs.nth(1).fill('2');
    await pinInputs.nth(2).fill('3');
    await pinInputs.nth(3).fill('4');

    // Save
    await card.getByRole('button', { name: /^create login$/i }).click();

    // Credential card visible. PIN is revealed on first save.
    await expect(card.locator('.cred-product')).toHaveText(/derby rules app/i);
    await expect(card.locator('.cred-value')).toHaveText('test-kid');
    await expect(card.locator('.pin-tile').first()).toHaveText('1');

    // Hide toggle
    await card.getByRole('button', { name: /hide pin/i }).click();
    await expect(card.locator('.pin-tile').first()).toHaveText('•');

    // Done collapses back to CTA
    await card.getByRole('button', { name: /^done$/i }).click();
    await expect(card.getByRole('button', { name: /create login/i })).toBeVisible();

    // Step into junior from the card header — lands on skater dashboard with parent banner.
    await card.locator('.head').click();
    await expect(page).toHaveURL(/\/$/);

    // SKATER dashboard renders (not custodian) because inJuniorView flipped.
    await expect(page.locator('app-dashboard')).toBeVisible();
    await expect(page.locator('app-custodian-dashboard')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Test Kid', exact: true })).toBeVisible();

    // Parent-mode banner visible over the skater dashboard (stepped in).
    await expect(page.locator('.parent-banner')).toContainText(/parent mode · viewing test kid/i);

    // On /rules the banner still shows.
    await page.goto('/rules');
    await expect(page.locator('.parent-banner')).toContainText(/parent mode · viewing test kid/i);
    await expect(page.getByRole('button', { name: /back to parent dashboard/i })).toBeVisible();

    // Click the banner button → back to custodian; banner goes away.
    await page.getByRole('button', { name: /back to parent dashboard/i }).click();
    await expect(page).toHaveURL(/\/custodian$/);
    await expect(page.locator('.parent-banner')).toHaveCount(0);
  });

  test('Custodian: login strip hidden when auth flag is off', async ({ page }) => {
    await startFresh(page, { parentOnboarding: true });
    await page.getByRole('button', { name: /i'm a parent or guardian/i }).click();
    await page.getByRole('button', { name: /add first junior/i }).click();

    await page.locator('#jr-name').fill('No Auth');
    await fillDobPicker(page, dobFor(10));
    await page.getByRole('radio', { name: 'L1' }).click();
    await page.getByRole('button', { name: /add skater/i }).click();
    await page.getByRole('button', { name: /we're done — finish setup/i }).click();

    // With auth off, finishParent navigates directly — no account prompt.
    await expect(page).toHaveURL(/\/custodian$|\/$/);

    const card = page.locator('app-junior-card').first();
    await expect(card).toBeVisible();
    // No login strip, no Create-login CTA when auth is off.
    await expect(card.locator('.login-strip')).toHaveCount(0);
    await expect(card.getByRole('button', { name: /create login/i })).toHaveCount(0);
  });

  test('Back button walks through history from dob', async ({ page }) => {
    await startFresh(page);
    await pickSkater(page);
    await fillSkaterName(page, 'Back Track');
    await fillSkaterNumber(page, '88');
    // On DOB step now
    await page.getByRole('button', { name: /^back$/i }).click();
    await expect(page.getByRole('heading', { name: /what's your number/i })).toBeVisible();
    await page.getByRole('button', { name: /^back$/i }).click();
    await expect(page.getByRole('heading', { name: /what's your derby name/i })).toBeVisible();
    await expect(page.getByPlaceholder(/rolla fister/i)).toHaveValue('Back Track');
  });

  test('Email form exposes signup ↔ signin toggle and requires 6-char password', async ({
    page,
  }) => {
    await startFresh(page, { auth: true });
    await pickSkater(page);
    await fillSkaterName(page, 'Form Test');
    await page.getByRole('button', { name: /skip for now/i }).click();
    await fillDob(page, 25);
    await page.getByRole('button', { name: /^next$/i }).click();
    // Adults skip level; Skip on team lands directly on the account step.
    await page.getByRole('button', { name: /^skip$/i }).click();

    await page.getByRole('button', { name: /use email instead/i }).click();
    const form = page.locator('.email-form');
    await expect(form.locator('.seg').filter({ hasText: 'Create account' })).toBeVisible();
    await expect(form.locator('.seg').filter({ hasText: 'Sign in' })).toBeVisible();

    const submit = form.locator('button[type="submit"]');
    await page.locator('#onb-email').fill('bad');
    await page.locator('#onb-password').fill('12345');
    await expect(submit).toBeDisabled();

    await page.locator('#onb-email').fill('test@example.com');
    await page.locator('#onb-password').fill('123456');
    await expect(submit).toBeEnabled();
  });

  test('"Already have an account? Sign in" shows sign-in-only screen', async ({ page }) => {
    await startFresh(page, { auth: true });
    await page.getByRole('button', { name: /already have an account\? sign in/i }).click();

    // Correct copy for a returning user
    await expect(page.getByRole('heading', { name: /sign in to your account/i })).toBeVisible();
    await expect(page.getByText(/restore your profile and progress/i)).toBeVisible();

    // Sign-in controls present
    await expect(page.getByRole('button', { name: /continue with google/i })).toBeVisible();
    const form = page.locator('.email-form');
    await expect(form.locator('button[type="submit"]')).toHaveText(/sign in/i);

    // Things that DO NOT belong on a sign-in screen
    await expect(page.getByRole('button', { name: /^skip for now/i })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /use email instead/i })).toHaveCount(0);
    await expect(form.locator('.seg').filter({ hasText: 'Create account' })).toHaveCount(0);
    await expect(page.locator('.bar')).toHaveCount(0);

    // Back returns to welcome with fresh state
    await page.getByRole('button', { name: /^back$/i }).click();
    await expect(page.getByRole('heading', { name: /welcome to derby rules/i })).toBeVisible();
  });

  test('Profile screen — hero, read-only fields, junior block toggle', async ({ page }) => {
    // Set up a junior skater so the junior block is visible on the profile.
    await startFresh(page);
    await pickSkater(page);
    await fillSkaterName(page, 'Judy Junior');
    await fillSkaterNumber(page, '11');
    await fillDob(page, 14);
    await page.getByRole('button', { name: /^next$/i }).click();
    await page.getByPlaceholder(/iron jaws jr/i).fill('Iron Jaws Jr.');
    await page.getByRole('button', { name: /^next$/i }).click();
    await page.getByRole('button', { name: /level 2 — limited contact/i }).click();
    await page.getByRole('button', { name: /start skating/i }).click();

    // Navigate to profile via header button
    await page.getByRole('button', { name: /judy junior/i }).click();
    await expect(page).toHaveURL(/\/profile$/);

    // Hero: skate name + role chip including age, team chip
    await expect(page.locator('.hero-name')).toHaveText('Judy Junior');
    await expect(page.locator('.chip-accent')).toContainText(/junior · age 14/i);
    await expect(page.locator('.chip-outline')).toContainText('Iron Jaws Jr.');

    // Read-only fields visible when NOT editing (4 always-present labels)
    await expect(page.locator('.field-label')).toHaveCount(4);
    await expect(page.locator('.field-readonly').nth(0)).toHaveText('Judy Junior');
    await expect(page.locator('.field-readonly').nth(1)).toHaveText('11');
    await expect(page.locator('.field-readonly').nth(2)).toHaveText('14');
    await expect(page.locator('.field-readonly').nth(3)).toHaveText('Iron Jaws Jr.');

    // Edit button is in the Details header, not the hero
    await expect(page.locator('.hero .btn')).toHaveCount(0);
    await expect(page.locator('.details-head .btn')).toBeVisible();

    // Junior block visible (age 14)
    await expect(page.getByText(/tailors rules to your level/i)).toBeVisible();
    await expect(page.getByText(/adjusts rule language/i)).toBeVisible();
    await expect(page.getByRole('radio', { name: /l2 · intermediate/i })).toHaveAttribute(
      'aria-checked',
      'true'
    );

    // Enter edit mode — fields become inputs
    await page.locator('.details-head').getByRole('button', { name: /edit/i }).click();
    await expect(page.locator('.field input')).toHaveCount(4);

    // Edit age to 22 (adult) and save — junior block should vanish on reload
    await page.locator('input[name="age"]').fill('22');
    await page.getByRole('button', { name: /^save$/i }).click();

    await expect(page.locator('.chip-accent')).toContainText(/adult · age 22/i);
    await expect(page.getByText(/tailors rules to your level/i)).toHaveCount(0);
    await expect(page.getByText(/adjusts rule language/i)).toHaveCount(0);

    // Progress strip renders
    await expect(page.locator('.progress-strip h2')).toHaveText('Progress');
    await expect(page.locator('.stat-tile')).toHaveCount(3);
  });

  async function seedAdultSkaterAndLand(page: Page): Promise<void> {
    await pickSkater(page);
    await fillSkaterName(page, 'Jam Tester');
    await page.getByRole('button', { name: /skip for now/i }).click();
    await fillDob(page, 22);
    await page.getByRole('button', { name: /^next$/i }).click();
    // Adults skip level; with `auth` flag off (default) team Skip finishes onboarding.
    await page.getByRole('button', { name: /^skip$/i }).click();
  }

  test('Daily Jam renders; Badges card hidden by default (flag off)', async ({ page }) => {
    await startFresh(page);
    await seedAdultSkaterAndLand(page);

    // Daily Jam card is always on
    const jam = page.locator('.jam-card');
    await expect(jam).toBeVisible();
    await expect(jam.locator('.kicker')).toHaveText(/daily jam/i);
    await expect(jam.locator('h3')).not.toBeEmpty();
    await expect(jam.getByRole('link', { name: /play today's jam/i })).toHaveAttribute(
      'href',
      /\/quizzes\/daily$/
    );

    // Badges card is gated on Remote Config `badge` — default false → hidden.
    await expect(page.locator('.badges-card')).toHaveCount(0);

    // Clicking the Daily Jam link navigates to the daily quiz runner
    await jam.getByRole('link', { name: /play today's jam/i }).click();
    await expect(page).toHaveURL(/\/quizzes\/daily$/);
    await expect(page.getByText(/Daily Jam/).first()).toBeVisible();
    await expect(page.getByText(/question 1 of 1/i)).toBeVisible();
  });

  test('Badges card appears when the badge flag is overridden to true', async ({ page }) => {
    await startFresh(page);
    // Flip the dev/test override — remote config reads localStorage first.
    await page.evaluate(() => localStorage.setItem('flag:badge', 'true'));
    await seedAdultSkaterAndLand(page);

    const badges = page.locator('.badges-card');
    await expect(badges).toBeVisible();
    await expect(badges.locator('.chip')).toHaveCount(4);
    await expect(badges.locator('.chip-locked')).toHaveCount(4);
    await expect(badges.locator('.badges-count')).toContainText('0 / 4');
  });

  test('Rules pages: browser cards + section expand/read/fragment', async ({ page }) => {
    await startFresh(page);
    await seedAdultSkaterAndLand(page);

    // Navigate to the Rules Browser via the header
    await page.getByRole('link', { name: /^rules$/i }).first().click();
    await expect(page).toHaveURL(/\/rules$/);

    // Page head
    await expect(page.getByRole('heading', { name: /official jrda rules/i })).toBeVisible();
    await expect(page.locator('.page-head .intro')).toContainText(/filtered for/i);

    // Section cards: number plate alternation + no emoji
    const cards = page.locator('.section-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(1);
    await expect(cards.nth(0).locator('.num-plate')).toHaveClass(/even/);
    await expect(cards.nth(1).locator('.num-plate')).toHaveClass(/odd/);
    // Number plate shows the section number
    await expect(cards.nth(0).locator('.num')).not.toBeEmpty();
    // Chip row has "N rules" at minimum
    await expect(cards.nth(0).locator('.chip-neutral')).toContainText(/rule/i);

    // Capture first section id from its href for the detail navigation
    const firstHref = await cards.nth(0).getAttribute('href');
    expect(firstHref).toMatch(/^\/rules\//);

    // Drill into the first section
    await cards.nth(0).click();
    await expect(page).toHaveURL(new RegExp(firstHref + '$'));

    // Breadcrumb + page-head on section page
    await expect(page.locator('.crumbs a')).toHaveText(/rules/i);
    await expect(page.locator('.page-head .kicker')).toContainText(/section/i);

    // First rule is expanded by default
    const firstRule = page.locator('.rule-item').first();
    await expect(firstRule).toHaveClass(/\bopen\b/);
    await expect(firstRule.locator('.rule-body')).toBeVisible();

    // Mark-as-read flips the pill + thickens the left border
    await expect(firstRule).not.toHaveClass(/\bread\b/);
    await firstRule.getByRole('button', { name: /mark as read/i }).click();
    await expect(firstRule).toHaveClass(/\bread\b/);
    await expect(firstRule.locator('.pill-success')).toHaveText(/read/i);

    // Collapse / expand the header button
    await firstRule.locator('.rule-header').click();
    await expect(firstRule).not.toHaveClass(/\bopen\b/);
    await firstRule.locator('.rule-header').click();
    await expect(firstRule).toHaveClass(/\bopen\b/);
  });

  test('Rule fragment auto-expands the targeted rule', async ({ page }) => {
    await startFresh(page);
    await seedAdultSkaterAndLand(page);

    // Discover the first section's id from the browser so we don't hard-code it
    await page.getByRole('link', { name: /^rules$/i }).first().click();
    const href = await page.locator('.section-card').first().getAttribute('href');
    expect(href).toMatch(/^\/rules\//);
    // Grab the second rule's number, then land on the page with that fragment.
    await page.goto(href!);
    const ruleCount = await page.locator('.rule-item').count();
    if (ruleCount < 2) test.skip();
    const secondRuleId = await page.locator('.rule-item').nth(1).getAttribute('id');
    const secondNumber = secondRuleId?.replace('rule-', '');
    expect(secondNumber).toBeTruthy();

    await page.goto(`${href}#${secondNumber}`);

    // Targeted rule should be expanded, even though the default is the first rule.
    // Use attribute selector because rule ids contain dots (e.g. "rule-1.2").
    const target = page.locator(`[id="rule-${secondNumber}"]`);
    await expect(target).toHaveClass(/\bopen\b/);
    await expect(target.locator('.rule-body')).toBeVisible();
  });

  test('Glossary: search filter + list expand marks viewed + flashcard flip + Got it', async ({
    page,
  }) => {
    await startFresh(page);
    await seedAdultSkaterAndLand(page);

    // Navigate to /glossary via header
    await page.getByRole('link', { name: /^glossary$/i }).first().click();
    await expect(page).toHaveURL(/\/glossary$/);

    // Page head + toolbar
    await expect(page.getByRole('heading', { name: /^glossary$/i })).toBeVisible();
    await expect(page.locator('.search input')).toBeVisible();
    const modeBtn = page.getByRole('button', { name: /flashcards|list view/i });
    await expect(modeBtn).toHaveText(/flashcards/i);

    // Expand the first term — check icon appears after (marks viewed)
    const firstCard = page.locator('.term-card').first();
    await expect(firstCard).not.toHaveClass(/\bopen\b/);
    await firstCard.locator('.term-header').click();
    await expect(firstCard).toHaveClass(/\bopen\b/);
    await expect(firstCard.locator('.term-body')).toBeVisible();
    await expect(firstCard.locator('.viewed')).toBeVisible();

    // Collapse — viewed stays, but body hides
    await firstCard.locator('.term-header').click();
    await expect(firstCard).not.toHaveClass(/\bopen\b/);
    await expect(firstCard.locator('.viewed')).toBeVisible();

    // Search: narrow the list, then clear
    const baselineCount = await page.locator('.term-card').count();
    expect(baselineCount).toBeGreaterThan(1);
    await page.locator('.search input').fill('zzzzzz-nonsense');
    await expect(page.locator('.empty')).toContainText(/no terms match/i);
    await page.locator('.search input').fill('');
    await expect(page.locator('.term-card')).toHaveCount(baselineCount);

    // Flashcard mode
    await modeBtn.click();
    await expect(page.locator('.flash-frame')).toBeVisible();
    const counter = page.locator('.face-front .kicker');
    const firstTerm = await page.locator('.face-front h2').textContent();
    await expect(counter).toContainText(/term 1 \//i);

    // Flip via click → back face reveals
    await page.locator('.flash-frame').click();
    await expect(page.locator('.flash-inner')).toHaveClass(/\bflipped\b/);
    await expect(page.locator('.kicker-accent')).toHaveText('Definition');

    // "Got it!" advances to the next term and returns to the front face
    await page.getByRole('button', { name: /got it!/i }).click();
    await expect(page.locator('.flash-inner')).not.toHaveClass(/\bflipped\b/);
    await expect(counter).toContainText(/term 2 \//i);
    const secondTerm = await page.locator('.face-front h2').textContent();
    expect(secondTerm).not.toEqual(firstTerm);
  });

  test('Quiz flow: topic picker → play → results ring + review → retake', async ({ page }) => {
    await startFresh(page);
    await seedAdultSkaterAndLand(page);

    await page.getByRole('link', { name: /^quizzes$/i }).first().click();
    await expect(page).toHaveURL(/\/quizzes$/);

    // Topic list renders cards with jersey numbers + START/RETAKE CTA
    await expect(page.getByRole('heading', { name: /^quizzes$/i })).toBeVisible();
    const cards = page.locator('.topic-card');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
    await expect(cards.nth(0).locator('.cta-label')).toHaveText(/start quiz/i);
    // No best chip before any runs
    await expect(cards.nth(0).locator('.best-chip')).toHaveCount(0);

    // Enter the first topic
    const topicHref = await cards.nth(0).getAttribute('href');
    expect(topicHref).toMatch(/^\/quizzes\//);
    await cards.nth(0).click();
    await expect(page).toHaveURL(new RegExp(topicHref + '$'));

    // Scoreboard visible; question card renders
    await expect(page.locator('.scoreboard')).toBeVisible();
    await expect(page.locator('.q-stem')).not.toBeEmpty();

    // Walk the quiz: pick the first option each time, then advance until the
    // terminal "See results" button lands us on the results view.
    let answeredCount = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await page.locator('.option').first().click();
      await expect(page.locator('.feedback')).toBeVisible();
      await expect(page.locator('.feedback-rule')).toContainText(/^rule /i);
      answeredCount++;

      const seeResults = page.getByRole('button', { name: /see results/i });
      if (await seeResults.isVisible()) {
        await seeResults.click();
        break;
      }
      await page.getByRole('button', { name: /next question/i }).click();
    }
    expect(answeredCount).toBeGreaterThan(0);
    const total = answeredCount;

    // Results view
    await expect(page.getByRole('heading', { name: /final score/i })).toBeVisible();
    await expect(page.locator('.ring-pct')).toContainText(/%/);
    await expect(page.locator('.grade-blurb')).not.toBeEmpty();
    await expect(page.locator('.review-row')).toHaveCount(total);

    // Retake resets state and goes back to Q1
    await page.getByRole('button', { name: /retake/i }).click();
    await expect(page.locator('.q-head-left .kicker')).toContainText(/question 1 of/i);
    await expect(page.locator('.feedback')).toHaveCount(0);

    // Back to list via breadcrumb → BEST chip reflects the recorded attempt
    await page.locator('.crumbs a').click();
    await expect(page).toHaveURL(/\/quizzes$/);
    await expect(cards.nth(0).locator('.best-chip')).toHaveText(/best \d+%/i);
    await expect(cards.nth(0).locator('.cta-label')).toHaveText(/retake/i);
  });

  test('Casebook flow: list → scenario → wrong choice → reveal → solved badge', async ({
    page,
  }) => {
    await startFresh(page);
    await seedAdultSkaterAndLand(page);

    await page.getByRole('link', { name: /^casebook$/i }).first().click();
    await expect(page).toHaveURL(/\/casebook$/);

    // Page head + scenario list
    await expect(page.getByRole('heading', { name: /^casebook$/i })).toBeVisible();
    const rows = page.locator('.scenario-row');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    await expect(rows.nth(0).locator('.case-tag')).toContainText(/case 01/i);
    await expect(rows.nth(0).locator('.chip-ink')).toContainText(/^rule /i);
    await expect(rows.nth(0).locator('.chip-success')).toHaveCount(0); // not solved yet

    // Into the first scenario
    const scenarioHref = await rows.nth(0).getAttribute('href');
    expect(scenarioHref).toMatch(/^\/casebook\//);
    await rows.nth(0).click();
    await expect(page).toHaveURL(new RegExp(scenarioHref + '$'));

    // Detail chrome
    await expect(page.locator('.rule-badge')).toContainText(/^rule /i);
    await expect(page.locator('.stamp')).toContainText(/game scenario/i);
    await expect(page.getByRole('heading', { name: /^scenario$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /what's the call/i })).toBeVisible();

    // Check Answer is hidden until a choice is selected
    await expect(page.getByRole('button', { name: /check answer/i })).toHaveCount(0);

    // Count the choices and pick a wrong one — the last option unless there's
    // only one choice (degenerate, but cover it).
    const choices = page.locator('.choice');
    const choiceCount = await choices.count();
    expect(choiceCount).toBeGreaterThan(1);
    await choices.nth(choiceCount - 1).click();
    await expect(choices.nth(choiceCount - 1)).toHaveClass(/choice-selected/);

    // Reveal
    await page.getByRole('button', { name: /check answer/i }).click();

    // Reveal block with Outcome + Rationale; exactly one correct choice + exactly one wrong
    const reveal = page.locator('.reveal');
    await expect(reveal).toBeVisible();
    await expect(reveal.locator('.reveal-heading')).toHaveText(
      /✓ correct call!|✗ not quite/i,
    );
    await expect(reveal).toContainText(/outcome/i);
    await expect(reveal).toContainText(/rationale/i);
    await expect(page.locator('.choice-correct')).toHaveCount(1);
    // Wrong chip only when the user picked incorrectly
    const wrongCount = await page.locator('.choice-wrong').count();
    const isCorrect = await reveal.locator('.reveal-correct').count();
    if (isCorrect === 0) {
      expect(wrongCount).toBe(1);
    }

    // Back to list → Solved badge now present on the first scenario
    await page.getByRole('link', { name: /all scenarios/i }).first().click();
    await expect(page).toHaveURL(/\/casebook$/);
    await expect(rows.nth(0).locator('.chip-success')).toContainText(/solved/i);
  });

  test('Profile persists after completing onboarding (reload keeps dashboard)', async ({ page }) => {
    await startFresh(page);
    await pickSkater(page);
    await fillSkaterName(page, 'Persist Me');
    await page.getByRole('button', { name: /skip for now/i }).click();
    await fillDob(page, 22);
    await page.getByRole('button', { name: /^next$/i }).click();
    // Adults skip level; auth flag off → team Skip finishes onboarding directly.
    await page.getByRole('button', { name: /^skip$/i }).click();

    await expect(page.getByRole('heading', { name: 'Persist Me', exact: true })).toBeVisible();

    await page.reload();
    // Should NOT see onboarding welcome
    await expect(page.getByRole('heading', { name: /welcome to derby rules/i })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Persist Me', exact: true })).toBeVisible();
  });
});
