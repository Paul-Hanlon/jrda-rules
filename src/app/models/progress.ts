export interface QuizAttempt {
  topicId: string;
  score: number;
  total: number;
  timestamp: number;
}

export interface UserProgress {
  version: number;
  readRuleIds: string[];
  viewedTermIds: string[];
  masteredTermIds: string[];
  quizAttempts: QuizAttempt[];
  completedScenarioIds: string[];
  lastVisited: string;
}

export const DEFAULT_PROGRESS: UserProgress = {
  version: 1,
  readRuleIds: [],
  viewedTermIds: [],
  masteredTermIds: [],
  quizAttempts: [],
  completedScenarioIds: [],
  lastVisited: '/',
};
