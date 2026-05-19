/**
 * Golden-master content baseline.
 *
 * The committed snapshot (`__snapshots__/content-baseline.spec.ts.snap`) was
 * generated from the pre-migration TS data. This spec now merges the bundled
 * ruleset JSON through the real merge engine and summarises the JRDA result —
 * it must still reproduce that snapshot exactly. A diff means the migrated
 * content path no longer matches the original content.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { CollectionOverride, Merged } from '../models/ruleset';
import { mergeCollection, TreeShape } from '../services/ruleset-merge';
import { RULES_TREE } from '../services/ruleset-loader.service';

const ASSETS = join(process.cwd(), 'src/assets/rulesets');
const READING_AGES = ['7-8', '9-10', '11-12', '13+'];

type Obj = Record<string, unknown>;

/** RULES_TREE is typed for the rule hierarchy; the merge engine only uses ids. */
const ID_TREE = RULES_TREE as unknown as TreeShape<{ id: string }>;

function load(rel: string): CollectionOverride<{ id: string }> {
  return JSON.parse(readFileSync(join(ASSETS, rel), 'utf-8')) as CollectionOverride<{ id: string }>;
}

/** Merge a WFTDA base file with the JRDA override file, as the loader would. */
function merge(file: string, tree?: TreeShape<{ id: string }>): Merged<{ id: string }>[] {
  const base = mergeCollection<{ id: string }>([], load(`wftda/${file}`), 'wftda', tree);
  return mergeCollection<{ id: string }>(base, load(`jrda/${file}`), 'jrda', tree);
}

const rules = merge('rules.json', ID_TREE) as unknown as Obj[];
const casebook = merge('casebook.json') as unknown as Obj[];
const glossaryByAge = Object.fromEntries(
  READING_AGES.map((age) => [age, merge(`glossary.${age}.json`) as unknown as Obj[]]),
);
const quizzesByAge = Object.fromEntries(
  READING_AGES.map((age) => [age, merge(`quizzes.${age}.json`) as unknown as Obj[]]),
);

function summariseRule(rule: Obj): unknown {
  const meta = rule['_meta'] as { hasAddendum?: boolean } | undefined;
  return {
    id: rule['id'],
    number: rule['number'],
    skillLevels: [...((rule['skillLevels'] as string[]) ?? [])].sort(),
    hasAddendum: meta?.hasAddendum === true,
    subrules: ((rule['subrules'] as Obj[]) ?? []).map(summariseRule),
  };
}

function countRules(list: Obj[]): { total: number; withAddendum: number } {
  let total = 0;
  let withAddendum = 0;
  for (const rule of list) {
    total += 1;
    if ((rule['_meta'] as { hasAddendum?: boolean })?.hasAddendum === true) withAddendum += 1;
    const subrules = rule['subrules'] as Obj[] | undefined;
    if (subrules) {
      const sub = countRules(subrules);
      total += sub.total;
      withAddendum += sub.withAddendum;
    }
  }
  return { total, withAddendum };
}

const rulesSummary = rules.map((section) => ({
  id: section['id'],
  number: section['number'],
  title: section['title'],
  rules: (section['rules'] as Obj[]).map(summariseRule),
}));

const casebookSummary = casebook.map((scenario) => ({
  id: scenario['id'],
  sectionId: scenario['sectionId'],
  ruleReference: scenario['ruleReference'],
  correctIndex: scenario['correctIndex'],
  choiceCount: (scenario['choices'] as unknown[]).length,
  skillLevels: [...(scenario['skillLevels'] as string[])].sort(),
}));

const quizSummary = Object.fromEntries(
  READING_AGES.map((age) => [
    age,
    quizzesByAge[age].map((topic) => ({
      id: topic['id'],
      sectionId: topic['sectionId'],
      questions: (topic['questions'] as Obj[]).map((q) => ({
        id: q['id'],
        correctIndex: q['correctIndex'],
      })),
    })),
  ]),
);

const glossarySummary = Object.fromEntries(
  READING_AGES.map((age) => [age, glossaryByAge[age].map((term) => term['id'])]),
);

const ruleCounts = countRules(rules.flatMap((section) => section['rules'] as Obj[]));

const totals = {
  ruleSections: rules.length,
  rules: ruleCounts.total,
  rulesWithAddendum: ruleCounts.withAddendum,
  casebookScenarios: casebook.length,
  quizTopicsByAge: Object.fromEntries(READING_AGES.map((age) => [age, quizzesByAge[age].length])),
  glossaryTermsByAge: Object.fromEntries(
    READING_AGES.map((age) => [age, glossaryByAge[age].length]),
  ),
};

describe('content baseline (golden master)', () => {
  it('content totals are unchanged', () => {
    expect(totals).toMatchSnapshot();
  });

  it('rule structure is unchanged', () => {
    expect(rulesSummary).toMatchSnapshot();
  });

  it('casebook structure is unchanged', () => {
    expect(casebookSummary).toMatchSnapshot();
  });

  it('quiz structure is unchanged', () => {
    expect(quizSummary).toMatchSnapshot();
  });

  it('glossary structure is unchanged', () => {
    expect(glossarySummary).toMatchSnapshot();
  });

  it('every collection has content', () => {
    expect(totals.ruleSections).toBeGreaterThan(0);
    expect(totals.rules).toBeGreaterThan(0);
    expect(totals.rulesWithAddendum).toBeGreaterThan(0);
    expect(totals.casebookScenarios).toBeGreaterThan(0);
    for (const age of READING_AGES) {
      expect(quizzesByAge[age].length).toBeGreaterThan(0);
      expect(glossaryByAge[age].length).toBeGreaterThan(0);
    }
  });
});
