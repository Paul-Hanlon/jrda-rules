import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { UserProfileService } from '../../services/user-profile.service';
import { SkillLevelService } from '../../services/skill-level.service';
import { ReadingAgeService } from '../../services/reading-age.service';
import { AuthService } from '../../services/auth.service';
import { RemoteConfigService } from '../../services/remote-config.service';
import { ContentLoaderService } from '../../services/content-loader.service';
import { RulesetService } from '../../services/ruleset.service';
import { BRANDING } from '../../config/branding';
import { DobPickerComponent } from './dob-picker.component';
import {
  JuniorProfile,
  UserProfile,
  computeAge,
  roleFromAge,
} from '../../models/user-profile';
import { SkillLevel } from '../../models/skill-level';

type Step =
  | 'welcome'
  | 'rulesetPicker'
  | 'skaterName'
  | 'skaterNumber'
  | 'dob'
  | 'shareParent'
  | 'team'
  | 'level'
  | 'parentIntro'
  | 'juniorAdd'
  | 'juniorAddMore'
  | 'account';

type Mode = 'skater' | 'parent' | null;

interface SkaterDraft {
  skateName: string;
  number: string;
  dob: string;
  team: string;
  level: SkillLevel;
  rulesetId: string;
}

interface LevelOption {
  value: SkillLevel;
  title: string;
  description: string;
  icon: IconName;
  accent: string;
}

@Component({
  selector: 'app-onboarding',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, IconComponent, DobPickerComponent],
  template: `
    <div class="onb" [attr.data-step]="step()">
      <!-- Header / progress bar -->
      <header class="onb-head">
        @if (canGoBack()) {
          <button type="button" class="back-btn" (click)="back()" aria-label="Back">
            <app-icon name="chev-left" [size]="20" [strokeWidth]="2.4" />
          </button>
        } @else {
          <span class="back-placeholder" aria-hidden="true"></span>
        }
        @if (!signInOnly()) {
          <div class="bar" aria-hidden="true">
            <div class="bar-fill" [style.width.%]="progressPct()"></div>
          </div>
          <div class="step-count">{{ stepNumber() }}/{{ totalSteps() }}</div>
        }
      </header>

      <div class="onb-body">
        @switch (step()) {
          <!-- WELCOME -->
          @case ('welcome') {
            <div class="kicker">New here?</div>
            <h1>Welcome to <span class="accent">Derby&nbsp;Rules</span>.</h1>
            <p class="subtitle">Let's get you set up. Who's using this app?</p>

            <div class="choice-list">
              <button type="button" class="choice-card" (click)="pickSkater()">
                <span class="choice-icon" style="background: var(--color-primary); color: #fff;">
                  <app-icon name="helmet" [size]="22" [strokeWidth]="2.4" />
                </span>
                <span class="choice-text">
                  <span class="choice-title">I'm a skater</span>
                  <span class="choice-sub">Learn the rules, track your progress, drill for test day.</span>
                </span>
                <app-icon name="chev-right" [size]="22" [strokeWidth]="2.4" />
              </button>

              @if (parentOnboardingEnabled()) {
                <button type="button" class="choice-card" (click)="pickParent()">
                  <span class="choice-icon" style="background: var(--color-accent); color: var(--color-accent-ink);">
                    <app-icon name="user" [size]="22" [strokeWidth]="2.4" />
                  </span>
                  <span class="choice-text">
                    <span class="choice-title">I'm a parent or guardian</span>
                    <span class="choice-sub">Set up an account for your junior skater — under-13s need you.</span>
                  </span>
                  <app-icon name="chev-right" [size]="22" [strokeWidth]="2.4" />
                </button>
              }
            </div>

            @if (authEnabled()) {
              <button type="button" class="text-link" (click)="jumpToAccountSignIn()">
                Already have an account? Sign in
              </button>
            }
          }

          <!-- SKATER · RULESET -->
          @case ('rulesetPicker') {
            <div class="kicker">First up</div>
            <h1>Which ruleset are you learning?</h1>
            <p class="subtitle">Pick the rules your league plays by — you can change this later.</p>
            <div class="choice-list">
              @for (r of availableRulesets(); track r.id) {
                <button
                  type="button"
                  class="choice-card"
                  [class.selected]="skater().rulesetId === r.id"
                  (click)="patchSkater({ rulesetId: r.id })"
                >
                  <span class="choice-text">
                    <span class="choice-title">{{ r.name }}</span>
                  </span>
                </button>
              }
            </div>
            <div class="actions end">
              <button type="button" class="btn btn-primary" (click)="go('skaterName')">
                Next
                <app-icon name="chev-right" [size]="18" [strokeWidth]="2.4" />
              </button>
            </div>
          }

          <!-- SKATER · NAME -->
          @case ('skaterName') {
            <div class="kicker">Step 1 of 3 &middot; identity</div>
            <h1>What's your derby name?</h1>
            <p class="subtitle">Your skater alias. Pick the one you wear on the track.</p>
            <input
              class="big-input"
              type="text"
              placeholder="e.g. Rolla Fister"
              [ngModel]="skater().skateName"
              (ngModelChange)="patchSkater({ skateName: $event })"
              maxlength="40"
              autofocus
            />
            <div class="actions end">
              <button
                type="button"
                class="btn btn-primary"
                [disabled]="!skaterNameValid()"
                (click)="go('skaterNumber')"
              >
                Next
                <app-icon name="chev-right" [size]="18" [strokeWidth]="2.4" />
              </button>
            </div>
          }

          <!-- SKATER · NUMBER -->
          @case ('skaterNumber') {
            <div class="kicker">Step 2 of 3 &middot; identity</div>
            <h1>What's your number?</h1>
            <p class="subtitle">Up to 4 digits. Skip if you don't have one yet.</p>
            <input
              class="big-input mono"
              type="text"
              inputmode="numeric"
              placeholder="42"
              [ngModel]="skater().number"
              (ngModelChange)="patchSkater({ number: sanitizeNumber($event) })"
              maxlength="4"
              autofocus
            />
            <div class="actions split">
              <button type="button" class="text-link" (click)="go('dob')">Skip for now</button>
              <button type="button" class="btn btn-primary" (click)="go('dob')">
                Next
                <app-icon name="chev-right" [size]="18" [strokeWidth]="2.4" />
              </button>
            </div>
          }

          <!-- SKATER · DOB -->
          @case ('dob') {
            <div class="kicker">Step 3 of 3 &middot; identity</div>
            <h1>When's your birthday?</h1>
            <p class="subtitle">We use your age to tune the app — and to check whether you need a parent's help.</p>
            <app-dob-picker
              [value]="skater().dob"
              (valueChange)="patchSkater({ dob: $event })"
            />
            @if (skaterAge() !== null) {
              <div class="age-pill">
                Age: <strong>{{ skaterAge() }}</strong>
                &middot;
                {{
                  skaterAge()! < 13 ? 'parent setup required'
                    : skaterAge()! < 18 ? 'junior skater' : 'adult skater'
                }}
              </div>
            }
            <div class="actions end">
              <button
                type="button"
                class="btn btn-primary"
                [disabled]="!dobValid()"
                (click)="afterDob()"
              >
                Next
                <app-icon name="chev-right" [size]="18" [strokeWidth]="2.4" />
              </button>
            </div>
          }

          <!-- SKATER · UNDER-13 HANDOFF -->
          @case ('shareParent') {
            <div class="kicker">One more step</div>
            <h1>You're under 13, so a parent needs to set this up.</h1>
            <p class="subtitle">
              Share this with a parent or guardian. They'll create their own account and add you to it.
            </p>

            <div class="handoff-card">
              <div class="handoff-label">Handoff code</div>
              <div class="handoff-code">{{ handoffCode() }}</div>
              <div class="handoff-sub">
                skater: <strong>{{ skater().skateName || '—' }}</strong> &middot;
                age <strong>{{ skaterAge() }}</strong>
              </div>
            </div>

            <div class="share-grid">
              <button type="button" class="btn btn-ghost" (click)="shareVia('sms')">
                <app-icon name="message" [size]="16" [strokeWidth]="2.4" />
                Text it
              </button>
              <button type="button" class="btn btn-ghost" (click)="shareVia('email')">
                <app-icon name="mail" [size]="16" [strokeWidth]="2.4" />
                Email it
              </button>
              <button type="button" class="btn btn-ghost" (click)="shareVia('link')">
                <app-icon name="link" [size]="16" [strokeWidth]="2.4" />
                Copy link
              </button>
              <button type="button" class="btn btn-ghost" (click)="shareVia('share')">
                <app-icon name="share" [size]="16" [strokeWidth]="2.4" />
                Share…
              </button>
            </div>

            <div class="actions column">
              @if (parentOnboardingEnabled()) {
                <button type="button" class="btn btn-accent full" (click)="parentIsHere()">
                  My parent is here — let's set up
                  <app-icon name="user" [size]="18" [strokeWidth]="2.4" />
                </button>
              }
              <button type="button" class="text-link center" (click)="waitForParent()">
                I'll wait until they're free
              </button>
            </div>
          }

          <!-- SKATER · TEAM -->
          @case ('team') {
            <div class="kicker">{{ skaterIsJunior() ? 'Almost there' : 'Last step' }}</div>
            <h1>What team do you skate with?</h1>
            <p class="subtitle">Optional — leave blank if you're freelance or unsure.</p>
            <input
              class="big-input"
              type="text"
              placeholder="e.g. Iron Jaws Jr."
              [ngModel]="skater().team"
              (ngModelChange)="patchSkater({ team: $event })"
              maxlength="60"
              autofocus
            />
            <div class="actions split">
              <button type="button" class="text-link" (click)="afterTeam()">Skip</button>
              <button type="button" class="btn btn-primary" (click)="afterTeam()">
                Next
                <app-icon name="chev-right" [size]="18" [strokeWidth]="2.4" />
              </button>
            </div>
          }

          <!-- SKATER · LEVEL -->
          @case ('level') {
            <div class="kicker">Last step</div>
            <h1>Where are you at?</h1>
            <p class="subtitle">
              {{
                skaterIsJunior()
                  ? 'Pick the skill level closest to where you are.'
                  : "We'll skip ahead to full-contact content. You can adjust later."
              }}
            </p>

            @if (skaterIsJunior()) {
              <div class="choice-list">
                @for (opt of levelOptions; track opt.value) {
                  <button
                    type="button"
                    class="choice-card"
                    [class.selected]="skater().level === opt.value"
                    (click)="patchSkater({ level: opt.value })"
                  >
                    <span class="choice-icon" [style.background]="opt.accent" style="color: var(--color-accent-ink);">
                      <app-icon [name]="opt.icon" [size]="22" [strokeWidth]="2.4" />
                    </span>
                    <span class="choice-text">
                      <span class="choice-title">{{ opt.title }}</span>
                      <span class="choice-sub">{{ opt.description }}</span>
                    </span>
                  </button>
                }
              </div>
            }

            <div class="actions end">
              <button type="button" class="btn btn-accent" (click)="finishSkater()">
                <app-icon name="check" [size]="18" [strokeWidth]="2.4" />
                Start skating
              </button>
            </div>
          }

          <!-- PARENT · INTRO -->
          @case ('parentIntro') {
            <div class="kicker">Parent setup</div>
            <h1>Let's set up your junior skater.</h1>
            <p class="subtitle">
              We don't need any details about you — just about the kid(s) who'll be using the app.
            </p>

            <div class="info-card">
              <div class="info-title">You'll add:</div>
              <ul class="bullets">
                <li><span class="tick"><app-icon name="check" [size]="12" [strokeWidth]="3" /></span>Derby name</li>
                <li><span class="tick"><app-icon name="check" [size]="12" [strokeWidth]="3" /></span>Number (optional)</li>
                <li><span class="tick"><app-icon name="check" [size]="12" [strokeWidth]="3" /></span>Date of birth</li>
                <li><span class="tick"><app-icon name="check" [size]="12" [strokeWidth]="3" /></span>Team &amp; skill level</li>
              </ul>
            </div>
            <p class="hint">
              You can add <strong>more than one</strong> junior later, and switch between them from the profile menu.
            </p>
            <div class="actions end">
              <button type="button" class="btn btn-primary" (click)="go('juniorAdd')">
                <app-icon name="plus" [size]="18" [strokeWidth]="2.4" />
                Add first junior
              </button>
            </div>
          }

          <!-- PARENT · ADD JUNIOR -->
          @case ('juniorAdd') {
            <div class="kicker">Junior #{{ juniors().length + 1 }}</div>
            <h1>Who are we setting up?</h1>

            <form class="junior-form" (ngSubmit)="addJunior()" (keydown.enter)="$event.preventDefault()">
              <div class="field full">
                <label for="jr-name">Derby name</label>
                <input
                  id="jr-name"
                  type="text"
                  [ngModel]="parentDraft().skateName"
                  (ngModelChange)="patchParentDraft({ skateName: $event })"
                  name="skateName"
                  placeholder="e.g. Rolla Fister"
                  maxlength="40"
                  autofocus
                />
              </div>
              <div class="field">
                <label for="jr-number">Number (optional)</label>
                <input
                  id="jr-number"
                  type="text"
                  inputmode="numeric"
                  [ngModel]="parentDraft().number"
                  (ngModelChange)="patchParentDraft({ number: sanitizeNumber($event) })"
                  name="number"
                  placeholder="42"
                  maxlength="4"
                />
              </div>
              <div class="field full">
                <span class="label-as-span">Birthday</span>
                <app-dob-picker
                  [value]="parentDraft().dob"
                  (valueChange)="patchParentDraft({ dob: $event })"
                />
              </div>
              <div class="field full">
                <label for="jr-team">Team (optional)</label>
                <input
                  id="jr-team"
                  type="text"
                  [ngModel]="parentDraft().team"
                  (ngModelChange)="patchParentDraft({ team: $event })"
                  name="team"
                  placeholder="e.g. Iron Jaws Jr."
                  maxlength="60"
                />
              </div>
              <div class="field full">
                <span class="label-as-span">Skill level</span>
                <div class="seg-row" role="radiogroup" aria-label="Skill level">
                  @for (lvl of levels; track lvl) {
                    <button
                      type="button"
                      role="radio"
                      class="seg"
                      [class.on]="parentDraft().level === lvl"
                      [attr.aria-checked]="parentDraft().level === lvl"
                      (click)="patchParentDraft({ level: lvl })"
                    >
                      {{ lvl }}
                    </button>
                  }
                </div>
              </div>

              @if (rulesetPickerEnabled()) {
                <div class="field full">
                  <span class="label-as-span">Ruleset</span>
                  <div class="seg-row" role="radiogroup" aria-label="Ruleset">
                    @for (r of availableRulesets(); track r.id) {
                      <button
                        type="button"
                        role="radio"
                        class="seg"
                        [class.on]="parentDraft().rulesetId === r.id"
                        [attr.aria-checked]="parentDraft().rulesetId === r.id"
                        (click)="patchParentDraft({ rulesetId: r.id })"
                      >
                        {{ r.name }}
                      </button>
                    }
                  </div>
                </div>
              }

              @if (parentDraftAge() !== null) {
                <div class="age-pill full">Age: <strong>{{ parentDraftAge() }}</strong></div>
              }

              <div class="actions end full">
                <button
                  type="submit"
                  class="btn btn-primary"
                  [disabled]="!parentDraftValid()"
                >
                  <app-icon name="chev-right" [size]="18" [strokeWidth]="2.4" />
                  Add skater
                </button>
              </div>
            </form>
          }

          <!-- PARENT · ADD MORE? -->
          @case ('juniorAddMore') {
            <div class="kicker">
              {{ juniors().length }} skater{{ juniors().length === 1 ? '' : 's' }} added
            </div>
            <h1>Any others to add?</h1>

            <ul class="junior-list">
              @for (j of juniors(); track j.skateName; let i = $index) {
                <li class="junior-row">
                  <span class="junior-num">{{ (j.number || '00').slice(0, 3) }}</span>
                  <span class="junior-meta">
                    <span class="junior-name">{{ j.skateName }}</span>
                    <span class="junior-sub">Age {{ j.age }} &middot; {{ j.level }} &middot; {{ j.team || 'Unassigned' }}</span>
                  </span>
                  <button type="button" class="icon-btn" (click)="removeJunior(i)" aria-label="Remove junior">
                    <app-icon name="close" [size]="18" [strokeWidth]="2.4" />
                  </button>
                </li>
              }
            </ul>

            <div class="actions column">
              <button type="button" class="btn btn-ghost full" (click)="go('juniorAdd')">
                <app-icon name="plus" [size]="18" [strokeWidth]="2.4" />
                Add another junior
              </button>
              <button
                type="button"
                class="btn btn-accent full"
                [disabled]="juniors().length === 0"
                (click)="finishParent()"
              >
                <app-icon name="check" [size]="18" [strokeWidth]="2.4" />
                We're done — finish setup
              </button>
            </div>
          }

          <!-- ACCOUNT PROMPT -->
          @case ('account') {
            @if (signInOnly()) {
              <div class="kicker">Welcome back</div>
              <h1>Sign in to your account</h1>
              <p class="subtitle">
                Restore your profile and progress on this device.
              </p>
            } @else {
              <div class="kicker">Keep your progress safe</div>
              <h1>Save progress across devices?</h1>
              <p class="subtitle">
                Everything you've set up is already saved on this device. Add an account to sync between phone, tablet
                and desktop — or skip and stay local.
              </p>
            }

            @if (authError()) {
              <div class="error-pill" role="alert">{{ authError() }}</div>
            }

            <div class="account-actions">
              <button
                type="button"
                class="btn btn-ink full"
                [disabled]="authBusy()"
                (click)="signInGoogle()"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path fill="#EA4335" d="M9 3.48c1.69 0 2.85.73 3.51 1.34l2.56-2.5C13.46 1.04 11.44 0 9 0 5.48 0 2.43 2.02.96 4.96l2.97 2.3C4.66 5.08 6.67 3.48 9 3.48z"/>
                  <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.12-.84 2.07-1.79 2.71l2.89 2.24c1.7-1.57 2.7-3.88 2.7-6.59z"/>
                  <path fill="#FBBC05" d="M3.93 10.74A5.4 5.4 0 0 1 3.64 9c0-.6.1-1.19.27-1.74L.96 4.96A8.99 8.99 0 0 0 0 9c0 1.45.34 2.82.96 4.04l2.97-2.3z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.89-2.24c-.8.54-1.86.86-3.07.86-2.36 0-4.36-1.6-5.07-3.74L.96 13.04C2.43 15.98 5.48 18 9 18z"/>
                </svg>
                Continue with Google
              </button>

              @if (signInOnly()) {
                <form class="email-form" (ngSubmit)="submitEmail()">
                  <div class="field full">
                    <label for="onb-email">Email</label>
                    <input
                      id="onb-email"
                      type="email"
                      autocomplete="email"
                      [ngModel]="email()"
                      (ngModelChange)="email.set($event)"
                      name="email"
                      required
                    />
                  </div>
                  <div class="field full">
                    <label for="onb-password">Password</label>
                    <input
                      id="onb-password"
                      type="password"
                      autocomplete="current-password"
                      [ngModel]="password()"
                      (ngModelChange)="password.set($event)"
                      name="password"
                      minlength="6"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary full"
                    [disabled]="authBusy() || !emailValid()"
                  >
                    Sign in
                  </button>
                </form>
              } @else {
                @if (!emailOpen()) {
                  <button type="button" class="btn btn-ghost full" (click)="emailOpen.set(true)">
                    Use email instead
                  </button>
                } @else {
                  <form class="email-form" (ngSubmit)="submitEmail()">
                    <div class="seg-row">
                      <button
                        type="button"
                        class="seg"
                        [class.on]="emailMode() === 'signup'"
                        (click)="emailMode.set('signup')"
                      >Create account</button>
                      <button
                        type="button"
                        class="seg"
                        [class.on]="emailMode() === 'signin'"
                        (click)="emailMode.set('signin')"
                      >Sign in</button>
                    </div>
                    <div class="field full">
                      <label for="onb-email">Email</label>
                      <input
                        id="onb-email"
                        type="email"
                        autocomplete="email"
                        [ngModel]="email()"
                        (ngModelChange)="email.set($event)"
                        name="email"
                        required
                      />
                    </div>
                    <div class="field full">
                      <label for="onb-password">Password</label>
                      <input
                        id="onb-password"
                        type="password"
                        [autocomplete]="emailMode() === 'signup' ? 'new-password' : 'current-password'"
                        [ngModel]="password()"
                        (ngModelChange)="password.set($event)"
                        name="password"
                        minlength="6"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      class="btn btn-primary full"
                      [disabled]="authBusy() || !emailValid()"
                    >
                      {{ emailMode() === 'signup' ? 'Create account' : 'Sign in' }}
                    </button>
                  </form>
                }

                <button type="button" class="text-link center" (click)="skipAccount()">
                  Skip for now — keep it local
                </button>
              }
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-bg);
      color: var(--color-text);
    }

    .onb {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      max-width: 560px;
      margin: 0 auto;
      padding: 0 var(--space-md) var(--space-xl);
    }

    .onb-head {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-md) 0 0;
    }

    .back-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-hard);
      color: var(--color-text);
    }

    .back-placeholder {
      width: 38px;
    }

    .bar {
      flex: 1;
      height: 10px;
      background: var(--color-surface-alt);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: 999px;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      background: var(--color-accent);
      background-image: repeating-linear-gradient(
        -45deg,
        rgba(0, 0, 0, 0) 0 6px,
        rgba(0, 0, 0, 0.18) 6px 10px
      );
      transition: width 0.25s ease;
    }

    .step-count {
      width: 44px;
      text-align: right;
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.1em;
      color: var(--color-text-muted);
    }

    .onb-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      padding: var(--space-xl) 0 0;
    }

    .kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--color-primary);
    }

    h1 {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: clamp(1.6rem, 6vw, 2rem);
      letter-spacing: -0.02em;
      line-height: 1.08;
      margin: 0;
      text-wrap: balance;
    }

    h1 .accent {
      color: var(--color-primary);
    }

    .subtitle {
      font-size: 0.9375rem;
      color: var(--color-text-muted);
      line-height: 1.5;
      margin: 0;
    }

    .hint {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      line-height: 1.5;
      margin: 0;
    }

    /* Big input */
    .big-input {
      width: 100%;
      padding: 18px 16px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      background: var(--color-surface);
      color: var(--color-text);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.375rem;
      letter-spacing: -0.01em;
      box-shadow: var(--shadow-hard);

      &.mono {
        font-family: var(--font-mono);
        font-weight: 500;
        letter-spacing: 0.05em;
      }

      &:focus-visible {
        outline: 3px solid var(--color-accent);
        outline-offset: 2px;
      }
    }

    /* Choice cards */
    .choice-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .choice-card {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      width: 100%;
      padding: var(--space-md);
      background: var(--color-surface);
      color: var(--color-text);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      text-align: left;
      font-family: var(--font-body);
      transition: transform 0.08s, box-shadow 0.08s;

      &:hover {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
      }

      &.selected {
        background: var(--color-text);
        color: var(--color-surface);
      }
    }

    .choice-icon {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: var(--stroke) solid var(--color-border-strong);
    }

    .choice-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .choice-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.0625rem;
      letter-spacing: -0.01em;
      line-height: 1.1;
    }

    .choice-sub {
      font-size: 0.8125rem;
      opacity: 0.8;
      line-height: 1.35;
    }

    /* Pill buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 18px;
      min-height: var(--touch-target);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.875rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      box-shadow: var(--shadow-hard);
      cursor: pointer;
      transition: transform 0.08s, box-shadow 0.08s;

      &:hover:not(:disabled) {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .btn-primary {
      background: var(--color-primary);
      color: #fff;
    }

    .btn-accent {
      background: var(--color-accent);
      color: var(--color-accent-ink);
    }

    .btn-ghost {
      background: var(--color-surface);
      color: var(--color-text);
    }

    .btn-ink {
      background: var(--color-text);
      color: var(--color-surface);
    }

    .btn.full {
      width: 100%;
    }

    .text-link {
      background: transparent;
      border: none;
      color: var(--color-text-muted);
      font-family: var(--font-display);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 0.75rem;
      padding: 10px 6px;

      &.center {
        align-self: center;
      }
    }

    /* Actions row */
    .actions {
      display: flex;
      gap: var(--space-sm);
      margin-top: auto;
      padding-top: var(--space-md);
    }

    .actions.end { justify-content: flex-end; }
    .actions.split { justify-content: space-between; align-items: center; }
    .actions.column { flex-direction: column; }
    .actions.full { width: 100%; }

    /* DOB age pill */
    .age-pill {
      padding: 10px 14px;
      background: var(--color-surface-alt);
      border: 2px dashed var(--color-border-strong);
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.08em;
    }

    /* Handoff card */
    .handoff-card {
      padding: 18px;
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
    }

    .handoff-label {
      font-family: var(--font-mono);
      font-size: 0.625rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      margin-bottom: 4px;
    }

    .handoff-code {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 2.25rem;
      letter-spacing: 0.35em;
      line-height: 1;
      color: var(--color-text);
    }

    .handoff-sub {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.06em;
      color: var(--color-text-muted);
      margin-top: 8px;
    }

    .share-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    /* Parent intro card */
    .info-card {
      padding: 16px;
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .info-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.9375rem;
      letter-spacing: -0.01em;
    }

    .bullets {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .bullets li {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.875rem;
    }

    .tick {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      background: var(--color-accent);
      color: var(--color-accent-ink);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: 50%;
    }

    /* Junior form */
    .junior-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .field.full {
      grid-column: 1 / -1;
    }

    .field label,
    .label-as-span {
      font-family: var(--font-mono);
      font-size: 0.625rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .field input {
      padding: 12px 14px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      background: var(--color-surface);
      color: var(--color-text);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1rem;

      &:focus-visible {
        outline: 3px solid var(--color-accent);
        outline-offset: 2px;
      }
    }

    .seg-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .seg {
      flex: 1;
      min-width: 60px;
      padding: 10px 12px;
      background: var(--color-surface);
      color: var(--color-text);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.875rem;
      letter-spacing: 0.02em;
      min-height: var(--touch-target);

      &.on {
        background: var(--color-text);
        color: var(--color-surface);
      }
    }

    .age-pill.full {
      grid-column: 1 / -1;
    }

    /* Junior list */
    .junior-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .junior-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-md);
    }

    .junior-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      flex-shrink: 0;
      background: var(--color-primary);
      color: #fff;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: 50%;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.8125rem;
    }

    .junior-meta {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .junior-name {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.9375rem;
    }

    .junior-sub {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.08em;
      color: var(--color-text-muted);
    }

    .icon-btn {
      background: transparent;
      border: none;
      color: var(--color-text-muted);
    }

    /* Account prompt */
    .account-actions {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .email-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      padding: var(--space-md);
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
    }

    .error-pill {
      padding: 10px 14px;
      background: color-mix(in srgb, var(--color-error) 12%, transparent);
      color: var(--color-error);
      border: var(--stroke) solid var(--color-error);
      border-radius: var(--radius-sm);
      font-size: 0.875rem;
    }
  `,
})
export class OnboardingComponent {
  private readonly profileService = inject(UserProfileService);
  private readonly skillLevelService = inject(SkillLevelService);
  private readonly readingAgeService = inject(ReadingAgeService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly remoteConfig = inject(RemoteConfigService);
  private readonly contentLoader = inject(ContentLoaderService);
  private readonly rulesetService = inject(RulesetService);
  protected readonly authEnabled = this.remoteConfig.flag('auth');
  protected readonly parentOnboardingEnabled = this.remoteConfig.flag('parentOnboarding');
  protected readonly multiRulesetEnabled = this.remoteConfig.flag('multiRuleset');
  protected readonly availableRulesets = this.contentLoader.availableRulesets;
  protected readonly rulesetPickerEnabled = computed(
    () => this.multiRulesetEnabled() && this.availableRulesets().length > 1,
  );

  protected readonly levels: SkillLevel[] = ['L1', 'L2', 'L3'];

  protected readonly levelOptions: LevelOption[] = [
    {
      value: 'L1',
      title: 'Level 1 — No contact',
      description: 'Skills, stops, basic pack work. No hits.',
      icon: 'circle',
      accent: 'var(--color-accent)',
    },
    {
      value: 'L2',
      title: 'Level 2 — Limited contact',
      description: 'Bracing, positional blocking. Introducing contact.',
      icon: 'shield',
      accent: 'var(--color-accent)',
    },
    {
      value: 'L3',
      title: 'Level 3 — Full contact',
      description: 'Scrimmage-ready. Full rules apply.',
      icon: 'zap',
      accent: 'var(--color-primary)',
    },
  ];

  protected readonly stack = signal<Step[]>(['welcome']);
  protected readonly mode = signal<Mode>(null);

  protected readonly skater = signal<SkaterDraft>({
    skateName: '',
    number: '',
    dob: '',
    team: '',
    level: 'L2',
    rulesetId: BRANDING.defaultRulesetId,
  });
  protected readonly parentDraft = signal<SkaterDraft>({
    skateName: '',
    number: '',
    dob: '',
    team: '',
    level: 'L2',
    rulesetId: BRANDING.defaultRulesetId,
  });
  protected readonly juniors = signal<JuniorProfile[]>([]);

  protected readonly handoffCode = signal<string>(
    String(Math.floor(100000 + Math.random() * 900000))
  );

  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly emailOpen = signal(false);
  protected readonly emailMode = signal<'signup' | 'signin'>('signup');
  protected readonly authBusy = signal(false);
  protected readonly authError = signal<string | null>(null);
  protected readonly signInOnly = signal(false);

  protected readonly step = computed<Step>(() => {
    const s = this.stack();
    return s[s.length - 1];
  });

  protected readonly canGoBack = computed(() => this.stack().length > 1);

  protected readonly totalSteps = computed(() => {
    const m = this.mode();
    const accountStep = this.authEnabled() ? 1 : 0;
    if (m === 'parent') return 4 + accountStep;
    if (m === 'skater') {
      const rulesetStep = this.rulesetPickerEnabled() ? 1 : 0;
      return (this.skaterIsJunior() ? 6 : 5) + accountStep + rulesetStep;
    }
    return 1;
  });

  protected readonly stepNumber = computed<number>(() => {
    const s = this.step();
    const m = this.mode();
    if (s === 'welcome') return 1;
    if (s === 'rulesetPicker') return 2;
    if (m === 'skater') {
      const off = this.rulesetPickerEnabled() ? 1 : 0;
      if (s === 'account') return (this.skaterIsJunior() ? 7 : 6) + off;
      const map: Partial<Record<Step, number>> = {
        skaterName: 2,
        skaterNumber: 3,
        dob: 4,
        shareParent: 5,
        team: 5,
        level: 6,
      };
      return (map[s] ?? 1) + off;
    }
    if (m === 'parent') {
      const map: Partial<Record<Step, number>> = {
        parentIntro: 2,
        juniorAdd: 3,
        juniorAddMore: 4,
        account: 5,
      };
      return map[s] ?? 1;
    }
    return 1;
  });

  protected readonly progressPct = computed(() =>
    Math.round((this.stepNumber() / this.totalSteps()) * 100)
  );

  protected readonly skaterAge = computed(() => computeAge(this.skater().dob));
  protected readonly skaterNameValid = computed(() => this.skater().skateName.trim().length >= 2);
  protected readonly dobValid = computed(() => {
    const age = this.skaterAge();
    return age !== null && age >= 4 && age <= 80;
  });
  protected readonly skaterIsJunior = computed(() => {
    const age = this.skaterAge();
    return age !== null && age < 18;
  });

  protected readonly parentDraftAge = computed(() => computeAge(this.parentDraft().dob));
  protected readonly parentDraftValid = computed(() => {
    const age = this.parentDraftAge();
    const name = this.parentDraft().skateName.trim();
    return name.length >= 2 && age !== null && age >= 4 && age <= 25;
  });

  protected readonly emailValid = computed(() => {
    const e = this.email();
    const p = this.password();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && p.length >= 6;
  });

  protected go(next: Step): void {
    this.stack.update((s) => [...s, next]);
  }

  protected back(): void {
    this.stack.update((s) => (s.length > 1 ? s.slice(0, -1) : s));
    // Leaving the sign-in shortcut clears its mode so the user lands on
    // a clean welcome screen and can restart the normal flow.
    if (this.step() === 'welcome' && this.signInOnly()) {
      this.signInOnly.set(false);
      this.emailOpen.set(false);
      this.authError.set(null);
    }
  }

  protected pickSkater(): void {
    this.mode.set('skater');
    this.go(this.rulesetPickerEnabled() ? 'rulesetPicker' : 'skaterName');
  }

  protected pickParent(): void {
    this.mode.set('parent');
    this.go('parentIntro');
  }

  protected patchSkater(patch: Partial<SkaterDraft>): void {
    this.skater.update((s) => ({ ...s, ...patch }));
  }

  protected patchParentDraft(patch: Partial<SkaterDraft>): void {
    this.parentDraft.update((s) => ({ ...s, ...patch }));
  }

  protected sanitizeNumber(value: string): string {
    return (value || '').replace(/\D/g, '').slice(0, 4);
  }

  protected afterDob(): void {
    if (!this.dobValid()) return;
    const age = this.skaterAge() ?? 0;
    if (age < 13) this.go('shareParent');
    else this.go('team');
  }

  protected afterTeam(): void {
    if (this.skaterIsJunior()) this.go('level');
    else this.finishSkater();
  }

  protected shareVia(_channel: 'sms' | 'email' | 'link' | 'share'): void {
    const code = this.handoffCode();
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(`derbyrules.app/join/${code}`)
        .catch(() => undefined);
    }
  }

  protected parentIsHere(): void {
    this.mode.set('parent');
    const s = this.skater();
    this.parentDraft.set({
      skateName: s.skateName,
      number: s.number,
      dob: s.dob,
      team: '',
      level: 'L2',
      rulesetId: s.rulesetId,
    });
    this.stack.set(['welcome', 'parentIntro', 'juniorAdd']);
  }

  protected waitForParent(): void {
    // Stays on this step — the skater can share the code and wait.
  }

  protected finishSkater(): void {
    const s = this.skater();
    const age = this.skaterAge() ?? 0;
    const isJunior = age < 18;
    const level = isJunior ? s.level : 'L3';

    this.applyProfile({
      role: 'skater',
      accountType: 'skater',
      skateName: s.skateName.trim(),
      number: s.number,
      age: String(age),
      dob: s.dob,
      team: s.team.trim() || (isJunior ? 'Unassigned' : ''),
      level,
      rulesetId: s.rulesetId,
      readingAge: this.readingAgeFromAge(age),
    });

    if (this.authEnabled()) this.go('account');
    else this.finish();
  }

  protected addJunior(): void {
    if (!this.parentDraftValid()) return;
    const draft = this.parentDraft();
    const age = this.parentDraftAge() ?? 0;
    const jr: JuniorProfile = {
      skateName: draft.skateName.trim(),
      number: draft.number,
      age: String(age),
      dob: draft.dob,
      team: draft.team.trim() || 'Unassigned',
      level: draft.level,
      rulesetId: draft.rulesetId,
    };
    this.juniors.update((all) => [...all, jr]);
    this.parentDraft.set({
      skateName: '',
      number: '',
      dob: '',
      team: '',
      level: 'L2',
      rulesetId: BRANDING.defaultRulesetId,
    });
    this.go('juniorAddMore');
  }

  protected removeJunior(index: number): void {
    this.juniors.update((all) => all.filter((_, i) => i !== index));
  }

  protected finishParent(): void {
    const juniors = this.juniors();
    if (juniors.length === 0) return;
    const active = juniors[0];
    const age = parseInt(active.age, 10) || 0;

    this.applyProfile({
      role: 'parent',
      accountType: 'parent',
      skateName: active.skateName,
      number: active.number,
      age: active.age,
      dob: active.dob,
      team: active.team,
      level: active.level,
      rulesetId: active.rulesetId,
      juniors,
      activeJuniorIndex: 0,
      readingAge: this.readingAgeFromAge(age),
    });

    if (this.authEnabled()) this.go('account');
    else this.finish();
  }

  protected async signInGoogle(): Promise<void> {
    this.authBusy.set(true);
    this.authError.set(null);
    try {
      const auth = await this.authService.signInWithGoogle();
      this.profileService.setAuth(auth);
      this.finish();
    } catch (err) {
      this.authError.set(this.describeError(err));
    } finally {
      this.authBusy.set(false);
    }
  }

  protected async submitEmail(): Promise<void> {
    if (!this.emailValid()) return;
    this.authBusy.set(true);
    this.authError.set(null);
    try {
      const auth =
        this.emailMode() === 'signup'
          ? await this.authService.signUpWithEmail(this.email(), this.password())
          : await this.authService.signInWithEmail(this.email(), this.password());
      this.profileService.setAuth(auth);
      this.finish();
    } catch (err) {
      this.authError.set(this.describeError(err));
    } finally {
      this.authBusy.set(false);
    }
  }

  protected skipAccount(): void {
    this.finish();
  }

  private finish(): void {
    if (this.signInOnly() && !this.profileService.profile()) {
      // Sign-in shortcut with no local profile yet — seed a minimal one so
      // the app has something to render until cloud sync restores it.
      this.profileService.save(this.profileService.getOrDefault());
    }
    this.profileService.completeOnboarding();
    // Parents land on the custodian dashboard. Navigating to a distinct URL
    // forces the router to re-run the canMatch guards — `/` is a no-op when
    // we're already at `/` during the onboarding takeover.
    const parent =
      this.profileService.profile()?.accountType === 'parent';
    this.router.navigate([parent ? '/custodian' : '/']);
  }

  protected jumpToAccountSignIn(): void {
    this.signInOnly.set(true);
    this.emailMode.set('signin');
    this.emailOpen.set(true);
    this.authError.set(null);
    this.stack.set(['welcome', 'account']);
  }

  private applyProfile(profile: UserProfile): void {
    // User has passed the landing gate to reach onboarding — preserve that
    // flag so the App doesn't bounce them back to the splash mid-flow when
    // we re-save between onboarding steps.
    this.profileService.save({ ...profile, landed: true });
    this.skillLevelService.setLevel(profile.level);
    if (profile.readingAge) this.readingAgeService.setReadingAge(profile.readingAge);
    if (profile.rulesetId) this.rulesetService.setRuleset(profile.rulesetId);
    // Keep derived role consistent for consumers that still read `role`.
    const _derived = roleFromAge(profile.age);
    void _derived;
  }

  private readingAgeFromAge(age: number): UserProfile['readingAge'] {
    if (age >= 13) return '13+';
    if (age >= 11) return '11-12';
    if (age >= 9) return '9-10';
    return '7-8';
  }

  private describeError(err: unknown): string {
    if (err && typeof err === 'object' && 'code' in err) {
      const code = String((err as { code: unknown }).code);
      const map: Record<string, string> = {
        'auth/email-already-in-use': 'That email is already registered — try signing in instead.',
        'auth/invalid-email': 'That doesn\'t look like a valid email address.',
        'auth/weak-password': 'Password needs to be at least 6 characters.',
        'auth/wrong-password': 'Incorrect email or password.',
        'auth/user-not-found': 'No account found for that email — try creating one.',
        'auth/invalid-credential': 'Incorrect email or password.',
        'auth/popup-closed-by-user': 'Sign-in popup was closed — try again.',
        'auth/popup-blocked': 'Your browser blocked the popup — allow it and try again.',
        'auth/network-request-failed': 'Network error — check your connection and try again.',
      };
      if (map[code]) return map[code];
    }
    if (err instanceof Error) return err.message;
    return 'Something went wrong. Please try again.';
  }
}
