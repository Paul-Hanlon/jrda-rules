import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CasebookScenario } from '../models/casebook';
import { GlossaryTerm } from '../models/glossary';
import { QuizTopic } from '../models/quiz';
import { Rule, RuleSection } from '../models/rule';
import {
  CollectionOverride,
  Merged,
  MergedRuleset,
  RulesetManifest,
  RulesetRegistryEntry,
} from '../models/ruleset';
import { mergeCollection, TreeShape } from './ruleset-merge';

/** Rules nest RuleSection -> Rule -> Rule; the engine only needs id + children. */
type RuleNode = RuleSection | Rule;

export const RULES_TREE: TreeShape<RuleNode> = {
  childrenOf: (n) => ('rules' in n ? n.rules : n.subrules),
  withChildren: (n, c) =>
    'rules' in n ? { ...n, rules: c as Rule[] } : { ...n, subrules: c as Rule[] },
};

/**
 * Fetches bundled ruleset JSON and resolves the `extends` chain into a single
 * merged ruleset. Results are cached in memory, so re-selecting a ruleset is
 * instant. A future Firestore source would slot in behind the same API.
 */
@Injectable({ providedIn: 'root' })
export class RulesetLoaderService {
  private readonly http = inject(HttpClient);
  private readonly base = 'assets/rulesets';

  private indexCache?: Promise<RulesetRegistryEntry[]>;
  private readonly manifestCache = new Map<string, Promise<RulesetManifest>>();
  private readonly contentCache = new Map<string, Promise<MergedRuleset>>();

  /** The ruleset registry. */
  loadIndex(): Promise<RulesetRegistryEntry[]> {
    return (this.indexCache ??= this.getJson<RulesetRegistryEntry[]>('index.json'));
  }

  loadManifest(id: string): Promise<RulesetManifest> {
    let cached = this.manifestCache.get(id);
    if (!cached) {
      cached = this.getJson<RulesetManifest>(`${id}/manifest.json`);
      this.manifestCache.set(id, cached);
    }
    return cached;
  }

  /** Resolve a ruleset (and its `extends` ancestors) into one merged ruleset. */
  loadRulesetContent(id: string): Promise<MergedRuleset> {
    let cached = this.contentCache.get(id);
    if (!cached) {
      cached = this.resolve(id);
      this.contentCache.set(id, cached);
    }
    return cached;
  }

  private async resolve(id: string): Promise<MergedRuleset> {
    const chain = await this.resolveChain(id); // root -> ... -> id
    const leaf = chain[chain.length - 1];
    const ages = leaf.readingAges.map((a) => a.id);

    let rules: Merged<RuleNode>[] = [];
    let casebook: Merged<CasebookScenario>[] = [];
    const glossary: Record<string, Merged<GlossaryTerm>[]> = {};
    const quizzes: Record<string, Merged<QuizTopic>[]> = {};
    for (const age of ages) {
      glossary[age] = [];
      quizzes[age] = [];
    }

    for (const manifest of chain) {
      const files = manifest.content;
      rules = mergeCollection(
        rules,
        await this.getJson<CollectionOverride<RuleNode>>(`${manifest.id}/${files.rules}`),
        manifest.id,
        RULES_TREE,
      );
      casebook = mergeCollection(
        casebook,
        await this.getJson<CollectionOverride<CasebookScenario>>(
          `${manifest.id}/${files.casebook}`,
        ),
        manifest.id,
      );
      for (const age of ages) {
        glossary[age] = mergeCollection(
          glossary[age],
          await this.getJson<CollectionOverride<GlossaryTerm>>(
            `${manifest.id}/${files.glossary[age]}`,
          ),
          manifest.id,
        );
        quizzes[age] = mergeCollection(
          quizzes[age],
          await this.getJson<CollectionOverride<QuizTopic>>(
            `${manifest.id}/${files.quizzes[age]}`,
          ),
          manifest.id,
        );
      }
    }

    return { manifest: leaf, rules: rules as Merged<RuleSection>[], casebook, glossary, quizzes };
  }

  /** Walk the `extends` chain — returns ancestors first, the requested id last. */
  private async resolveChain(id: string): Promise<RulesetManifest[]> {
    const chain: RulesetManifest[] = [];
    const seen = new Set<string>();
    let current: string | undefined = id;
    while (current) {
      if (seen.has(current)) throw new Error(`Ruleset 'extends' cycle at '${current}'`);
      seen.add(current);
      const manifest = await this.loadManifest(current);
      chain.unshift(manifest);
      current = manifest.extends;
    }
    return chain;
  }

  private getJson<T>(rel: string): Promise<T> {
    return firstValueFrom(this.http.get<T>(`${this.base}/${rel}`));
  }
}
