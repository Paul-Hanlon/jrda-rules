import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { ProgressService } from '../../services/progress.service';
import { DailyJamService } from '../../services/daily-jam.service';
import { QuizQuestion } from '../../models/quiz';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { JerseyNumberComponent } from '../../shared/components/jersey-number/jersey-number.component';
import { FlagQuestionDialogComponent } from '../../shared/components/flag-question-dialog/flag-question-dialog.component';

@Component({
  selector: 'app-quiz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, JerseyNumberComponent, FlagQuestionDialogComponent],
  template: `
    <div class="quiz">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a routerLink="/quizzes">Quizzes</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{{ isDailyMode() ? 'Daily Jam' : (topic()?.title ?? 'Quiz') }}</span>
      </nav>

      @if (showResults()) {
        <!-- ─────────── Results view ─────────── -->
        <section class="results" aria-label="Quiz results">
          <div class="kicker">Quiz complete</div>
          <h1>Final Score</h1>

          <div
            class="ring"
            role="img"
            [attr.aria-label]="'Score: ' + percentage() + ' percent'"
          >
            <svg viewBox="0 0 200 200" width="200" height="200">
              <g transform="rotate(-90 100 100)">
                <circle
                  cx="100"
                  cy="100"
                  r="86"
                  fill="none"
                  stroke="var(--color-surface-alt)"
                  stroke-width="14"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="86"
                  fill="none"
                  [attr.stroke]="gradeStroke()"
                  stroke-width="14"
                  stroke-linecap="round"
                  [attr.stroke-dasharray]="ringDash()"
                />
              </g>
            </svg>
            <div class="ring-label">
              <span class="ring-pct">{{ percentage() }}%</span>
              <span class="ring-fraction">{{ score() }}/{{ questions().length }}</span>
            </div>
          </div>

          <p class="grade-blurb">{{ gradeText() }}</p>

          <div class="results-actions">
            <button type="button" class="pill pill-primary" (click)="retake()">
              <app-icon name="sparkle" [size]="16" [strokeWidth]="2.4" />
              Retake
            </button>
            <a routerLink="/quizzes" class="pill pill-ghost">
              <app-icon name="chev-left" [size]="16" [strokeWidth]="2.4" />
              All quizzes
            </a>
          </div>

          <section class="review" aria-label="Review your answers">
            <div class="section-head">
              <div class="kicker kicker-muted">Review</div>
              <h2>Your answers</h2>
            </div>
            <div class="review-list">
              @for (q of questions(); track q.id; let i = $index) {
                @let correct = answers()[i] === q.correctIndex;
                <article class="review-row" [class.row-correct]="correct" [class.row-wrong]="!correct">
                  <p class="review-q"><strong>{{ i + 1 }}.</strong> {{ q.question }}</p>
                  <p class="review-a">
                    Your answer: <strong>{{ q.options[answers()[i]] }}</strong>
                    @if (!correct) {
                      <br />Correct: <strong>{{ q.options[q.correctIndex] }}</strong>
                    }
                  </p>
                  <p class="review-expl">{{ q.explanation }}</p>
                </article>
              }
            </div>
          </section>
        </section>
      } @else if (currentQuestion(); as q) {
        <!-- ─────────── In-flight view ─────────── -->

        <!-- Scoreboard strip -->
        <div class="scoreboard">
          <div class="score-head">
            <div class="score-title">
              <div class="kicker kicker-on-ink">Quiz</div>
              <div class="score-topic">{{ isDailyMode() ? 'Daily Jam' : (topic()?.title ?? 'Quiz') }}</div>
            </div>
            <div class="score-progress">
              <div class="score-numbers">
                <span>Q{{ currentIndex() + 1 }}/{{ questions().length }}</span>
                <span>{{ progressPct() }}%</span>
              </div>
              <div class="score-bar" aria-hidden="true">
                <div class="score-fill" [style.width.%]="progressPct()"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Question card -->
        <div class="q-card">
          <div class="q-head">
            <div class="q-head-left">
              <app-jersey-number
                [n]="currentIndex() + 1"
                [size]="44"
                background="var(--color-primary)"
                borderColor="var(--color-text)"
              />
              <span class="kicker kicker-muted">
                Question {{ currentIndex() + 1 }} of {{ questions().length }}
              </span>
            </div>
            <button
              type="button"
              class="flag-btn"
              aria-label="Flag this question"
              (click)="showFlagDialog.set(true)"
            >
              <app-icon name="flag" [size]="18" [strokeWidth]="2.2" />
            </button>
          </div>

          <h2 class="q-stem">{{ q.question }}</h2>

          <div class="options" role="radiogroup" aria-label="Answer options">
            @for (option of q.options; track option; let i = $index) {
              @let state = optionState(i, q);
              <button
                type="button"
                role="radio"
                class="option"
                [class.option-selected]="state === 'selected'"
                [class.option-correct]="state === 'correct'"
                [class.option-wrong]="state === 'wrong'"
                [disabled]="answered()"
                [attr.aria-checked]="selectedOption() === i"
                (click)="selectOption(i)"
              >
                <span class="letter">{{ optionLetters[i] }}</span>
                <span class="option-text">{{ option }}</span>
                @if (state === 'correct') {
                  <app-icon name="check" [size]="20" [strokeWidth]="3" />
                }
                @if (state === 'wrong') {
                  <app-icon name="close" [size]="20" [strokeWidth]="3" />
                }
              </button>
            }
          </div>

          @if (answered()) {
            @let gotIt = selectedOption() === q.correctIndex;
            <aside
              class="feedback"
              [class.feedback-correct]="gotIt"
              [class.feedback-wrong]="!gotIt"
              aria-live="polite"
            >
              <div class="feedback-head">{{ gotIt ? '✓ Correct!' : '✗ Not quite' }}</div>
              <p class="feedback-body">{{ q.explanation }}</p>
              <div class="feedback-rule">Rule {{ q.ruleReference }}</div>
            </aside>
            <div class="advance">
              <button type="button" class="pill pill-primary" (click)="nextQuestion()">
                {{ currentIndex() === questions().length - 1 ? 'See results' : 'Next question' }}
                <app-icon name="arrow-right" [size]="16" [strokeWidth]="2.4" />
              </button>
            </div>
          }

          @if (showFlagDialog()) {
            <app-flag-question-dialog
              [contentText]="q.question"
              [contentId]="q.id"
              [contextTitle]="topic()?.title ?? 'Unknown'"
              [ruleReference]="q.ruleReference"
              (closed)="showFlagDialog.set(false)"
            />
          }
        </div>
      } @else {
        <div class="not-found">
          <p>Quiz not found.</p>
          <a routerLink="/quizzes" class="pill pill-ghost">
            <app-icon name="chev-left" [size]="16" [strokeWidth]="2.4" />
            All quizzes
          </a>
        </div>
      }
    </div>
  `,
  styles: `
    .quiz {
      display: flex;
      flex-direction: column;
      gap: 18px;
      max-width: 720px;
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

    .kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-primary);
    }

    .kicker-muted {
      color: var(--color-text-muted);
    }

    .kicker-on-ink {
      color: var(--color-surface);
      opacity: 0.7;
      font-size: 0.625rem;
    }

    /* ─── Scoreboard ─── */
    .scoreboard {
      background: var(--color-text);
      color: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      padding: 14px 18px;
    }

    .score-head {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      align-items: center;
    }

    .score-title {
      flex: 0 0 auto;
    }

    .score-topic {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1rem;
      letter-spacing: -0.01em;
      margin-top: 2px;
    }

    .score-progress {
      flex: 1;
      min-width: 180px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .score-numbers {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.08em;
    }

    .score-bar {
      height: 10px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 999px;
      overflow: hidden;
    }

    .score-fill {
      height: 100%;
      background: var(--color-accent);
      transition: width 0.3s ease;
    }

    @media (prefers-reduced-motion: reduce) {
      .score-fill { transition: none; }
    }

    /* ─── Question card ─── */
    .q-card {
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      padding: 24px;
    }

    .q-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      gap: 10px;
    }

    .q-head-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .flag-btn {
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

    .q-stem {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.375rem;
      line-height: 1.3;
      margin: 8px 0 18px;
      color: var(--color-text);
    }

    /* ─── Options ─── */
    .options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .option {
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
      .option { transition: none; }
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

    .option-text {
      flex: 1;
      font-family: var(--font-body);
      font-size: 0.9375rem;
    }

    .option-selected {
      background: var(--color-primary-soft);
      border-color: var(--color-primary);
      box-shadow: var(--shadow-md);
    }

    .option-correct {
      background: var(--color-success);
      color: #fff;
      border-color: var(--color-text);
      box-shadow: var(--shadow-md);
    }

    .option-correct .letter,
    .option-wrong .letter {
      background: rgba(255, 255, 255, 0.22);
      border-color: currentColor;
      color: #fff;
    }

    .option-wrong {
      background: var(--color-error);
      color: #fff;
      border-color: var(--color-text);
      box-shadow: var(--shadow-md);
    }

    /* ─── Feedback ─── */
    .feedback {
      margin-top: 16px;
      padding: 16px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      border-left-width: 6px;
    }

    .feedback-correct {
      background: var(--color-surface-alt);
      border-left-color: var(--color-success);
    }

    .feedback-correct .feedback-head {
      color: var(--color-success);
    }

    .feedback-wrong {
      background: var(--color-jrda-bg);
      border-left-color: var(--color-error);
    }

    .feedback-wrong .feedback-head {
      color: var(--color-error);
    }

    .feedback-head {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 0.8125rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .feedback-body {
      font-family: var(--font-body);
      font-size: 0.875rem;
      line-height: 1.55;
      color: var(--color-text);
      margin: 0;
    }

    .feedback-rule {
      margin-top: 10px;
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .advance {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }

    /* ─── Pills ─── */
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

    .pill-primary {
      background: var(--color-primary);
      color: #fff;
    }

    .pill-ghost {
      background: var(--color-surface);
      color: var(--color-text);
    }

    /* ─── Results ─── */
    .results {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 20px 0;
      text-align: center;
    }

    .results h1 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 2.75rem;
      letter-spacing: -0.02em;
      margin: 6px 0 4px;
    }

    .ring {
      position: relative;
      width: 200px;
      height: 200px;
    }

    .ring-label {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .ring-pct {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 2.875rem;
      line-height: 1;
      color: var(--color-text);
    }

    .ring-fraction {
      margin-top: 4px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }

    .grade-blurb {
      margin: 0;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.125rem;
      color: var(--color-text);
    }

    .results-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .review {
      width: 100%;
      text-align: left;
      margin-top: 24px;
    }

    .section-head {
      margin-bottom: var(--space-sm);
    }

    .section-head h2 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.375rem;
      letter-spacing: -0.01em;
      margin: 0;
    }

    .review-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .review-row {
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      padding: 16px;
      border-left-width: 6px;
    }

    .row-correct {
      border-left-color: var(--color-success);
    }

    .row-wrong {
      border-left-color: var(--color-error);
    }

    .review-q {
      margin: 0 0 6px;
      font-family: var(--font-display);
      font-weight: 800;
      color: var(--color-text);
    }

    .review-a {
      margin: 0;
      font-family: var(--font-body);
      font-size: 0.8125rem;
      color: var(--color-text-secondary);
    }

    .review-expl {
      margin: 6px 0 0;
      font-family: var(--font-body);
      font-size: 0.8125rem;
      line-height: 1.5;
      color: var(--color-text-muted);
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
export class QuizComponent implements OnInit {
  readonly topicId = input.required<string>();

  private readonly quizService = inject(QuizService);
  private readonly progressService = inject(ProgressService);
  private readonly dailyJam = inject(DailyJamService);

  protected readonly isDailyMode = computed(() => this.topicId() === 'daily');

  protected readonly questions = signal<QuizQuestion[]>([]);
  protected readonly currentIndex = signal(0);
  protected readonly selectedOption = signal<number>(-1);
  protected readonly answered = signal(false);
  protected readonly answers = signal<number[]>([]);
  protected readonly showResults = signal(false);
  protected readonly showFlagDialog = signal(false);

  protected readonly optionLetters = ['A', 'B', 'C', 'D'];

  protected readonly topic = computed(() => {
    const id = this.topicId();
    return this.quizService.topics().find((t) => t.id === id);
  });

  protected readonly currentQuestion = computed(() => {
    return this.questions()[this.currentIndex()] ?? null;
  });

  /** Progress bar uses idx / total — empty at Q1, full only after the last Q. */
  protected readonly progressPct = computed(() => {
    const total = this.questions().length;
    if (!total) return 0;
    return Math.round((this.currentIndex() / total) * 100);
  });

  protected readonly score = computed(() => {
    const qs = this.questions();
    return this.answers().reduce(
      (sum, ans, i) => sum + (ans === qs[i]?.correctIndex ? 1 : 0),
      0,
    );
  });

  protected readonly percentage = computed(() => {
    const total = this.questions().length;
    if (total === 0) return 0;
    return Math.round((this.score() / total) * 100);
  });

  protected readonly gradeText = computed(() => {
    const pct = this.percentage();
    if (pct >= 90) return 'Amazing! You really know your rules!';
    if (pct >= 80) return 'Great job! Keep it up!';
    if (pct >= 60) return 'Good effort! Review the rules you missed.';
    return "Keep studying! You'll get there!";
  });

  protected readonly gradeStroke = computed(() => {
    const pct = this.percentage();
    if (pct >= 80) return 'var(--color-success)';
    if (pct >= 60) return '#ffb703';
    return 'var(--color-error)';
  });

  /** 2π × r where r = 86 — used by the score ring dasharray. */
  private readonly ringCircumference = 2 * Math.PI * 86;

  protected readonly ringDash = computed(() => {
    const filled = (this.percentage() / 100) * this.ringCircumference;
    return `${filled} ${this.ringCircumference}`;
  });

  ngOnInit(): void {
    this.startQuiz();
  }

  protected optionState(i: number, q: QuizQuestion): 'idle' | 'selected' | 'correct' | 'wrong' {
    if (!this.answered()) {
      return this.selectedOption() === i ? 'selected' : 'idle';
    }
    if (i === q.correctIndex) return 'correct';
    if (this.selectedOption() === i) return 'wrong';
    return 'idle';
  }

  protected selectOption(index: number): void {
    if (this.answered()) return;
    this.selectedOption.set(index);
    this.answered.set(true);
    this.answers.update((a) => {
      const next = [...a];
      next[this.currentIndex()] = index;
      return next;
    });
  }

  protected nextQuestion(): void {
    const nextIdx = this.currentIndex() + 1;
    if (nextIdx >= this.questions().length) {
      const attemptTopicId = this.isDailyMode() ? this.dailyJam.todayTopicId() : this.topicId();
      this.progressService.recordQuizAttempt(
        attemptTopicId,
        this.score(),
        this.questions().length,
      );
      this.showResults.set(true);
    } else {
      this.currentIndex.set(nextIdx);
      this.selectedOption.set(-1);
      this.answered.set(false);
      this.showFlagDialog.set(false);
    }
  }

  protected retake(): void {
    this.startQuiz();
  }

  private startQuiz(): void {
    if (this.isDailyMode()) {
      const q = this.dailyJam.todayQuestion();
      this.questions.set(q ? [q] : []);
    } else {
      this.questions.set(this.quizService.getShuffledQuestions(this.topicId()));
    }
    this.currentIndex.set(0);
    this.selectedOption.set(-1);
    this.answered.set(false);
    this.answers.set([]);
    this.showResults.set(false);
    this.showFlagDialog.set(false);
  }
}
