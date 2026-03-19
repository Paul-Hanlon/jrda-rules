import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface SupportOption {
  title: string;
  description: string;
  icon: string;
  url: string;
  linkText: string;
  color: string;
  action?: 'share';
}

@Component({
  selector: 'app-support',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="support-page">
      <section class="hero">
        <h1>Support This Project</h1>
        <p class="subtitle">
          This site is free and ad-free. If it's helped you learn the rules of junior roller derby,
          consider supporting us so we can keep it running.
        </p>
      </section>

      <section class="costs" aria-label="What your support covers">
        <h2 class="section-title">What Your Support Covers</h2>
        <div class="cost-grid">
          <div class="cost-card">
            <span class="cost-icon" aria-hidden="true">&#9729;</span>
            <div class="cost-info">
              <h3>Hosting</h3>
              <p>Keeping the site online and fast for everyone</p>
            </div>
          </div>
          <div class="cost-card">
            <span class="cost-icon" aria-hidden="true">&#128295;</span>
            <div class="cost-info">
              <h3>Maintenance</h3>
              <p>Updating content when rules change each season</p>
            </div>
          </div>
          <div class="cost-card">
            <span class="cost-icon" aria-hidden="true">&#10024;</span>
            <div class="cost-info">
              <h3>New Features</h3>
              <p>Adding more quizzes, scenarios, and learning tools</p>
            </div>
          </div>
        </div>
      </section>

      <section class="options" aria-label="Ways to support">
        <h2 class="section-title">Ways to Help</h2>
        <div class="options-grid">
          @for (option of supportOptions; track option.title) {
            @if (option.action === 'share') {
              <button
                type="button"
                class="option-card"
                [style.--card-color]="option.color"
                (click)="share(option)"
              >
                <span class="option-icon" aria-hidden="true">{{ option.icon }}</span>
                <h3>{{ option.title }}</h3>
                <p>{{ option.description }}</p>
                <span class="option-link" aria-live="polite">
                  {{ copied() ? 'Copied!' : option.linkText }}
                </span>
              </button>
            } @else {
              <a
                [href]="option.url"
                target="_blank"
                rel="noopener noreferrer"
                class="option-card"
                [style.--card-color]="option.color"
              >
                <span class="option-icon" aria-hidden="true">{{ option.icon }}</span>
                <h3>{{ option.title }}</h3>
                <p>{{ option.description }}</p>
                <span class="option-link">{{ option.linkText }}</span>
              </a>
            }
          }
        </div>
      </section>

      <section class="thanks">
        <p>
          Every bit of support helps keep this resource available for skaters, coaches, and officials
          across the junior roller derby community. Thank you!
        </p>
      </section>
    </div>
  `,
  styles: `
    .support-page {
      display: flex;
      flex-direction: column;
      gap: var(--space-2xl);
    }

    .hero {
      text-align: center;
      padding: var(--space-xl) 0;
    }

    h1 {
      font-size: var(--font-size-3xl);
      color: var(--color-primary);
      margin-bottom: var(--space-sm);
    }

    .subtitle {
      font-size: var(--font-size-lg);
      color: var(--color-text-secondary);
      max-width: 600px;
      margin: 0 auto;
    }

    .section-title {
      font-size: var(--font-size-xl);
      margin-bottom: var(--space-md);
    }

    .cost-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-md);
    }

    .cost-card {
      display: flex;
      align-items: flex-start;
      gap: var(--space-md);
      padding: var(--space-lg);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .cost-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .cost-info h3 {
      font-size: var(--font-size-base);
      margin-bottom: var(--space-xs);
    }

    .cost-info p {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }

    .options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: var(--space-md);
    }

    .option-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-sm);
      padding: var(--space-lg);
      background: var(--color-surface);
      border: none;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      border-left: 4px solid var(--card-color, var(--color-primary));
      text-decoration: none;
      color: var(--color-text);
      font-family: inherit;
      cursor: pointer;
      text-align: start;
      transition:
        box-shadow 0.15s,
        transform 0.15s;

      &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
        text-decoration: none;
      }

      h3 {
        font-size: var(--font-size-lg);
        color: var(--card-color, var(--color-primary));
      }

      p {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        flex: 1;
      }
    }

    .option-icon {
      font-size: 2rem;
    }

    .option-link {
      display: inline-block;
      font-weight: 700;
      font-size: var(--font-size-sm);
      color: var(--card-color, var(--color-primary));
    }

    .thanks {
      text-align: center;
      padding: var(--space-lg);
      background: color-mix(in srgb, var(--color-primary) 5%, transparent);
      border-radius: var(--radius-lg);

      p {
        font-size: var(--font-size-base);
        color: var(--color-text-secondary);
        max-width: 600px;
        margin: 0 auto;
      }
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

  protected readonly supportOptions: SupportOption[] = [
    {
      title: 'Buy Us a Coffee',
      description: 'A one-time donation to help cover hosting and development costs.',
      icon: '\u2615',
      url: 'https://buymeacoffee.com/fubar_137',
      linkText: 'Donate \u2192',
      color: 'var(--color-jrda)',
    },
    {
      title: 'Share the Site',
      description:
        'Know a skater, coach, or official who could use this? Spread the word in your league.',
      icon: '\u{1F4E3}',
      url: 'https://jrda-rules.web.app',
      linkText: 'Copy link \u2192',
      color: 'var(--color-secondary)',
      action: 'share',
    },
    {
      title: 'Report Issues',
      description:
        'Found an incorrect rule or a bug? Let us know so we can fix it for everyone.',
      icon: '\u{1F41B}',
      url: 'https://github.com/Paul-Hanlon/jrda-rules/issues',
      linkText: 'Open an issue \u2192',
      color: 'var(--color-accent)',
    },
  ];
}
