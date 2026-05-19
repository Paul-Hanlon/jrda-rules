import { Injectable, computed, inject, signal } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { BRANDING } from '../config/branding';

const STORAGE_KEY = 'derby-rules-ruleset';

/**
 * Tracks which ruleset is active. Pure signal + localStorage service, in the
 * pattern of SkillLevelService — the registry and content come from the loader.
 *
 * The storage key is new in this migration, so there is no legacy `jrda-*` key
 * to migrate (unlike the keys handled in Phase 7).
 */
@Injectable({ providedIn: 'root' })
export class RulesetService {
  private readonly profile = inject(UserProfileService);
  private readonly _selected = signal<string>(this.load());

  /** Ruleset the user picked for their own account. */
  readonly selectedRulesetId = this._selected.asReadonly();

  /**
   * Effective ruleset. When a parent has stepped into a junior's view, that
   * junior's own ruleset wins; otherwise the account's selection applies.
   */
  readonly rulesetId = computed<string>(
    () => this.profile.activeJunior()?.rulesetId ?? this._selected(),
  );

  setRuleset(id: string): void {
    this._selected.set(id);
    localStorage.setItem(STORAGE_KEY, id);
  }

  private load(): string {
    return localStorage.getItem(STORAGE_KEY) ?? BRANDING.defaultRulesetId;
  }
}
