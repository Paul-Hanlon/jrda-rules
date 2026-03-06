import { computed, inject, Injectable } from '@angular/core';
import { CASEBOOK_SCENARIOS } from '../data/casebook.data';
import { CasebookScenario } from '../models/casebook';
import { SkillLevelService } from './skill-level.service';

@Injectable({ providedIn: 'root' })
export class CasebookService {
  private readonly skillLevel = inject(SkillLevelService);

  readonly scenarios = computed<CasebookScenario[]>(() => {
    const level = this.skillLevel.level();
    return CASEBOOK_SCENARIOS.filter((s) => s.skillLevels.includes(level));
  });

  readonly scenariosBySection = computed(() => {
    const scenarios = this.scenarios();
    const grouped = new Map<string, CasebookScenario[]>();
    for (const scenario of scenarios) {
      const existing = grouped.get(scenario.sectionId) ?? [];
      existing.push(scenario);
      grouped.set(scenario.sectionId, existing);
    }
    return grouped;
  });

  getScenario(scenarioId: string) {
    return computed(() => this.scenarios().find((s) => s.id === scenarioId));
  }
}
