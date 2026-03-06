import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CasebookService } from '../../services/casebook.service';
import { ProgressService } from '../../services/progress.service';

interface SectionInfo {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-casebook-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="casebook-list">
      <h1>Casebook</h1>
      <p class="intro">
        Work through real game scenarios. Pick the right call and learn why!
      </p>

      @for (section of sections; track section.id) {
        @if (getScenarios(section.id); as scenarios) {
          @if (scenarios.length > 0) {
            <section class="section-group">
              <h2>
                <span aria-hidden="true">{{ section.icon }}</span>
                {{ section.title }}
              </h2>
              <div class="scenario-grid">
                @for (scenario of scenarios; track scenario.id) {
                  <a
                    [routerLink]="['/casebook', scenario.id]"
                    class="scenario-card"
                    [class.completed]="isCompleted(scenario.id)"
                  >
                    <span class="scenario-ref">{{ scenario.ruleReference }}</span>
                    <p class="scenario-preview">{{ truncate(scenario.situation) }}</p>
                    @if (isCompleted(scenario.id)) {
                      <span class="completed-badge" aria-label="Completed">&#10003;</span>
                    }
                  </a>
                }
              </div>
            </section>
          }
        }
      }
    </div>
  `,
  styles: `
    .casebook-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    h1 {
      font-size: var(--font-size-2xl);
      color: var(--color-primary);
    }

    .intro {
      color: var(--color-text-secondary);
    }

    .section-group h2 {
      font-size: var(--font-size-lg);
      margin-bottom: var(--space-md);
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .scenario-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--space-md);
    }

    .scenario-card {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      padding: var(--space-lg);
      background: var(--color-surface);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      text-decoration: none;
      color: var(--color-text);
      position: relative;
      transition: box-shadow 0.15s, transform 0.15s;

      &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
        text-decoration: none;
      }

      &.completed {
        border-left: 3px solid var(--color-success);
      }
    }

    .scenario-ref {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: var(--font-size-sm);
      color: var(--color-primary);
    }

    .scenario-preview {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      line-height: 1.5;
    }

    .completed-badge {
      position: absolute;
      top: var(--space-md);
      right: var(--space-md);
      color: var(--color-success);
      font-size: var(--font-size-lg);
      font-weight: 700;
    }
  `,
})
export class CasebookListComponent {
  private readonly casebookService = inject(CasebookService);
  private readonly progressService = inject(ProgressService);

  protected readonly sections: SectionInfo[] = [
    { id: 'gameplay', title: 'Gameplay', icon: '\u{1F6DE}' },
    { id: 'scoring', title: 'Scoring', icon: '\u{1F3C6}' },
    { id: 'penalties', title: 'Penalties', icon: '\u26A0\uFE0F' },
    { id: 'officiating', title: 'Officiating', icon: '\u{1F3C1}' },
  ];

  protected getScenarios(sectionId: string) {
    return this.casebookService.scenariosBySection().get(sectionId) ?? [];
  }

  protected isCompleted(scenarioId: string): boolean {
    return this.progressService.progress().completedScenarioIds.includes(scenarioId);
  }

  protected truncate(text: string): string {
    return text.length > 120 ? text.slice(0, 120) + '...' : text;
  }
}
