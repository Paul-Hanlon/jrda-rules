import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { SkillLevelService } from '../../services/skill-level.service';

interface QuickLink {
  path: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="dashboard">
      <section class="hero">
        <h1>Welcome to JRDA Rules!</h1>
        <p class="subtitle">
          Learn the rules of junior roller derby at your own pace.
          You're currently at <strong>{{ skillLevel.level() }}</strong>.
        </p>
      </section>

      <section class="stats" aria-label="Your progress">
        <h2 class="section-title">Your Progress</h2>
        <div class="stat-grid">
          <div class="stat-card">
            <span class="stat-icon" aria-hidden="true">&#128214;</span>
            <div class="stat-info">
              <span class="stat-value">{{ progress.readRuleCount() }}</span>
              <span class="stat-label">Rules Read</span>
            </div>
          </div>
          <div class="stat-card">
            <span class="stat-icon" aria-hidden="true">&#128269;</span>
            <div class="stat-info">
              <span class="stat-value">{{ progress.viewedTermCount() }}</span>
              <span class="stat-label">Terms Viewed</span>
            </div>
          </div>
          <div class="stat-card">
            <span class="stat-icon" aria-hidden="true">&#10004;</span>
            <div class="stat-info">
              <span class="stat-value">{{ progress.masteredTermCount() }}</span>
              <span class="stat-label">Terms Mastered</span>
            </div>
          </div>
          <div class="stat-card">
            <span class="stat-icon" aria-hidden="true">&#128203;</span>
            <div class="stat-info">
              <span class="stat-value">{{ progress.completedScenarioCount() }}</span>
              <span class="stat-label">Scenarios Done</span>
            </div>
          </div>
        </div>
      </section>

      <section class="quick-links" aria-label="Quick links">
        <h2 class="section-title">Start Learning</h2>
        <div class="link-grid">
          @for (link of quickLinks; track link.path) {
            <a [routerLink]="link.path" class="link-card" [style.--card-color]="link.color">
              <span class="link-icon" aria-hidden="true">{{ link.icon }}</span>
              <h3>{{ link.label }}</h3>
              <p>{{ link.description }}</p>
            </a>
          }
        </div>
      </section>
    </div>
  `,
  styles: `
    .dashboard {
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
    }

    .section-title {
      font-size: var(--font-size-xl);
      margin-bottom: var(--space-md);
    }

    .stat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: var(--space-md);
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-lg);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .stat-icon {
      font-size: 2rem;
    }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-family: var(--font-heading);
      font-size: var(--font-size-2xl);
      font-weight: 800;
      color: var(--color-primary);
    }

    .stat-label {
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
    }

    .link-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--space-md);
    }

    .link-card {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      padding: var(--space-lg);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      border-left: 4px solid var(--card-color, var(--color-primary));
      text-decoration: none;
      color: var(--color-text);
      transition: box-shadow 0.15s, transform 0.15s;

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
      }
    }

    .link-icon {
      font-size: 2rem;
    }
  `,
})
export class DashboardComponent {
  protected readonly progress = inject(ProgressService);
  protected readonly skillLevel = inject(SkillLevelService);

  protected readonly quickLinks: QuickLink[] = [
    {
      path: '/rules',
      label: 'Rules Browser',
      description: 'Read through the official JRDA rules section by section',
      icon: '\u{1F4D6}',
      color: 'var(--color-primary)',
    },
    {
      path: '/glossary',
      label: 'Glossary',
      description: 'Look up roller derby terms and test yourself with flashcards',
      icon: '\u{1F50D}',
      color: 'var(--color-secondary)',
    },
    {
      path: '/quizzes',
      label: 'Quizzes',
      description: 'Test your knowledge with multiple-choice questions',
      icon: '\u{2753}',
      color: 'var(--color-accent)',
    },
    {
      path: '/casebook',
      label: 'Casebook',
      description: 'Work through real game scenarios and learn the right calls',
      icon: '\u{1F4CB}',
      color: 'var(--color-level-2)',
    },
  ];
}
