import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { MergedRuleset, RulesetManifest, RulesetRegistryEntry } from '../models/ruleset';
import { RulesetLoaderService } from './ruleset-loader.service';
import { RulesetService } from './ruleset.service';

export type ContentLoadState = 'idle' | 'loading' | 'ready' | 'error';

/**
 * The app-level content gate. Loads and merges the active ruleset whenever the
 * selection changes; the shell waits for `state() === 'ready'` before rendering
 * so the four data services can expose content synchronously.
 */
@Injectable({ providedIn: 'root' })
export class ContentLoaderService {
  private readonly loader = inject(RulesetLoaderService);
  private readonly ruleset = inject(RulesetService);

  private readonly _state = signal<ContentLoadState>('idle');
  private readonly _merged = signal<MergedRuleset | null>(null);
  private readonly _available = signal<RulesetRegistryEntry[]>([]);

  /** App-level gate state — the shell waits for 'ready'. */
  readonly state = this._state.asReadonly();
  /** Merged content for the active ruleset; null until the first load completes. */
  readonly merged = this._merged.asReadonly();
  /** Registry entries the user may choose between. */
  readonly availableRulesets = computed(() => this._available().filter((r) => r.selectable));
  /** Manifest of the active ruleset. */
  readonly activeManifest = computed<RulesetManifest | undefined>(
    () => this._merged()?.manifest,
  );

  constructor() {
    // Reload whenever the effective ruleset changes — including the first run.
    effect(() => {
      const id = this.ruleset.rulesetId();
      void this.load(id);
    });
  }

  private async load(id: string): Promise<void> {
    this._state.set('loading');
    try {
      const [merged, index] = await Promise.all([
        this.loader.loadRulesetContent(id),
        this.loader.loadIndex(),
      ]);
      this._merged.set(merged);
      this._available.set(index);
      this._state.set('ready');
    } catch {
      this._state.set('error');
    }
  }
}
