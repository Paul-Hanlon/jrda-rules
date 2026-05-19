---
title: Derby Rules Migration Plan
sidebar_label: Derby Rules migration
sidebar_position: 1
---

# Plan: jrda-rules → derby-rules, multi-ruleset support

## Context

The app teaches Roller Derby rules but is hardcoded to JRDA throughout — branding,
strings, project name, and (critically) the data model: every rule is "WFTDA base
content + an optional `jrdaAddendum` string", a shape that only ever expresses two
governing bodies. The app has outgrown that scope and should support open-ended
rulesets (WFTDA, JRDA, MRDA, banked-track, etc.).

Outcome: a generic ruleset architecture where content is bundled JSON, rulesets relate
by optional inheritance, and the active ruleset is a user preference — plus a full
rename to `derby-rules`. Three legacy names all converge on `derby-rules`: the
npm/Angular project name `jrda-rules`, the GitHub repo `tbg-development/jrd-rules`
(recently moved from `Paul-Hanlon/jrda-rules`), and the docs folder `jrda-rules-docs`.
The whole change is gated so that, with the new
`multiRuleset` flag off and JRDA as the only selectable ruleset, **the app behaves
exactly as it does today**.

## Decisions driving this plan

1. Bundled JSON rulesets only (loaded via HttpClient from `src/assets`); schema is
   Firestore-ready but no community-authoring backend/UI is built now.
2. Rulesets relate via optional `extends: <parentId>` inheritance.
3. Override vocabulary keyed by parent item id: `addendum` (rules only — generalises
   `jrdaAddendum`), `replace`, `add`, `remove`.
4. Inheritance applies to all four collections: rules, glossary, quizzes, casebook —
   one uniform merge engine.
5. Reading ages are per-ruleset (`manifest.readingAges`); reading-age UI conditional.
6. Skill levels defined inline in the manifest (`skillLevels[]`, empty = none);
   skill-level UI conditional.
7. `extends` merge happens at runtime in a loader service; merged output retains
   per-item provenance so the badge UI keeps working.
8. Active ruleset is a stored profile preference (not a route segment). New
   `RulesetService` signal; `rulesetId` added to `UserProfile` and `JuniorProfile`.
9. localStorage keys renamed `jrda-*` → `derby-rules-*` with a one-time copy migration
   in each service's `load()`.
10. Onboarding gains a ruleset-picker step (skater + per-junior) and a Profile control,
    all gated behind a new `multiRuleset` Remote Config flag (default off).
11. Splitting current data yields a WFTDA ruleset as JRDA's parent. WFTDA is a
    structural parent only (`selectable: false`); the base need not be perfectly
    purified of JRDA-isms. Default/only selectable ruleset = JRDA.
12. The GitHub repo — currently `tbg-development/jrd-rules`, moved from
    `Paul-Hanlon/jrda-rules` — is renamed to `derby-rules` (user does the GitHub-side
    rename).
13. Async content uses an app-level gate: load+merge the active ruleset once with a
    loading state, then the four data services expose data via signals synchronously.

## New schema — `src/app/models/ruleset.ts` (new)

```ts
export interface ReadingAgeDef { id: string; label: string; }
export interface SkillLevelDef { id: string; name: string; description: string; color?: string; }

export interface RulesetManifest {
  id: string;                 // 'jrda', 'wftda'
  name: string;               // 'JRDA' — display/branding
  fullName: string;           // 'Junior Roller Derby Association'
  description: string;
  selectable: boolean;        // false => structural parent only (WFTDA)
  extends?: string;           // parent ruleset id
  readingAges: ReadingAgeDef[];   // [] => no reading-age picker
  skillLevels: SkillLevelDef[];   // [] => no skill-level UI
  badge?: { label: string; colorVar?: string };
  content: {
    rules: string; casebook: string;
    glossary: Record<string, string>;   // readingAgeId -> file
    quizzes: Record<string, string>;    // readingAgeId -> file
  };
}

export type Provenance = 'inherited' | 'added' | 'replaced';
export interface AddendumOp     { op: 'addendum'; id: string; text: string; }
export interface ReplaceOp<T>   { op: 'replace'; id: string; value: T; }
export interface AddOp<T>       { op: 'add'; value: T; after?: string; }
export interface RemoveOp       { op: 'remove'; id: string; }
export type OverrideOp<T> = AddendumOp | ReplaceOp<T> | AddOp<T> | RemoveOp;

export interface CollectionOverride<T> { base?: T[]; ops?: OverrideOp<T>[]; }

export interface ProvenanceMeta {
  provenance: Provenance; hasAddendum?: boolean; addendumText?: string; rulesetId: string;
}
export type Merged<T> = T & { _meta: ProvenanceMeta };
```

Model changes: widen `SkillLevel`/`ReadingAge` to `string`; add `rulesetId?` to
`UserProfile` + `JuniorProfile`; keep `Rule.jrdaAddendum?` deprecated (addendum now
flows via `_meta.addendumText`).

## Merge engine — `src/app/services/ruleset-merge.ts` (new)

Pure, generic, heavily unit-tested `mergeCollection<T extends {id:string}>(...)`:

1. If `override.base` present (standalone ruleset): tag every item recursively
   `{provenance:'inherited', rulesetId}` and return.
2. Else clone `parentItems`, tag each `'inherited'`.
3. Apply ops in order: `remove` drops by id; `replace` swaps value, tags `'replaced'`,
   keeps position/children; `add` inserts (`after` = sibling id, else append), tags
   `'added'`; `addendum` sets `_meta.hasAddendum`/`addendumText`.
4. Recurse into a `childrenKey` (`rules` for sections, `subrules` for rules).
5. Multi-level `extends` chains resolve bottom-up, one level per merge call.

## Phases

Strict order 0→1→2→3→4, then 5/6/7 (independent of each other).

### Phase 0 — Project & repo rename (no behaviour change)

- `package.json` name → `derby-rules`.
- `angular.json` project key + `buildTarget` strings → `derby-rules`.
- `firebase.json` public → `dist/derby-rules/browser`.
- `environment.ts`/`environment.prod.ts` — **keep Firebase `projectId` as `jrda-rules`**
  (live project unchanged); nothing to edit.
- `index.html` title/meta → generic "Roller Derby rules".
- Rename folder `jrda-rules-docs/` → `derby-rules-docs/`; update
  `docusaurus.config.ts` — currently stale at `Paul-Hanlon`/`jrda-rules`, set
  `url: 'https://tbg-development.github.io'`, `baseUrl: '/derby-rules/'`,
  `organizationName: 'tbg-development'`, `projectName: 'derby-rules'`, plus `title`
  and navbar/footer — and `.github/workflows/deploy-docs.yml` (`cache-dependency-path`,
  both `working-directory`, artifact path).
- `git remote set-url origin https://github.com/tbg-development/derby-rules.git`
  (after user renames the repo on GitHub; the remote was already moved off
  `Paul-Hanlon/jrda-rules` to `tbg-development/jrd-rules`).
- Verify: `npm run build` outputs `dist/derby-rules/browser`; `npm test` green.

### Phase 1 — Schema, models, branding (no behaviour change)

- Create `src/app/models/ruleset.ts` (schema above).
- Create `src/app/config/branding.ts` — central app name/tagline + `defaultRulesetId`.
- Widen `models/skill-level.ts` + `models/reading-age.ts` to `string`; add `rulesetId?`
  to `models/user-profile.ts`.
- `app.config.ts`: add `provideHttpClient(withFetch())` (no HttpClient today).
- Verify: build + `npm test` green (additive). Risk: grep `case 'L1'`/`case '13+'`
  for exhaustive switches before widening unions.

### Phase 2 — Bundled JSON rulesets + content extraction

- Add `src/assets` to `angular.json` `assets`.
- Create `src/assets/rulesets/`: `index.json` registry; `wftda/` (base content from
  `rules.data.ts` minus addenda, plus casebook/glossary/quizzes); `jrda/`
  (`manifest.json` with `extends:'wftda'`, L1/L2/L3 `skillLevels`, four `readingAges`,
  `badge:{label:'JRDA'}`; `rules.json` = one `AddendumOp` per current `jrdaAddendum`).
- `wftda` manifest `selectable:false`; `jrda` `selectable:true`.
- Old `*.data.ts` files stay until Phase 4 — app still builds.
- Verify: Vitest data-integrity spec comparing JSON ids/counts against the TS constants.

### Phase 3 — Loader + RulesetService

- `src/app/services/ruleset-merge.ts` — the merge engine.
- `src/app/services/ruleset.service.ts` — signal service (pattern of
  `SkillLevelService`): active `rulesetId` signal, `load()` with `jrda-ruleset` →
  `derby-rules-ruleset` migration, `availableRulesets` (filtered `selectable`),
  `activeManifest`, default `'jrda'`; reads per-junior `rulesetId` when an active
  junior exists.
- `src/app/services/ruleset-loader.service.ts` — HttpClient: `loadIndex()`,
  `loadManifest()`, `loadRulesetContent()` walks the `extends` chain, fetches base +
  override files, runs `mergeCollection` for all four collections, returns
  `MergedRuleset`; in-memory cache.
- `src/app/services/content-loader.service.ts` — app-level gate: `state` signal
  (`idle|loading|ready|error`), `merged` signal, `loadActive()`, an `effect` re-loads
  on `rulesetId` change.
- Verify: Vitest specs for merge engine (every op, nesting, chain, provenance) and
  loader (`HttpTestingController`) — JRDA-merged output equals old TS data.

### Phase 4 — Refactor data services + wire the gate

- `RulesService`, `QuizService`, `GlossaryService`, `CasebookService`: drop
  `*.data.ts` imports, inject `ContentLoaderService`, make collections `computed()`
  over `merged()`. Skill-level filter no-ops when `activeManifest().skillLevels` empty.
  Methods called during loading must tolerate `merged()===null` (return `[]`).
- `app.ts` gate: add a loading branch between landing and onboarding —
  `@else if (contentLoader.state() !== 'ready') { <app-content-loading /> }`.
  Kick off `loadActive()` in `provideAppInitializer` or an `App` effect.
- Delete `rules.data.ts`, `casebook.data.ts`, `quiz.data.*`, `glossary.data.*`,
  `quiz-data-by-age.ts`, `glossary-data-by-age.ts`, `skill-levels.data.ts`.
- Verify: with flag off + `rulesetId='jrda'`, every page renders identical content;
  `npm test` + `e2e/onboarding.spec.ts` green.

### Phase 5 — Badge generalisation + branding strings

- Create `src/app/shared/components/ruleset-badge/ruleset-badge.component.ts`
  (`app-ruleset-badge`), data-driven from `activeManifest().badge`; delete
  `jrda-badge/`. Add `--color-ruleset-badge` CSS var.
- `rule-section.component.ts`: badge + callout driven by `rule._meta.hasAddendum` /
  `addendumText`.
- `rules-browser.component.ts`: `hasAnyJrda()` → `hasAnyAddendum()`; header/chip from
  manifest `name`.
- Replace literal "JRDA"/"WFTDA" in `header.component.ts:39`,
  `casebook-list.component.ts:25`, `support.component.ts:466`,
  `onboarding.component.ts:282` with manifest/branding values.
- Verify: JRDA active → badge reads "JRDA", addendum callouts on the same rules.

### Phase 6 — Onboarding + Profile ruleset picker (gated)

- `remote-config.service.ts` `DEFAULTS`: add `multiRuleset: false`.
- `onboarding.component.ts`: add a `'ruleset'` step (skater) + per-junior ruleset
  field, shown only when `multiRuleset` flag on **and** `availableRulesets().length>1`;
  update step-count maps; write `rulesetId` (default `'jrda'`). Make existing
  skill-level/reading-age steps conditional on manifest list lengths.
- `profile.component.ts`: ruleset selector (and per-junior in custodian view) gated on
  the flag; on change call `RulesetService.setRuleset()`.
- Verify: flag off ⇒ onboarding/profile identical to today.

### Phase 7 — localStorage key migration audit

- Add a `migrate(oldKey,newKey)` helper to each signal service's `load()`: if new key
  absent, copy old → new, delete old.
- Grep all services for `jrda-` literals: `jrda-user-profile`, `jrda-skill-level`,
  `jrda-reading-age`, plus `progress`/`badges`/`daily-jam` services.
- Verify: Vitest spec per service — seed old key, construct, assert new key populated,
  old removed, value preserved.

## Critical files

- `src/app/models/ruleset.ts` (new) — schema
- `src/app/services/ruleset-merge.ts` (new) — merge engine
- `src/app/services/ruleset-loader.service.ts` (new) — HttpClient loader, `extends` chain
- `src/app/services/content-loader.service.ts` (new) — app-level gate
- `src/app/services/ruleset.service.ts` (new) — active-ruleset signal
- `src/app/services/rules.service.ts` — representative of all four data-service refactors
- `src/app/app.ts` / `src/app/app.config.ts` — gate wiring, `provideHttpClient`
- `src/assets/rulesets/**` (new) — bundled JSON content

## Reused patterns

- Signal service with `load()`/`save()` + migration: `user-profile.service.ts:151-171`,
  `skill-level.service.ts`, `reading-age.service.ts`.
- Remote Config flag: `remote-config.service.ts` `DEFAULTS` map + `flag(key)`.
- App gating chain: `app.ts:12-22`.

## Verification — "identical to today with the flag off"

1. `multiRuleset` default `false`; `RulesetService` default `'jrda'`; only JRDA selectable.
2. Loader merges WFTDA(base) ⊕ JRDA(ops) = pre-refactor TS data: same 7 sections,
   140+ rules, addendums on the exact rule ids, identical casebook/quiz/glossary counts.
3. UI strings render "JRDA" exactly where they did.
4. Onboarding flow unchanged — `e2e/onboarding.spec.ts` passes unmodified.
5. Existing localStorage profiles migrate transparently.

Run: `npm test` (Vitest — incl. new `ruleset-merge.spec.ts`,
`ruleset-loader.service.spec.ts`, `ruleset.service.spec.ts`, per-service migration
specs, data-integrity spec); `npx playwright test`; `npm run build`; docs build.

## Risks & ordering

- Strict order 0→1→2→3→4; 5/6/7 independent. Phase 4 (sync→async gate) is highest risk
  — audit every service method for `merged()===null`.
- Union widening (Phase 1) may break exhaustive `switch`es — grep first.
- Forgetting `src/assets` in `angular.json` ⇒ runtime 404s, not a build error.
- Firebase `projectId` must stay `jrda-rules` — only `dist/` output dir renames.
- User renames the GitHub repo (`tbg-development/jrd-rules` → `derby-rules`) before
  Phase 0's `git remote set-url`; the Docusaurus `url`/`baseUrl`/`organizationName`
  changes must land in the same push as the workflow change. The config is currently
  stale (still `Paul-Hanlon/jrda-rules`), so the docs deploy may already be misrouted.
- Old `.data.ts` deletion (end of Phase 4) is irreversible in-branch — keep until the
  data-integrity spec passes.
