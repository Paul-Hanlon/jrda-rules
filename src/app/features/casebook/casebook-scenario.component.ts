import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CasebookService } from '../../services/casebook.service';
import { ProgressService } from '../../services/progress.service';
import { FlagQuestionDialogComponent } from '../../shared/components/flag-question-dialog/flag-question-dialog.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { LabeledBlockComponent } from '../../shared/components/labeled-block/labeled-block.component';
import { CasebookScenario } from '../../models/casebook';

@Component({
  selector: 'app-casebook-scenario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FlagQuestionDialogComponent, IconComponent, LabeledBlockComponent],
  template: `
    <div class="scenario">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a routerLink="/casebook">Casebook</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{{ scenario()?.ruleReference ?? 'Scenario' }}</span>
      </nav>

      @if (scenario(); as s) {
        <article class="card">
          <div class="head">
            <span class="rule-badge">Rule {{ s.ruleReference }}</span>
            <div class="stamp">
              <app-icon name="whistle" [size]="16" [strokeWidth]="2.2" />
              Game scenario
            </div>
          </div>

          <button
            type="button"
            class="flag-btn"
            aria-label="Flag this scenario"
            (click)="showFlagDialog.set(true)"
          >
            <app-icon name="flag" [size]="18" [strokeWidth]="2.2" />
          </button>

          <h1>Scenario</h1>
          <p class="situation">{{ s.situation }}</p>

          <section class="call-block" aria-label="Choose the correct call">
            <h2>What's the call?</h2>
            <div class="choices" role="radiogroup" aria-label="Casebook choices">
              @for (choice of s.choices; track choice; let i = $index) {
                @let state = choiceState(i, s);
                <button
                  type="button"
                  role="radio"
                  class="choice"
                  [class.choice-selected]="state === 'selected'"
                  [class.choice-correct]="state === 'correct'"
                  [class.choice-wrong]="state === 'wrong'"
                  [disabled]="revealed()"
                  [attr.aria-checked]="selectedChoice() === i"
                  [attr.aria-pressed]="selectedChoice() === i"
                  (click)="selectChoice(i)"
                >
                  <span class="letter">{{ letters[i] }}</span>
                  <span class="choice-text">{{ choice }}</span>
                  @if (state === 'correct') {
                    <app-icon name="check" [size]="20" [strokeWidth]="3" />
                  }
                  @if (state === 'wrong') {
                    <app-icon name="close" [size]="20" [strokeWidth]="3" />
                  }
                </button>
              }
            </div>

            @if (selectedChoice() >= 0 && !revealed()) {
              <button type="button" class="pill pill-primary full" (click)="reveal()">
                <app-icon name="target" [size]="16" [strokeWidth]="2.4" />
                Check answer
              </button>
            }
          </section>

          @if (revealed()) {
            @let gotIt = selectedChoice() === s.correctIndex;
            <aside
              class="reveal"
              [class.reveal-correct]="gotIt"
              [class.reveal-wrong]="!gotIt"
              aria-live="polite"
            >
              <h3 class="reveal-heading">
                {{ gotIt ? '✓ Correct call!' : '✗ Not quite' }}
              </h3>

              <app-labeled-block label="Outcome">{{ s.outcome }}</app-labeled-block>
              <app-labeled-block label="Rationale">{{ s.rationale }}</app-labeled-block>

              @if (s.keepInMind) {
                <div class="keep-callout" role="note" aria-label="Keep in mind">
                  <app-labeled-block label="Keep in mind">{{ s.keepInMind }}</app-labeled-block>
                </div>
              }
            </aside>

            <div class="actions">
              <a routerLink="/casebook" class="pill pill-ghost">
                <app-icon name="chev-left" [size]="16" [strokeWidth]="2.4" />
                All scenarios
              </a>
              @if (nextScenarioId(); as nextId) {
                <a [routerLink]="['/casebook', nextId]" class="pill pill-primary">
                  Next scenario
                  <app-icon name="arrow-right" [size]="16" [strokeWidth]="2.4" />
                </a>
              } @else {
                <a routerLink="/casebook" class="pill pill-primary">
                  Back to list
                  <app-icon name="arrow-right" [size]="16" [strokeWidth]="2.4" />
                </a>
              }
            </div>
          }
        </article>

        @if (showFlagDialog()) {
          <app-flag-question-dialog
            [contentText]="s.situation"
            [contentId]="s.id"
            [contextTitle]="'Casebook Scenario'"
            [ruleReference]="s.ruleReference"
            (closed)="showFlagDialog.set(false)"
          />
        }
      } @else {
        <div class="not-found">
          <p>Scenario not found.</p>
          <a routerLink="/casebook" class="pill pill-ghost">
            <app-icon name="chev-left" [size]="16" [strokeWidth]="2.4" />
            Back to list
          </a>
        </div>
      }
    </div>
  `,
  styles: `
    .scenario {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      max-width: 760px;
      margin: 0 auto;
      width: 100%;
    }

    .crumbs {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      color: var(--color-text-muted);

      a {
        color: var(--color-primary);
        text-decoration: none;
        &:hover { text-decoration: underline; }
      }
    }

    /* Scenario card */
    .card {
      position: relative;
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      padding-right: 48px; /* leave room for the absolute-positioned flag */
    }

    .rule-badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      background: var(--color-text);
      color: var(--color-accent);
      border: var(--stroke) solid var(--color-text);
      border-radius: var(--radius-chip);
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 0.75rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      transform: rotate(-2deg);
      box-shadow: var(--shadow-hard);
    }

    .stamp {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .flag-btn {
      position: absolute;
      top: 18px;
      right: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: transparent;
      border: none;
      color: var(--color-text-muted);
      border-radius: var(--radius-sm);

      &:hover {
        background: var(--color-surface-alt);
        color: var(--color-error);
      }
    }

    h1 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.375rem;
      letter-spacing: -0.02em;
      margin: 0;
    }

    .situation {
      margin: 0;
      font-family: var(--font-body);
      font-size: 0.9375rem;
      line-height: 1.65;
      color: var(--color-text-secondary);
    }

    /* Call block */
    .call-block {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .call-block h2 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.125rem;
      letter-spacing: -0.01em;
      margin: 0;
    }

    .choices {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .choice {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 100%;
      padding: 14px 16px;
      min-height: 56px;
      text-align: left;
      background: var(--color-surface);
      color: var(--color-text);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;

      &:hover:not(:disabled) {
        background: var(--color-surface-alt);
      }

      &:disabled {
        cursor: default;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .choice { transition: none; }
    }

    .letter {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex-shrink: 0;
      background: var(--color-surface-alt);
      border: var(--stroke) solid currentColor;
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 0.875rem;
    }

    .choice-text {
      flex: 1;
      font-family: var(--font-body);
      font-size: 0.9375rem;
      line-height: 1.5;
    }

    .choice-selected {
      background: var(--color-primary-soft);
      border-color: var(--color-primary);
      box-shadow: var(--shadow-md);
    }

    .choice-correct {
      background: var(--color-success);
      color: #fff;
      border-color: var(--color-text);
      box-shadow: var(--shadow-md);
    }

    .choice-wrong {
      background: var(--color-error);
      color: #fff;
      border-color: var(--color-text);
      box-shadow: var(--shadow-md);
    }

    .choice-correct .letter,
    .choice-wrong .letter {
      background: rgba(255, 255, 255, 0.22);
      border-color: currentColor;
      color: #fff;
    }

    /* Pills */
    .pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 18px;
      min-height: 44px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.8125rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      box-shadow: var(--shadow-hard);
      cursor: pointer;
      text-decoration: none;

      &:hover:not(:disabled) {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
        text-decoration: none;
      }
    }

    .pill.full {
      width: 100%;
    }

    .pill-primary {
      background: var(--color-primary);
      color: #fff;
    }

    .pill-ghost {
      background: var(--color-surface);
      color: var(--color-text);
    }

    /* Reveal */
    .reveal {
      margin-top: 4px;
      padding: 18px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      border-left-width: 6px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .reveal-correct {
      background: var(--color-surface-alt);
      border-left-color: var(--color-success);
    }

    .reveal-correct .reveal-heading {
      color: var(--color-success);
    }

    .reveal-wrong {
      background: var(--color-jrda-bg);
      border-left-color: var(--color-error);
    }

    .reveal-wrong .reveal-heading {
      color: var(--color-error);
    }

    .reveal-heading {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.25rem;
      letter-spacing: -0.015em;
      margin: 0;
    }

    .keep-callout {
      padding: 12px;
      background: var(--color-jrda-bg);
      border: var(--stroke) solid var(--color-jrda-border);
      border-radius: var(--radius-sm);
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 4px;
    }

    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 32px 0;
      color: var(--color-text-muted);
    }
  `,
})
export class CasebookScenarioComponent {
  readonly scenarioId = input.required<string>();

  private readonly casebookService = inject(CasebookService);
  private readonly progressService = inject(ProgressService);

  protected readonly letters = ['A', 'B', 'C', 'D'];

  protected readonly selectedChoice = signal(-1);
  protected readonly revealed = signal(false);
  protected readonly showFlagDialog = signal(false);

  constructor() {
    effect(() => {
      // Reset interaction state whenever the route id changes.
      this.scenarioId();
      this.selectedChoice.set(-1);
      this.revealed.set(false);
      this.showFlagDialog.set(false);
    });
  }

  protected readonly scenario = computed<CasebookScenario | undefined>(() =>
    this.casebookService.scenarios().find((s) => s.id === this.scenarioId()),
  );

  protected readonly nextScenarioId = computed<string | null>(() => {
    const current = this.scenario();
    if (!current) return null;
    const all = this.casebookService.scenarios();
    const idx = all.findIndex((s) => s.id === current.id);
    return idx >= 0 && idx < all.length - 1 ? all[idx + 1].id : null;
  });

  protected choiceState(i: number, s: CasebookScenario): 'idle' | 'selected' | 'correct' | 'wrong' {
    if (!this.revealed()) {
      return this.selectedChoice() === i ? 'selected' : 'idle';
    }
    if (i === s.correctIndex) return 'correct';
    if (this.selectedChoice() === i) return 'wrong';
    return 'idle';
  }

  protected selectChoice(index: number): void {
    if (this.revealed()) return;
    this.selectedChoice.set(index);
  }

  protected reveal(): void {
    this.revealed.set(true);
    this.progressService.markScenarioCompleted(this.scenarioId());
  }
}
