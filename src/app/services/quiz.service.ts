import { computed, inject, Injectable } from '@angular/core';
import { QuizQuestion, QuizTopic } from '../models/quiz';
import { SkillLevelService } from './skill-level.service';
import { ReadingAgeService } from './reading-age.service';
import { ContentLoaderService } from './content-loader.service';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private readonly skillLevel = inject(SkillLevelService);
  private readonly readingAge = inject(ReadingAgeService);
  private readonly content = inject(ContentLoaderService);

  readonly topics = computed<QuizTopic[]>(() => {
    const merged = this.content.merged();
    if (!merged) return [];
    const level = this.skillLevel.level();
    const age = this.readingAge.effectiveReadingAge();
    const filterByLevel = (this.content.activeManifest()?.skillLevels.length ?? 0) > 0;
    return (merged.quizzes[age] ?? [])
      .map((topic) => ({
        ...topic,
        questions: topic.questions.filter((q) => !filterByLevel || q.skillLevels.includes(level)),
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

  readonly allQuestionsForCurrentAge = computed<QuizQuestion[]>(() =>
    this.topics().flatMap((t) => t.questions),
  );
}
