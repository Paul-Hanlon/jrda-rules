import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { ProgressService } from '../../services/progress.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { JerseyNumberComponent } from '../../shared/components/jersey-number/jersey-number.component';
import { QuizTopic } from '../../models/quiz';

interface TopicCardVM {
  topic: QuizTopic;
  index: number;
  number: string;
  isEven: boolean;
  bestPct: number | null;
  ctaLabel: string;
}

@Component({
  selector: 'app-quiz-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, JerseyNumberComponent],
  template: `
    <div class="quiz-list">
      <header class="page-head">
        <div class="kicker">Test yourself</div>
        <h1>Quizzes</h1>
        <p class="intro">
          Pick a topic and see what you know. Every answer comes with a rule reference.
        </p>
      </header>

      <div class="topic-grid">
        @for (vm of topicVMs(); track vm.topic.id) {
          <a [routerLink]="['/quizzes', vm.topic.id]" class="topic-card">
            <div class="head">
              <app-jersey-number
                [n]="vm.number"
                [size]="64"
                [background]="vm.isEven ? 'var(--color-primary)' : 'var(--color-text)'"
                borderColor="var(--color-text)"
              />
              <div class="head-text">
                <h3>{{ vm.topic.title }}</h3>
                <div class="meta">
                  {{ vm.topic.questions.length }} Q{{ vm.topic.questions.length === 1 ? '' : 's' }}
                  ·
                  Section {{ vm.topic.sectionId }}
                </div>
              </div>
            </div>

            <p class="desc">{{ vm.topic.description }}</p>

            @if (vm.bestPct !== null) {
              <span
                class="best-chip"
                [class.best-good]="vm.bestPct >= 80"
                [class.best-ok]="vm.bestPct >= 60 && vm.bestPct < 80"
                [class.best-neutral]="vm.bestPct < 60"
              >
                Best {{ vm.bestPct }}%
              </span>
            }

            <div class="footer">
              <span class="cta-label">{{ vm.ctaLabel }}</span>
              <app-icon name="arrow-right" [size]="18" [strokeWidth]="2.4" />
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

    .topic-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 14px;
    }

    .topic-card {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;
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

    .head {
      display: flex;
      gap: 14px;
      align-items: center;
    }

    .head-text {
      flex: 1;
      min-width: 0;
    }

    .head-text h3 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.1875rem;
      letter-spacing: -0.015em;
      margin: 0;
      line-height: 1.15;
      color: var(--color-text);
    }

    .meta {
      margin-top: 4px;
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.04em;
      color: var(--color-text-muted);
    }

    .desc {
      margin: 0;
      font-family: var(--font-body);
      font-size: 0.8125rem;
      color: var(--color-text-muted);
      line-height: 1.5;
    }

    .best-chip {
      align-self: flex-start;
      margin-top: 2px;
      padding: 3px 10px;
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      border-radius: var(--radius-chip);
      border: var(--stroke) solid var(--color-border-strong);
      white-space: nowrap;
    }

    .best-good {
      background: var(--color-success);
      color: #fff;
    }

    .best-ok {
      background: #ffb703;
      color: var(--color-text);
    }

    .best-neutral {
      background: var(--color-surface-alt);
      color: var(--color-text);
    }

    .footer {
      margin-top: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 12px;
      border-top: var(--stroke) solid var(--color-border-strong);
      color: var(--color-primary);
    }

    .cta-label {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.75rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
  `,
})
export class QuizListComponent {
  private readonly quizService = inject(QuizService);
  private readonly progressService = inject(ProgressService);

  protected readonly topicVMs = computed<TopicCardVM[]>(() => {
    const topics = this.quizService.topics();
    const bestMap = this.progressService.quizBestScores();
    return topics.map((topic, index) => {
      const best = bestMap.get(topic.id);
      const bestPct = best ? Math.round((best.score / best.total) * 100) : null;
      return {
        topic,
        index,
        number: String(index + 1).padStart(2, '0'),
        isEven: index % 2 === 0,
        bestPct,
        ctaLabel: best ? 'Retake' : 'Start quiz',
      };
    });
  });
}
