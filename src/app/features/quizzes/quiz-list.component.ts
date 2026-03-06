import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-quiz-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="quiz-list">
      <h1>Quizzes</h1>
      <p class="intro">Test your knowledge of JRDA rules. Pick a topic to start!</p>

      <div class="topic-grid">
        @for (topic of quizService.topics(); track topic.id) {
          <a [routerLink]="['/quizzes', topic.id]" class="topic-card">
            <span class="topic-icon" aria-hidden="true">{{ topic.icon }}</span>
            <div class="topic-info">
              <h2>{{ topic.title }}</h2>
              <p>{{ topic.description }}</p>
              <span class="question-count">{{ topic.questions.length }} questions</span>
              @if (getBestScore(topic.id); as best) {
                <span class="best-score">
                  Best: {{ best.score }}/{{ best.total }}
                  ({{ getPercentage(best.score, best.total) }}%)
                </span>
              }
            </div>
          </a>
        }
      </div>
    </div>
  `,
  styles: `
    .quiz-list {
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

    .topic-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-md);
    }

    .topic-card {
      display: flex;
      gap: var(--space-md);
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

    .topic-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .topic-info {
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

    .question-count {
      font-size: var(--font-size-xs);
      color: var(--color-text-muted);
    }

    .best-score {
      font-size: var(--font-size-sm);
      font-weight: 600;
      color: var(--color-success);
    }
  `,
})
export class QuizListComponent {
  protected readonly quizService = inject(QuizService);
  private readonly progressService = inject(ProgressService);

  protected getBestScore(topicId: string) {
    return this.progressService.quizBestScores().get(topicId);
  }

  protected getPercentage(score: number, total: number): number {
    return Math.round((score / total) * 100);
  }
}
