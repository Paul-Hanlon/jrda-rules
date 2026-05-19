import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CasebookService } from '../../services/casebook.service';
import { ProgressService } from '../../services/progress.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CasebookScenario } from '../../models/casebook';

interface ScenarioRowVM {
  scenario: CasebookScenario;
  index: number;
  caseTag: string;
  solved: boolean;
}

@Component({
  selector: 'app-casebook-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    <section class="casebook-list">
      <header class="page-head">
        <div class="kicker">Real game scenarios</div>
        <h1>Casebook</h1>
        <p class="intro">
          What's the right call? Work through real situations from the casebook.
        </p>
      </header>

      <div class="scenario-list">
        @for (vm of scenarioVMs(); track vm.scenario.id) {
          <a
            class="scenario-row"
            [routerLink]="['/casebook', vm.scenario.id]"
            [attr.aria-label]="vm.caseTag + ' — Rule ' + vm.scenario.ruleReference"
          >
            <span class="case-tag">{{ vm.caseTag }}</span>
            <div class="body">
              <div class="badge-row">
                <span class="chip chip-ink">Rule {{ vm.scenario.ruleReference }}</span>
                @if (vm.solved) {
                  <span class="chip chip-success">
                    <app-icon name="check" [size]="12" [strokeWidth]="3" />
                    Solved
                  </span>
                }
              </div>
              <p class="situation">{{ vm.scenario.situation }}</p>
            </div>
            <app-icon name="arrow-right" [size]="22" [strokeWidth]="2.2" />
          </a>
        }

        @if (scenarioVMs().length === 0) {
          <p class="empty">No scenarios yet. Check back soon.</p>
        }
      </div>
    </section>
  `,
  styles: `
    .casebook-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

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
      color: var(--color-primary);
    }

    .page-head h1 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 2rem;
      letter-spacing: -0.02em;
      margin: 0;
    }

    .intro {
      color: var(--color-text-secondary);
      margin: 0;
    }

    .scenario-list {
      display: grid;
      gap: 14px;
    }

    .scenario-row {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 18px 20px;
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      color: var(--color-text);
      text-decoration: none;
      transition: transform 0.08s, box-shadow 0.08s;

      &:hover {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
        text-decoration: none;
      }
    }

    .case-tag {
      flex-shrink: 0;
      margin-top: 4px;
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .body {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 10px;
      border-radius: var(--radius-chip);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.625rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border: var(--stroke) solid var(--color-text);
      white-space: nowrap;
    }

    .chip-ink {
      background: var(--color-text);
      color: var(--color-accent);
    }

    .chip-success {
      background: var(--color-success);
      color: #fff;
    }

    .situation {
      margin: 0;
      font-family: var(--font-body);
      font-size: 0.875rem;
      line-height: 1.55;
      color: var(--color-text);
    }

    .empty {
      padding: 24px;
      text-align: center;
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }
  `,
})
export class CasebookListComponent {
  private readonly casebookService = inject(CasebookService);
  private readonly progressService = inject(ProgressService);

  protected readonly scenarioVMs = computed<ScenarioRowVM[]>(() => {
    const scenarios = this.casebookService.scenarios();
    const solvedIds = this.progressService.progress().completedScenarioIds;
    return scenarios.map((scenario, index) => ({
      scenario,
      index,
      caseTag: `Case ${String(index + 1).padStart(2, '0')}`,
      solved: solvedIds.includes(scenario.id),
    }));
  });
}
