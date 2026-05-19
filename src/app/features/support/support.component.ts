import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JerseyNumberComponent } from '../../shared/components/jersey-number/jersey-number.component';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { TrackOvalComponent } from '../../shared/components/track-oval/track-oval.component';

interface CostTile {
  n: string;
  icon: IconName;
  title: string;
  body: string;
  jerseyBg: string;
}

interface SupportOption {
  title: string;
  description: string;
  icon: IconName;
  url: string;
  linkText: string;
  accent: 'primary' | 'accent' | 'jrda';
  action?: 'share';
}

@Component({
  selector: 'app-support',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JerseyNumberComponent, IconComponent, TrackOvalComponent],
  template: `
    <div class="support">
      <!-- Page head -->
      <header class="page-head">
        <div class="kicker">Help keep it free</div>
        <h1>Support</h1>
        <p class="subtitle">
          This site is free and ad-free. If it&rsquo;s helped you learn the rules of junior roller
          derby, consider chipping in so it stays that way.
        </p>
      </header>

      <!-- Hero banner -->
      <section class="hero" aria-label="Support the project">
        <app-track-oval style="color: var(--color-accent); opacity: 0.28;" />
        <div class="hero-body">
          <div class="hero-text">
            <div class="hero-kicker">Reader-funded</div>
            <h2 class="hero-title">Built by skaters.<br />Kept alive by you.</h2>
            <div class="chip-row">
              <span class="chip chip-accent" style="transform: rotate(-2deg);">No ads</span>
              <span class="chip chip-outline" style="transform: rotate(2deg);">No tracking</span>
              <span class="chip chip-outline" style="transform: rotate(-1deg);">Always free</span>
            </div>
          </div>
        </div>
      </section>

      <!-- What your support covers -->
      <section class="block" aria-label="What your support covers">
        <div class="block-head">
          <div class="kicker">Where it goes</div>
          <h2>What your support covers</h2>
        </div>

        <div class="cost-grid">
          @for (tile of costs; track tile.title) {
            <article class="cost-tile">
              <div class="cost-top">
                <app-jersey-number
                  [n]="tile.n"
                  [size]="48"
                  [background]="tile.jerseyBg"
                  borderColor="var(--color-border-strong)"
                />
                <app-icon [name]="tile.icon" [size]="22" [strokeWidth]="2.2" />
              </div>
              <h3>{{ tile.title }}</h3>
              <p>{{ tile.body }}</p>
            </article>
          }
        </div>
      </section>

      <!-- Ways to help -->
      <section class="block" aria-label="Ways to support">
        <div class="block-head">
          <div class="kicker">How to help</div>
          <h2>Ways to help</h2>
        </div>

        <div class="options-grid">
          @for (option of supportOptions; track option.title) {
            @if (option.action === 'share') {
              <button
                type="button"
                class="option-card"
                [class]="'accent-' + option.accent"
                (click)="share(option)"
              >
                <div class="option-top">
                  <span class="option-icon" [attr.data-accent]="option.accent">
                    <app-icon [name]="option.icon" [size]="20" [strokeWidth]="2.2" />
                  </span>
                  <h3>{{ option.title }}</h3>
                </div>
                <p>{{ option.description }}</p>
                <span class="option-link" aria-live="polite">
                  <span class="option-link-text">
                    {{ copied() ? 'Link copied' : option.linkText }}
                  </span>
                  <app-icon
                    [name]="copied() ? 'check' : 'arrow-right'"
                    [size]="16"
                    [strokeWidth]="2.4"
                  />
                </span>
              </button>
            } @else {
              <a
                [href]="option.url"
                target="_blank"
                rel="noopener noreferrer"
                class="option-card"
                [class]="'accent-' + option.accent"
              >
                <div class="option-top">
                  <span class="option-icon" [attr.data-accent]="option.accent">
                    <app-icon [name]="option.icon" [size]="20" [strokeWidth]="2.2" />
                  </span>
                  <h3>{{ option.title }}</h3>
                </div>
                <p>{{ option.description }}</p>
                <span class="option-link">
                  <span class="option-link-text">{{ option.linkText }}</span>
                  <app-icon name="arrow-right" [size]="16" [strokeWidth]="2.4" />
                </span>
              </a>
            }
          }
        </div>
      </section>

      <!-- Thanks -->
      <aside class="thanks" aria-label="Thanks">
        <div class="thanks-kicker">Thank you</div>
        <p>
          Every bit of support helps keep this resource available for skaters, coaches, and
          officials across the junior roller derby community.
        </p>
      </aside>
    </div>
  `,
  styles: `
    .support {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    /* Page head */
    .page-head {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .page-head h1 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 2rem;
      letter-spacing: -0.02em;
      margin: 0;
    }

    .subtitle {
      color: var(--color-text-secondary);
      margin: 0;
      line-height: 1.5;
      max-width: 60ch;
    }

    /* Hero banner */
    .hero {
      position: relative;
      overflow: hidden;
      background: var(--color-text);
      color: var(--color-surface);
      padding: 32px 28px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
    }

    .hero-body {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--space-lg);
      flex-wrap: wrap;
    }

    .hero-text {
      flex: 1;
      min-width: 240px;
    }

    .hero-kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--color-accent);
    }

    .hero-title {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(1.6rem, 4.2vw, 2.1rem);
      letter-spacing: -0.02em;
      line-height: 1.05;
      color: var(--color-surface);
      margin: 6px 0 0;
    }

    .chip-row {
      margin-top: var(--space-md);
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }

    .chip {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: var(--radius-chip);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.6875rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      border: var(--stroke) solid var(--color-accent);
      white-space: nowrap;
    }

    .chip-accent {
      background: var(--color-accent);
      color: var(--color-accent-ink);
    }

    .chip-outline {
      background: transparent;
      color: var(--color-accent);
    }

    /* Section block */
    .block {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .block-head {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .block-head h2 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.375rem;
      letter-spacing: -0.01em;
      margin: 0;
    }

    /* Cost tiles */
    .cost-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--space-sm);
    }

    .cost-tile {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      padding: var(--space-md);
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
    }

    .cost-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--color-text-muted);
      margin-bottom: 2px;
    }

    .cost-tile h3 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.0625rem;
      letter-spacing: -0.01em;
      margin: 0;
    }

    .cost-tile p {
      font-size: 0.875rem;
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin: 0;
    }

    /* Options grid */
    .options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: var(--space-sm);
    }

    .option-card {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      padding: var(--space-md) var(--space-md) calc(var(--space-md) + 2px);
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      text-decoration: none;
      color: var(--color-text);
      font-family: inherit;
      cursor: pointer;
      text-align: start;
      transition: transform 0.08s, box-shadow 0.08s;

      &:hover {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
        text-decoration: none;
      }

      &:focus-visible {
        outline: 3px solid var(--color-accent);
        outline-offset: 2px;
      }
    }

    .option-top {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .option-icon {
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      border: var(--stroke) solid var(--color-border-strong);
      flex-shrink: 0;

      &[data-accent='primary'] {
        background: var(--color-primary);
        color: #fff;
      }
      &[data-accent='accent'] {
        background: var(--color-accent);
        color: var(--color-accent-ink);
      }
      &[data-accent='jrda'] {
        background: var(--color-jrda);
        color: var(--color-text);
      }
    }

    .option-card h3 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.0625rem;
      letter-spacing: -0.01em;
      margin: 0;
    }

    .option-card p {
      font-size: 0.875rem;
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin: 0;
      flex: 1;
    }

    .option-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.75rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-top: var(--space-xs);
      padding-top: var(--space-sm);
      border-top: 2px dashed var(--color-border);
    }

    .accent-primary .option-link {
      color: var(--color-primary);
    }
    .accent-accent .option-link {
      color: var(--color-text);
    }
    .accent-jrda .option-link {
      color: var(--color-text);
    }

    .option-link-text {
      display: inline-block;
    }

    /* Thanks */
    .thanks {
      position: relative;
      padding: var(--space-lg);
      background: var(--color-jrda-bg);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
    }

    .thanks-kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--color-text);
      margin-bottom: 6px;
    }

    .thanks p {
      font-size: 0.9375rem;
      color: var(--color-text);
      line-height: 1.55;
      margin: 0;
      max-width: 60ch;
    }
  `,
})
export class SupportComponent {
  protected readonly copied = signal(false);

  protected async share(option: SupportOption) {
    const shareData = {
      title: 'JRDA Rules',
      text: 'Learn the rules of junior roller derby with interactive quizzes and a searchable rulebook.',
      url: option.url,
    };

    if (typeof navigator.share === 'function' && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled the share dialog — no action needed
      }
      return;
    }

    await navigator.clipboard.writeText(option.url);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  protected readonly costs: CostTile[] = [
    {
      n: '01',
      icon: 'bolt',
      title: 'Hosting',
      body: 'Keeping the site online, fast, and available to everyone.',
      jerseyBg: 'var(--color-primary)',
    },
    {
      n: '02',
      icon: 'settings',
      title: 'Maintenance',
      body: 'Updating content when rules change each season.',
      jerseyBg: 'var(--color-text)',
    },
    {
      n: '03',
      icon: 'sparkle',
      title: 'New features',
      body: 'Adding more quizzes, scenarios, and learning tools.',
      jerseyBg: 'var(--color-primary)',
    },
  ];

  protected readonly supportOptions: SupportOption[] = [
    {
      title: 'Buy us a coffee',
      description: 'A one-time donation to help cover hosting and development costs.',
      icon: 'zap',
      url: 'https://buymeacoffee.com/fubar_137',
      linkText: 'Donate',
      accent: 'jrda',
    },
    {
      title: 'Share the site',
      description:
        'Know a skater, coach, or official who could use this? Spread the word in your league.',
      icon: 'share',
      url: 'https://jrda-rules.web.app',
      linkText: 'Copy link',
      accent: 'accent',
      action: 'share',
    },
    {
      title: 'Report issues',
      description: 'Found an incorrect rule or a bug? Let us know so we can fix it for everyone.',
      icon: 'flag',
      url: 'https://github.com/tbg-development/derby-rules/issues',
      linkText: 'Open an issue',
      accent: 'primary',
    },
  ];
}
