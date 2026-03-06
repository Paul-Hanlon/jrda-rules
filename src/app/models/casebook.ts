import { SkillLevel } from './skill-level';

export interface CasebookScenario {
  id: string;
  sectionId: string;
  ruleReference: string;
  situation: string;
  choices: string[];
  correctIndex: number;
  outcome: string;
  rationale: string;
  keepInMind?: string;
  skillLevels: SkillLevel[];
}
