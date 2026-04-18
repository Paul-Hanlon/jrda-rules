import { IconName } from '../shared/components/icon/icon.component';
import { QuizAttempt, UserProgress } from './progress';

export type BadgeTone = 'default' | 'primary' | 'ink';

export interface BadgeDef {
  id: string;
  label: string;
  icon: IconName;
  rotate: number;
  tone: BadgeTone;
  isEarned: (p: UserProgress) => boolean;
}

function computeMaxStreak(attempts: Pick<QuizAttempt, 'timestamp'>[]): number {
  if (!attempts.length) return 0;
  const days = new Set(
    attempts.map((a) => {
      const d = new Date(a.timestamp);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })
  );
  const sorted = [...days].sort();
  let max = 1;
  let cur = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diffDays = Math.round((+curr - +prev) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      cur++;
      max = Math.max(max, cur);
    } else {
      cur = 1;
    }
  }
  return max;
}

export const BADGES: BadgeDef[] = [
  {
    id: 'first-read',
    label: 'First read',
    icon: 'flag',
    rotate: -6,
    tone: 'default',
    isEarned: (p) => p.readRuleIds.length >= 1,
  },
  {
    id: 'streak-3',
    label: '3-day streak',
    icon: 'zap',
    rotate: 3,
    tone: 'primary',
    isEarned: (p) => computeMaxStreak(p.quizAttempts) >= 3,
  },
  {
    id: 'quiz-ace',
    label: 'Quiz ace',
    icon: 'star',
    rotate: -3,
    tone: 'ink',
    isEarned: (p) => p.quizAttempts.some((a) => a.score === a.total && a.total >= 3),
  },
  {
    id: 'pack-master',
    label: 'Pack master',
    icon: 'helmet',
    rotate: 4,
    tone: 'default',
    isEarned: (p) => p.masteredTermIds.length >= 10,
  },
];
