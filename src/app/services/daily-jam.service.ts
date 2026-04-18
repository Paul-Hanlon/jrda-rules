import { Injectable, computed, inject } from '@angular/core';
import { QuizService } from './quiz.service';
import { ProgressService } from './progress.service';
import { ReadingAgeService } from './reading-age.service';
import { QuizQuestion } from '../models/quiz';

@Injectable({ providedIn: 'root' })
export class DailyJamService {
  private readonly quizService = inject(QuizService);
  private readonly progress = inject(ProgressService);
  private readonly readingAgeService = inject(ReadingAgeService);

  readonly todayKey = computed(() => {
    const d = new Date();
    return (
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-` +
      String(d.getDate()).padStart(2, '0')
    );
  });

  readonly todayTopicId = computed(() => `daily-${this.todayKey()}`);

  readonly todayQuestion = computed<QuizQuestion | null>(() => {
    const pool = this.quizService.allQuestionsForCurrentAge();
    if (!pool.length) return null;
    const seed = this.hashString(this.todayKey() + this.readingAgeService.effectiveReadingAge());
    return pool[seed % pool.length];
  });

  readonly answeredToday = computed(() => {
    const topicId = this.todayTopicId();
    return this.progress.progress().quizAttempts.some((a) => a.topicId === topicId);
  });

  readonly todayResult = computed(() => {
    const topicId = this.todayTopicId();
    return this.progress.progress().quizAttempts.find((a) => a.topicId === topicId) ?? null;
  });

  private hashString(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }
}
