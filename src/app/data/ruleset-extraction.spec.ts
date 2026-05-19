/**
 * Data-integrity guarantee for the bundled ruleset JSON (Phase 2).
 *
 * Phase 2 extracted the static TS content into src/assets/rulesets/. This spec
 * proves the generated JSON still reproduces the TS source exactly: the WFTDA
 * base == the TS data with jrdaAddendum stripped, and JRDA's addendum ops ==
 * every rule that carried a jrdaAddendum.
 *
 * When the TS data is removed in Phase 4, repoint these comparisons at the
 * golden-master baseline (content-baseline.spec.ts) instead.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RULE_SECTIONS } from './rules.data';
import { CASEBOOK_SCENARIOS } from './casebook.data';
import { QUIZ_DATA_BY_AGE } from './quiz-data-by-age';
import { GLOSSARY_DATA_BY_AGE } from './glossary-data-by-age';
import { Rule } from '../models/rule';
import { AddendumOp, RulesetManifest } from '../models/ruleset';

const ROOT = join(process.cwd(), 'src/assets/rulesets');
const AGES = ['7-8', '9-10', '11-12', '13+'] as const;

function load(rel: string): unknown {
  return JSON.parse(readFileSync(join(ROOT, rel), 'utf-8'));
}

/** WFTDA base: drop jrdaAddendum at every depth, keep every other field. */
function stripRule(rule: Rule): Rule {
  const out = { ...rule };
  delete out.jrdaAddendum;
  if (out.subrules) out.subrules = out.subrules.map(stripRule);
  return out;
}

function collectAddenda(rules: Rule[], acc: AddendumOp[]): void {
  for (const rule of rules) {
    if (rule.jrdaAddendum != null) {
      acc.push({ op: 'addendum', id: rule.id, text: rule.jrdaAddendum });
    }
    if (rule.subrules) collectAddenda(rule.subrules, acc);
  }
}

describe('bundled ruleset data integrity', () => {
  it('registry lists wftda (non-selectable) and jrda (selectable)', () => {
    expect(load('index.json')).toEqual([
      { id: 'wftda', name: 'WFTDA', selectable: false },
      { id: 'jrda', name: 'JRDA', selectable: true },
    ]);
  });

  it('manifests reference content files that exist and parse', () => {
    for (const id of ['wftda', 'jrda'] as const) {
      const m = load(`${id}/manifest.json`) as RulesetManifest;
      expect(m.id).toBe(id);
      expect(() => load(`${id}/${m.content.rules}`)).not.toThrow();
      expect(() => load(`${id}/${m.content.casebook}`)).not.toThrow();
      for (const age of AGES) {
        expect(() => load(`${id}/${m.content.glossary[age]}`)).not.toThrow();
        expect(() => load(`${id}/${m.content.quizzes[age]}`)).not.toThrow();
      }
    }
    const jrda = load('jrda/manifest.json') as RulesetManifest;
    expect(jrda.extends).toBe('wftda');
    expect(jrda.selectable).toBe(true);
    expect(jrda.skillLevels.map((l) => l.id)).toEqual(['L1', 'L2', 'L3']);
    expect((load('wftda/manifest.json') as RulesetManifest).selectable).toBe(false);
  });

  it('wftda rules base == RULE_SECTIONS with jrdaAddendum stripped', () => {
    const expected = RULE_SECTIONS.map((s) => ({ ...s, rules: s.rules.map(stripRule) }));
    expect(load('wftda/rules.json')).toEqual({ base: expected });
  });

  it('jrda rules ops == one addendum op per rule carrying a jrdaAddendum', () => {
    const expected: AddendumOp[] = [];
    for (const section of RULE_SECTIONS) collectAddenda(section.rules, expected);
    expect(expected.length).toBeGreaterThan(0);
    expect(load('jrda/rules.json')).toEqual({ ops: expected });
  });

  it('wftda casebook base == CASEBOOK_SCENARIOS; jrda casebook has no ops', () => {
    expect(load('wftda/casebook.json')).toEqual({ base: CASEBOOK_SCENARIOS });
    expect(load('jrda/casebook.json')).toEqual({ ops: [] });
  });

  it('wftda glossary/quizzes base == TS data per reading age; jrda has no ops', () => {
    for (const age of AGES) {
      expect(load(`wftda/glossary.${age}.json`)).toEqual({ base: GLOSSARY_DATA_BY_AGE[age] });
      expect(load(`wftda/quizzes.${age}.json`)).toEqual({ base: QUIZ_DATA_BY_AGE[age] });
      expect(load(`jrda/glossary.${age}.json`)).toEqual({ ops: [] });
      expect(load(`jrda/quizzes.${age}.json`)).toEqual({ ops: [] });
    }
  });
});
