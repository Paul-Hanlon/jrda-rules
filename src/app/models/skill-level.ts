// Ruleset-defined; historically the JRDA values 'L1' | 'L2' | 'L3'.
export type SkillLevel = string;

export interface SkillLevelInfo {
  level: SkillLevel;
  label: string;
  description: string;
  color: string;
}
