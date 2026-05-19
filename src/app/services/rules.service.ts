import { computed, inject, Injectable } from '@angular/core';
import { Rule, RuleSection } from '../models/rule';
import { Merged } from '../models/ruleset';
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
      rules: this.prepare(section.rules as Merged<Rule>[], level, filterByLevel),
    }));
  });

  getSection(sectionId: string) {
    return computed(() => this.sections().find((s) => s.id === sectionId));
  }

  /**
   * Filter by skill level (a no-op for rulesets with no levels) and surface
   * ruleset addenda on the legacy `jrdaAddendum` field — Phase 5 moves the
   * UI onto `_meta` directly and drops this shim.
   */
  private prepare(rules: Merged<Rule>[], level: string, filterByLevel: boolean): Rule[] {
    return rules
      .filter((rule) => !filterByLevel || rule.skillLevels.includes(level))
      .map((rule) => ({
        ...rule,
        jrdaAddendum: rule._meta.addendumText ?? rule.jrdaAddendum,
        subrules: rule.subrules
          ? this.prepare(rule.subrules as Merged<Rule>[], level, filterByLevel)
          : rule.subrules,
      }));
  }
}
