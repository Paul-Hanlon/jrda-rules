import { computed, inject, Injectable } from '@angular/core';
import { CasebookScenario } from '../models/casebook';
import { SkillLevelService } from './skill-level.service';
import { ContentLoaderService } from './content-loader.service';

@Injectable({ providedIn: 'root' })
export class CasebookService {
  private readonly skillLevel = inject(SkillLevelService);
  private readonly content = inject(ContentLoaderService);

  readonly scenarios = computed<CasebookScenario[]>(() => {
    const merged = this.content.merged();
    if (!merged) return [];
    const level = this.skillLevel.level();
    const filterByLevel = (this.content.activeManifest()?.skillLevels.length ?? 0) > 0;
    return merged.casebook.filter((s) => !filterByLevel || s.skillLevels.includes(level));
  });

  readonly scenariosBySection = computed(() => {
    const grouped = new Map<string, CasebookScenario[]>();
    for (const scenario of this.scenarios()) {
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
