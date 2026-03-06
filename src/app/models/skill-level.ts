export type SkillLevel = 'L1' | 'L2' | 'L3';

export interface SkillLevelInfo {
  level: SkillLevel;
  label: string;
  description: string;
  color: string;
}
