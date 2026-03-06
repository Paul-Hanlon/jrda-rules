import { SkillLevelInfo } from '../models/skill-level';

export const SKILL_LEVELS: SkillLevelInfo[] = [
  {
    level: 'L1',
    label: 'Level 1',
    description: 'New skaters learning the basics of roller derby',
    color: 'var(--color-level-1)',
  },
  {
    level: 'L2',
    label: 'Level 2',
    description: 'Intermediate skaters building on foundational skills',
    color: 'var(--color-level-2)',
  },
  {
    level: 'L3',
    label: 'Level 3',
    description: 'Advanced skaters playing full-contact roller derby',
    color: 'var(--color-level-3)',
  },
];
