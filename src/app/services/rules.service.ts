import { computed, inject, Injectable } from '@angular/core';
import { Rule, RuleSection } from '../models/rule';
import { SkillLevelService } from './skill-level.service';
import { ContentLoaderService } from './content-loader.service';

@Injectable({ providedIn: 'root' })
export class RulesService {
  private readonly skillLevel = inject(SkillLevelService);
  private readonly content = inject(ContentLoaderService);

  readonly sections = computed<RuleSection[]>(() => {
    const merged = this.content.merged();
    if (!merged) return [];
    const level = this.skillLevel.level();
    const filterByLevel = (this.content.activeManifest()?.skillLevels.length ?? 0) > 0;
    return merged.rules.map((section) => ({
      ...section,
      rules: this.filterRules(section.rules, level, filterByLevel),
    }));
  });

  getSection(sectionId: string) {
    return computed(() => this.sections().find((s) => s.id === sectionId));
  }

  /** Filter rules and subrules by skill level — a no-op for level-less rulesets. */
  private filterRules(rules: Rule[], level: string, filterByLevel: boolean): Rule[] {
    return rules
      .filter((rule) => !filterByLevel || rule.skillLevels.includes(level))
      .map((rule) => ({
        ...rule,
        subrules: rule.subrules
          ? this.filterRules(rule.subrules, level, filterByLevel)
          : rule.subrules,
      }));
  }
}
