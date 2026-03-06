import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { ProgressService } from '../../services/progress.service';
import { QuizQuestion } from '../../models/quiz';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-quiz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ProgressBarComponent],
  template: `
    <div class="quiz">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a routerLink="/quizzes">Quizzes</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{{ topic()?.title ?? 'Quiz' }}</span>
      </nav>

      @if (showResults()) {
        <div class="results">
          <h1>Quiz Complete!</h1>
          <div class="score-circle" [attr.data-grade]="grade()">
            <span class="score-value">{{ score() }}/{{ questions().length }}</span>
            <span class="score-label">{{ percentage() }}%</span>
          </div>
          <p class="grade-text">{{ gradeText() }}</p>

          <div class="results-review">
            <h2>Review Your Answers</h2>
            @for (q of questions(); track q.id; let i = $index) {
              <div class="review-item" [class.correct]="answers()[i] === q.correctIndex" [class.wrong]="answers()[i] !== q.correctIndex">
                <p class="review-question"><strong>{{ i + 1 }}.</strong> {{ q.question }}</p>
                <p class="review-answer">
                  Your answer: {{ q.options[answers()[i]] }}
                  @if (answers()[i] !== q.correctIndex) {
                    <br />Correct: {{ q.options[q.correctIndex] }}
                  }
                </p>
                <p class="review-explanation">{{ q.explanation }}</p>
              </div>
            }
          </div>

          <div class="results-actions">
            <button class="btn primary" (click)="retake()">Retake Quiz</button>
            <a routerLink="/quizzes" class="btn secondary">All Quizzes</a>
          </div>
        </div>
      } @else if (currentQuestion(); as q) {
        <div class="question-container">
          <app-progress-bar
            [value]="currentIndex()"
            [max]="questions().length"
            [label]="'Question ' + (currentIndex() + 1) + ' of ' + questions().length"
          />

          <div class="question-card">
            <span class="question-number">Question {{ currentIndex() + 1 }} of {{ questions().length }}</span>
            <h2>{{ q.question }}</h2>

            <div class="options" role="radiogroup" aria-label="Answer options">
              @for (option of q.options; track option; let i = $index) {
                <button
                  class="option-btn"
                  [class.selected]="selectedOption() === i"
                  [class.correct]="answered() && i === q.correctIndex"
                  [class.wrong]="answered() && selectedOption() === i && i !== q.correctIndex"
                  [disabled]="answered()"
                  role="radio"
                  [attr.aria-checked]="selectedOption() === i"
                  (click)="selectOption(i)"
                >
                  <span class="option-letter">{{ optionLetters[i] }}</span>
                  {{ option }}
                </button>
              }
            </div>

            @if (answered()) {
              <div class="explanation" [class.correct]="selectedOption() === q.correctIndex">
                <p>
                  @if (selectedOption() === q.correctIndex) {
                    <strong>Correct!</strong>
                  } @else {
                    <strong>Not quite.</strong>
                  }
                  {{ q.explanation }}
                </p>
                <span class="rule-ref">Rule {{ q.ruleReference }}</span>
              </div>
              <button class="btn primary next-btn" (click)="nextQuestion()">
                {{ currentIndex() === questions().length - 1 ? 'See Results' : 'Next Question' }}
              </button>
            }
          </div>
        </div>
      } @else {
        <p>Quiz not found.</p>
        <a routerLink="/quizzes">Back to Quizzes</a>
      }
    </div>
  `,
  styles: `
    .quiz {
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

    .question-card {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      padding: var(--space-xl);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);

      h2 {
        font-size: var(--font-size-xl);
        line-height: 1.4;
      }
    }

    .question-number {
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
      font-weight: 600;
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .option-btn {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      width: 100%;
      padding: var(--space-md) var(--space-lg);
      text-align: left;
      border: 2px solid var(--color-border);
      border-radius: var(--radius-md);
      min-height: var(--touch-target);
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

      &:disabled {
        cursor: default;
      }
    }

    .option-letter {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: var(--radius-full);
      background: var(--color-border-light);
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: var(--font-size-sm);
      flex-shrink: 0;
    }

    .explanation {
      padding: var(--space-md);
      border-radius: var(--radius-sm);
      background: color-mix(in srgb, var(--color-error) 8%, transparent);
      border-left: 3px solid var(--color-error);

      &.correct {
        background: color-mix(in srgb, var(--color-success) 8%, transparent);
        border-left-color: var(--color-success);
      }

      .rule-ref {
        display: inline-block;
        margin-top: var(--space-sm);
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
      }
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

    .next-btn {
      align-self: flex-end;
    }

    // Results
    .results {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-lg);
      text-align: center;

      h1 {
        font-size: var(--font-size-2xl);
        color: var(--color-primary);
      }
    }

    .score-circle {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 6px solid var(--color-success);

      &[data-grade='good'] { border-color: var(--color-success); }
      &[data-grade='ok'] { border-color: var(--color-level-2); }
      &[data-grade='needs-work'] { border-color: var(--color-error); }
    }

    .score-value {
      font-family: var(--font-heading);
      font-size: var(--font-size-2xl);
      font-weight: 800;
    }

    .score-label {
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
    }

    .grade-text {
      font-size: var(--font-size-lg);
      font-weight: 600;
    }

    .results-review {
      width: 100%;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: var(--space-md);

      h2 {
        font-size: var(--font-size-lg);
      }
    }

    .review-item {
      padding: var(--space-md);
      background: var(--color-surface);
      border-radius: var(--radius-md);
      border-left: 3px solid var(--color-border);

      &.correct { border-left-color: var(--color-success); }
      &.wrong { border-left-color: var(--color-error); }

      .review-question { font-weight: 600; margin-bottom: var(--space-xs); }
      .review-answer { font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-xs); }
      .review-explanation { font-size: var(--font-size-sm); color: var(--color-text-muted); }
    }

    .results-actions {
      display: flex;
      gap: var(--space-md);
    }
  `,
})
export class QuizComponent implements OnInit {
  readonly topicId = input.required<string>();

  private readonly quizService = inject(QuizService);
  private readonly progressService = inject(ProgressService);

  protected readonly questions = signal<QuizQuestion[]>([]);
  protected readonly currentIndex = signal(0);
  protected readonly selectedOption = signal<number>(-1);
  protected readonly answered = signal(false);
  protected readonly answers = signal<number[]>([]);
  protected readonly showResults = signal(false);

  protected readonly optionLetters = ['A', 'B', 'C', 'D'];

  protected readonly topic = computed(() => {
    const id = this.topicId();
    return this.quizService.topics().find((t) => t.id === id);
  });

  protected readonly currentQuestion = computed(() => {
    return this.questions()[this.currentIndex()] ?? null;
  });

  protected readonly score = computed(() => {
    const qs = this.questions();
    return this.answers().reduce((sum, ans, i) => sum + (ans === qs[i]?.correctIndex ? 1 : 0), 0);
  });

  protected readonly percentage = computed(() => {
    const total = this.questions().length;
    if (total === 0) return 0;
    return Math.round((this.score() / total) * 100);
  });

  protected readonly grade = computed(() => {
    const pct = this.percentage();
    if (pct >= 80) return 'good';
    if (pct >= 60) return 'ok';
    return 'needs-work';
  });

  protected readonly gradeText = computed(() => {
    const pct = this.percentage();
    if (pct >= 90) return 'Amazing! You really know your rules!';
    if (pct >= 80) return 'Great job! Keep it up!';
    if (pct >= 60) return 'Good effort! Review the rules you missed.';
    return 'Keep studying! You\'ll get there!';
  });

  ngOnInit(): void {
    this.startQuiz();
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
      this.progressService.recordQuizAttempt(
        this.topicId(),
        this.score(),
        this.questions().length
      );
      this.showResults.set(true);
    } else {
      this.currentIndex.set(nextIdx);
      this.selectedOption.set(-1);
      this.answered.set(false);
    }
  }

  protected retake(): void {
    this.startQuiz();
  }

  private startQuiz(): void {
    this.questions.set(this.quizService.getShuffledQuestions(this.topicId()));
    this.currentIndex.set(0);
    this.selectedOption.set(-1);
    this.answered.set(false);
    this.answers.set([]);
    this.showResults.set(false);
  }
}
