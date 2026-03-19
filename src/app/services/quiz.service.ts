import { computed, inject, Injectable } from '@angular/core';
import { QUIZ_DATA_BY_AGE } from '../data/quiz-data-by-age';
import { QuizQuestion, QuizTopic } from '../models/quiz';
import { SkillLevelService } from './skill-level.service';
import { ReadingAgeService } from './reading-age.service';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private readonly skillLevel = inject(SkillLevelService);
  private readonly readingAge = inject(ReadingAgeService);

  readonly topics = computed<QuizTopic[]>(() => {
    const level = this.skillLevel.level();
    const age = this.readingAge.effectiveReadingAge();
    const source = QUIZ_DATA_BY_AGE[age];
    return source
      .map((topic) => ({
        ...topic,
        questions: topic.questions.filter((q) => q.skillLevels.includes(level)),
      }))
      .filter((topic) => topic.questions.length > 0);
  });

  getTopic(topicId: string) {
    return computed(() => this.topics().find((t) => t.id === topicId));
  }

  getShuffledQuestions(topicId: string): QuizQuestion[] {
    const topic = this.topics().find((t) => t.id === topicId);
    if (!topic) return [];
    return [...topic.questions].sort(() => Math.random() - 0.5);
  }
}
