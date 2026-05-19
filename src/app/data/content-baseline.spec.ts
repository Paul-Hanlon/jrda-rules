/**
 * Golden-master content baseline.
 *
 * Captures the structural shape of the app's rule / casebook / quiz / glossary
 * content as it exists BEFORE the multi-ruleset migration. The committed snapshot
 * (`__snapshots__/content-baseline.spec.ts.snap`) is the migration oracle: once
 * content moves to bundled JSON + the runtime merge engine, the merged JRDA output
 * must reproduce this exact shape.
 *
 * When the data source is repointed (plan Phase 4), update the imports below to
 * read from the loader — but do NOT regenerate the snapshot. A snapshot diff then
 * means a genuine content regression.
 */
import { RULE_SECTIONS } from './rules.data';
import { CASEBOOK_SCENARIOS } from './casebook.data';
import { QUIZ_DATA_BY_AGE } from './quiz-data-by-age';
import { GLOSSARY_DATA_BY_AGE } from './glossary-data-by-age';
import { Rule } from '../models/rule';
import { ReadingAge } from '../models/reading-age';

const READING_AGES: ReadingAge[] = ['7-8', '9-10', '11-12', '13+'];

function summariseRule(rule: Rule): unknown {
  return {
    id: rule.id,
    number: rule.number,
    skillLevels: [...rule.skillLevels].sort(),
    hasAddendum: rule.jrdaAddendum != null,
    subrules: (rule.subrules ?? []).map(summariseRule),
  };
}

function countRules(rules: Rule[]): { total: number; withAddendum: number } {
  let total = 0;
  let withAddendum = 0;
  for (const rule of rules) {
    total += 1;
    if (rule.jrdaAddendum != null) withAddendum += 1;
    if (rule.subrules) {
      const sub = countRules(rule.subrules);
      total += sub.total;
      withAddendum += sub.withAddendum;
    }
  }
  return { total, withAddendum };
}

const rulesSummary = RULE_SECTIONS.map((section) => ({
  id: section.id,
  number: section.number,
  title: section.title,
  rules: section.rules.map(summariseRule),
}));

const casebookSummary = CASEBOOK_SCENARIOS.map((scenario) => ({
  id: scenario.id,
  sectionId: scenario.sectionId,
  ruleReference: scenario.ruleReference,
  correctIndex: scenario.correctIndex,
  choiceCount: scenario.choices.length,
  skillLevels: [...scenario.skillLevels].sort(),
}));

const quizSummary = Object.fromEntries(
  READING_AGES.map((age) => [
    age,
    QUIZ_DATA_BY_AGE[age].map((topic) => ({
      id: topic.id,
      sectionId: topic.sectionId,
      questions: topic.questions.map((q) => ({ id: q.id, correctIndex: q.correctIndex })),
    })),
  ]),
);

const glossarySummary = Object.fromEntries(
  READING_AGES.map((age) => [age, GLOSSARY_DATA_BY_AGE[age].map((term) => term.id)]),
);

const ruleCounts = countRules(RULE_SECTIONS.flatMap((section) => section.rules));

const totals = {
  ruleSections: RULE_SECTIONS.length,
  rules: ruleCounts.total,
  rulesWithAddendum: ruleCounts.withAddendum,
  casebookScenarios: CASEBOOK_SCENARIOS.length,
  quizTopicsByAge: Object.fromEntries(READING_AGES.map((age) => [age, QUIZ_DATA_BY_AGE[age].length])),
  glossaryTermsByAge: Object.fromEntries(
    READING_AGES.map((age) => [age, GLOSSARY_DATA_BY_AGE[age].length]),
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
      expect(QUIZ_DATA_BY_AGE[age].length).toBeGreaterThan(0);
      expect(GLOSSARY_DATA_BY_AGE[age].length).toBeGreaterThan(0);
    }
  });
});
