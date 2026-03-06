import { computed, inject, Injectable } from '@angular/core';
import { RULE_SECTIONS } from '../data/rules.data';
import { RuleSection } from '../models/rule';
import { SkillLevelService } from './skill-level.service';

@Injectable({ providedIn: 'root' })
export class RulesService {
  private readonly skillLevel = inject(SkillLevelService);

  readonly sections = computed<RuleSection[]>(() => {
    const level = this.skillLevel.level();
    return RULE_SECTIONS.map((section) => ({
      ...section,
      rules: section.rules
        .filter((rule) => rule.skillLevels.includes(level))
        .map((rule) => ({
          ...rule,
          subrules: rule.subrules?.filter((sub) => sub.skillLevels.includes(level)),
        })),
    }));
  });

  getSection(sectionId: string) {
    return computed(() => this.sections().find((s) => s.id === sectionId));
  }
}
