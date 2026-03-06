import { computed, Injectable, signal } from '@angular/core';
import { DEFAULT_PROGRESS, QuizAttempt, UserProgress } from '../models/progress';

const STORAGE_KEY = 'jrda-progress';
const CURRENT_VERSION = 1;

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly _progress = signal<UserProgress>(this.loadProgress());

  readonly progress = this._progress.asReadonly();

  readonly readRuleCount = computed(() => this._progress().readRuleIds.length);
  readonly viewedTermCount = computed(() => this._progress().viewedTermIds.length);
  readonly masteredTermCount = computed(() => this._progress().masteredTermIds.length);
  readonly completedScenarioCount = computed(() => this._progress().completedScenarioIds.length);

  readonly quizBestScores = computed(() => {
    const attempts = this._progress().quizAttempts;
    const bestByTopic = new Map<string, QuizAttempt>();
    for (const attempt of attempts) {
      const existing = bestByTopic.get(attempt.topicId);
      if (!existing || attempt.score / attempt.total > existing.score / existing.total) {
        bestByTopic.set(attempt.topicId, attempt);
      }
    }
    return bestByTopic;
  });

  markRuleRead(ruleId: string): void {
    this._progress.update((p) => {
      if (p.readRuleIds.includes(ruleId)) return p;
      return { ...p, readRuleIds: [...p.readRuleIds, ruleId] };
    });
    this.save();
  }

  markTermViewed(termId: string): void {
    this._progress.update((p) => {
      if (p.viewedTermIds.includes(termId)) return p;
      return { ...p, viewedTermIds: [...p.viewedTermIds, termId] };
    });
    this.save();
  }

  markTermMastered(termId: string): void {
    this._progress.update((p) => {
      if (p.masteredTermIds.includes(termId)) return p;
      return { ...p, masteredTermIds: [...p.masteredTermIds, termId] };
    });
    this.save();
  }

  unmarkTermMastered(termId: string): void {
    this._progress.update((p) => ({
      ...p,
      masteredTermIds: p.masteredTermIds.filter((id) => id !== termId),
    }));
    this.save();
  }

  recordQuizAttempt(topicId: string, score: number, total: number): void {
    const attempt: QuizAttempt = { topicId, score, total, timestamp: Date.now() };
    this._progress.update((p) => ({
      ...p,
      quizAttempts: [...p.quizAttempts, attempt],
    }));
    this.save();
  }

  markScenarioCompleted(scenarioId: string): void {
    this._progress.update((p) => {
      if (p.completedScenarioIds.includes(scenarioId)) return p;
      return { ...p, completedScenarioIds: [...p.completedScenarioIds, scenarioId] };
    });
    this.save();
  }

  setLastVisited(path: string): void {
    this._progress.update((p) => ({ ...p, lastVisited: path }));
    this.save();
  }

  resetProgress(): void {
    this._progress.set({ ...DEFAULT_PROGRESS });
    this.save();
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._progress()));
  }

  private loadProgress(): UserProgress {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...DEFAULT_PROGRESS };
      const parsed = JSON.parse(stored) as UserProgress;
      if (parsed.version !== CURRENT_VERSION) return { ...DEFAULT_PROGRESS };
      return parsed;
    } catch {
      return { ...DEFAULT_PROGRESS };
    }
  }
}
