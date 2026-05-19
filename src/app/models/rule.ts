import { SkillLevel } from './skill-level';
import type { ProvenanceMeta } from './ruleset';

export interface Rule {
  id: string;
  number: string;
  title: string;
  content: string;
  skillLevels: SkillLevel[];
  /** @deprecated superseded by `_meta.addendumText`. */
  jrdaAddendum?: string;
  subrules?: Rule[];
  /** Merge provenance — present on rules served by the loader. */
  _meta?: ProvenanceMeta;
}

export interface RuleSection {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  rules: Rule[];
}
