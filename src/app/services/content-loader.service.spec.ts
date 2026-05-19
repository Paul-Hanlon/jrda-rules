import { TestBed } from '@angular/core/testing';
import { MergedRuleset, RulesetRegistryEntry } from '../models/ruleset';
import { ContentLoaderService } from './content-loader.service';
import { RulesetLoaderService } from './ruleset-loader.service';

const INDEX: RulesetRegistryEntry[] = [
  { id: 'wftda', name: 'WFTDA', selectable: false },
  { id: 'jrda', name: 'JRDA', selectable: true },
];

const MERGED = {
  manifest: { id: 'jrda', name: 'JRDA' },
  rules: [],
  casebook: [],
  glossary: {},
  quizzes: {},
} as unknown as MergedRuleset;

describe('ContentLoaderService', () => {
  afterEach(() => localStorage.clear());

  function setup(stub: Partial<RulesetLoaderService>): ContentLoaderService {
    TestBed.configureTestingModule({
      providers: [{ provide: RulesetLoaderService, useValue: stub as RulesetLoaderService }],
    });
    return TestBed.inject(ContentLoaderService);
  }

  const settle = () => new Promise((r) => setTimeout(r, 0));

  it('loads to ready and exposes merged content + selectable rulesets', async () => {
    const svc = setup({
      loadRulesetContent: () => Promise.resolve(MERGED),
      loadIndex: () => Promise.resolve(INDEX),
    });
    TestBed.tick();
    await settle();

    expect(svc.state()).toBe('ready');
    expect(svc.merged()).toBe(MERGED);
    expect(svc.activeManifest()?.id).toBe('jrda');
    expect(svc.availableRulesets().map((r) => r.id)).toEqual(['jrda']);
  });

  it('enters the error state when the loader rejects', async () => {
    const svc = setup({
      loadRulesetContent: () => Promise.reject(new Error('boom')),
      loadIndex: () => Promise.resolve(INDEX),
    });
    TestBed.tick();
    await settle();

    expect(svc.state()).toBe('error');
    expect(svc.merged()).toBeNull();
  });
});
