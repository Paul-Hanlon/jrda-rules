import { SkillLevel } from './skill-level';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ruleReference: string;
  skillLevels: SkillLevel[];
}

export interface QuizTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  sectionId: string;
  questions: QuizQuestion[];
}
