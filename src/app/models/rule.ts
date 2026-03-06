import { SkillLevel } from './skill-level';

export interface Rule {
  id: string;
  number: string;
  title: string;
  content: string;
  skillLevels: SkillLevel[];
  jrdaAddendum?: string;
  subrules?: Rule[];
}

export interface RuleSection {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  rules: Rule[];
}
