import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RulesService } from '../../services/rules.service';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-rules-browser',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="rules-browser">
      <h1>Rules Browser</h1>
      <p class="intro">Explore the official JRDA rules by section. Rules are filtered for your current skill level.</p>

      <div class="section-grid">
        @for (section of rulesService.sections(); track section.id) {
          <a [routerLink]="['/rules', section.id]" class="section-card">
            <span class="section-icon" aria-hidden="true">{{ section.icon }}</span>
            <div class="section-info">
              <h2>{{ section.number }}. {{ section.title }}</h2>
              <p>{{ section.description }}</p>
              <span class="rule-count">{{ section.rules.length }} rules</span>
            </div>
          </a>
        }
      </div>
    </div>
  `,
  styles: `
    .rules-browser {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    h1 {
      font-size: var(--font-size-2xl);
      color: var(--color-primary);
    }

    .intro {
      color: var(--color-text-secondary);
    }

    .section-grid {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .section-card {
      display: flex;
      gap: var(--space-lg);
      padding: var(--space-lg);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      text-decoration: none;
      color: var(--color-text);
      transition: box-shadow 0.15s, transform 0.15s;

      &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
        text-decoration: none;
      }
    }

    .section-icon {
      font-size: 2.5rem;
      flex-shrink: 0;
    }

    .section-info {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);

      h2 {
        font-size: var(--font-size-lg);
        color: var(--color-primary-dark);
      }

      p {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
      }
    }

    .rule-count {
      font-size: var(--font-size-xs);
      color: var(--color-text-muted);
      font-weight: 600;
    }
  `,
})
export class RulesBrowserComponent {
  protected readonly rulesService = inject(RulesService);
  protected readonly progressService = inject(ProgressService);
}
