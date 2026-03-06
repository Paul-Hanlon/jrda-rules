import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CasebookService } from '../../services/casebook.service';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-casebook-scenario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="scenario">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a routerLink="/casebook">Casebook</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{{ scenario()?.ruleReference ?? 'Scenario' }}</span>
      </nav>

      @if (scenario(); as s) {
        <div class="scenario-card">
          <span class="rule-ref">Rule {{ s.ruleReference }}</span>
          <h1>Scenario</h1>
          <p class="situation">{{ s.situation }}</p>

          <h2>What's the call?</h2>
          <div class="choices" role="radiogroup" aria-label="Choose the correct outcome">
            @for (choice of s.choices; track choice; let i = $index) {
              <button
                class="choice-btn"
                [class.selected]="selectedChoice() === i"
                [class.correct]="revealed() && i === s.correctIndex"
                [class.wrong]="revealed() && selectedChoice() === i && i !== s.correctIndex"
                [disabled]="revealed()"
                role="radio"
                [attr.aria-checked]="selectedChoice() === i"
                (click)="selectChoice(i)"
              >
                {{ choice }}
              </button>
            }
          </div>

          @if (selectedChoice() >= 0 && !revealed()) {
            <button class="btn primary" (click)="reveal()">Check Answer</button>
          }

          @if (revealed()) {
            <div class="result" [class.correct]="selectedChoice() === s.correctIndex">
              <h3>
                @if (selectedChoice() === s.correctIndex) {
                  Correct!
                } @else {
                  Not quite!
                }
              </h3>

              <div class="outcome">
                <strong>Outcome:</strong>
                <p>{{ s.outcome }}</p>
              </div>

              <div class="rationale">
                <strong>Rationale:</strong>
                <p>{{ s.rationale }}</p>
              </div>

              @if (s.keepInMind) {
                <div class="keep-in-mind">
                  <strong>Keep in Mind:</strong>
                  <p>{{ s.keepInMind }}</p>
                </div>
              }
            </div>

            <div class="actions">
              @if (nextScenarioId(); as nextId) {
                <a [routerLink]="['/casebook', nextId]" class="btn primary">Next Scenario</a>
              }
              <a routerLink="/casebook" class="btn secondary">All Scenarios</a>
            </div>
          }
        </div>
      } @else {
        <p>Scenario not found.</p>
        <a routerLink="/casebook">Back to Casebook</a>
      }
    </div>
  `,
  styles: `
    .scenario {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      max-width: 700px;
      margin: 0 auto;
      width: 100%;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);

      a { color: var(--color-primary); }
    }

    .scenario-card {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      padding: var(--space-xl);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .rule-ref {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: var(--font-size-sm);
      color: var(--color-primary);
    }

    h1 {
      font-size: var(--font-size-xl);
      color: var(--color-primary);
    }

    .situation {
      line-height: 1.7;
      font-size: var(--font-size-base);
    }

    h2 {
      font-size: var(--font-size-lg);
    }

    .choices {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .choice-btn {
      width: 100%;
      padding: var(--space-md) var(--space-lg);
      text-align: left;
      border: 2px solid var(--color-border);
      border-radius: var(--radius-md);
      min-height: var(--touch-target);
      line-height: 1.5;
      transition: border-color 0.15s, background 0.15s;

      &:hover:not(:disabled) {
        border-color: var(--color-primary);
        background: color-mix(in srgb, var(--color-primary) 5%, transparent);
      }

      &.selected {
        border-color: var(--color-primary);
        background: color-mix(in srgb, var(--color-primary) 10%, transparent);
      }

      &.correct {
        border-color: var(--color-success);
        background: color-mix(in srgb, var(--color-success) 10%, transparent);
      }

      &.wrong {
        border-color: var(--color-error);
        background: color-mix(in srgb, var(--color-error) 10%, transparent);
      }

      &:disabled { cursor: default; }
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-sm) var(--space-xl);
      border-radius: var(--radius-sm);
      font-weight: 600;
      min-height: var(--touch-target);
      text-decoration: none;

      &.primary {
        background: var(--color-primary);
        color: #fff;
        &:hover { background: var(--color-primary-dark); text-decoration: none; }
      }

      &.secondary {
        background: var(--color-border-light);
        color: var(--color-text);
        &:hover { background: var(--color-border); text-decoration: none; }
      }
    }

    .result {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      padding: var(--space-lg);
      border-radius: var(--radius-md);
      background: color-mix(in srgb, var(--color-error) 5%, transparent);
      border-left: 4px solid var(--color-error);

      &.correct {
        background: color-mix(in srgb, var(--color-success) 5%, transparent);
        border-left-color: var(--color-success);
      }

      h3 {
        font-size: var(--font-size-lg);
      }
    }

    .outcome, .rationale, .keep-in-mind {
      line-height: 1.6;

      strong {
        display: block;
        margin-bottom: var(--space-xs);
        font-size: var(--font-size-sm);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-text-muted);
      }
    }

    .keep-in-mind {
      padding: var(--space-md);
      background: var(--color-jrda-bg);
      border-radius: var(--radius-sm);
    }

    .actions {
      display: flex;
      gap: var(--space-md);
    }
  `,
})
export class CasebookScenarioComponent {
  readonly scenarioId = input.required<string>();

  private readonly casebookService = inject(CasebookService);
  private readonly progressService = inject(ProgressService);

  protected readonly selectedChoice = signal(-1);
  protected readonly revealed = signal(false);

  constructor() {
    effect(() => {
      this.scenarioId();
      this.selectedChoice.set(-1);
      this.revealed.set(false);
    });
  }

  protected readonly scenario = computed(() => {
    const id = this.scenarioId();
    return this.casebookService.scenarios().find((s) => s.id === id);
  });

  protected readonly nextScenarioId = computed(() => {
    const current = this.scenario();
    if (!current) return null;
    const all = this.casebookService.scenarios();
    const idx = all.findIndex((s) => s.id === current.id);
    return idx >= 0 && idx < all.length - 1 ? all[idx + 1].id : null;
  });

  protected selectChoice(index: number): void {
    if (this.revealed()) return;
    this.selectedChoice.set(index);
  }

  protected reveal(): void {
    this.revealed.set(true);
    this.progressService.markScenarioCompleted(this.scenarioId());
  }
}
