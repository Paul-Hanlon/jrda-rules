/**
 * Schema for the multi-ruleset content model.
 *
 * A ruleset is a self-contained body of Roller Derby rules (WFTDA, JRDA, …).
 * Rulesets may inherit from a parent via `extends` and supply override files;
 * the runtime merge engine (Phase 3) resolves a flat tree with per-item
 * provenance. Nothing consumes these types yet — they are the contract the
 * loader, merge engine, and ruleset-aware UI are built against.
 */
import { ReadingAge } from './reading-age';
import { RuleSection } from './rule';
import { CasebookScenario } from './casebook';
import { QuizTopic } from './quiz';
import { GlossaryTerm } from './glossary';

/** A reading-age cohort a ruleset ships content for. */
export interface ReadingAgeDef {
  id: ReadingAge;
  label: string;
}

/** A skill level defined by a ruleset (e.g. JRDA L1/L2/L3). */
export interface SkillLevelDef {
  id: string;
  name: string;
  description: string;
  color?: string;
}

/** Marker shown on rules that are specific to / modified by a ruleset. */
export interface RulesetBadge {
  label: string;
  colorVar?: string;
}

/** Paths to a ruleset's content files, relative to the ruleset folder. */
export interface RulesetContentFiles {
  rules: string;
  casebook: string;
  /** reading-age id -> file */
  glossary: Record<string, string>;
  /** reading-age id -> file */
  quizzes: Record<string, string>;
}

/** Top-level description of a ruleset. */
export interface RulesetManifest {
  id: string;
  /** Short display name, e.g. 'JRDA'. */
  name: string;
  /** Full governing-body name, e.g. 'Junior Roller Derby Association'. */
  fullName: string;
  description: string;
  /** false => a structural parent only, never offered to users. */
  selectable: boolean;
  /** Parent ruleset id; when set, this ruleset supplies overrides. */
  extends?: string;
  /** Reading-age cohorts this ruleset ships content for; [] => no picker. */
  readingAges: ReadingAgeDef[];
  /** Skill levels this ruleset defines; [] => no skill-level UI. */
  skillLevels: SkillLevelDef[];
  badge?: RulesetBadge;
  content: RulesetContentFiles;
}

/* ---- Override operations (keyed by parent item id) ---- */

/** Attach a ruleset-specific note to an inherited rule. */
export interface AddendumOp {
  op: 'addendum';
  id: string;
  text: string;
}

/** Replace an inherited item's value, keeping its position. */
export interface ReplaceOp<T> {
  op: 'replace';
  id: string;
  value: T;
}

/** Add an item absent from the parent; `after` places it past a sibling id. */
export interface AddOp<T> {
  op: 'add';
  value: T;
  after?: string;
}

/** Drop an inherited item. */
export interface RemoveOp {
  op: 'remove';
  id: string;
}

export type OverrideOp<T> = AddendumOp | ReplaceOp<T> | AddOp<T> | RemoveOp;

/**
 * One content collection of a ruleset: either a standalone `base` list (no
 * parent) or an `ops` list applied to the parent's merged collection.
 */
export interface CollectionOverride<T> {
  base?: T[];
  ops?: OverrideOp<T>[];
}

/* ---- Merged output ---- */

export type Provenance = 'inherited' | 'added' | 'replaced';

/** Provenance attached to every item after merging. */
export interface ProvenanceMeta {
  provenance: Provenance;
  /** Ruleset that contributed this item. */
  rulesetId: string;
  hasAddendum?: boolean;
  addendumText?: string;
}

/** An item of type T carrying merge provenance. */
export type Merged<T> = T & { _meta: ProvenanceMeta };

/* ---- Loaded ruleset ---- */

/** An entry in the ruleset registry (index.json). */
export interface RulesetRegistryEntry {
  id: string;
  name: string;
  selectable: boolean;
}

/** A fully-loaded, merged ruleset — the loader's output. */
export interface MergedRuleset {
  manifest: RulesetManifest;
  rules: Merged<RuleSection>[];
  casebook: Merged<CasebookScenario>[];
  glossary: Record<string, Merged<GlossaryTerm>[]>;
  quizzes: Record<string, Merged<QuizTopic>[]>;
}
