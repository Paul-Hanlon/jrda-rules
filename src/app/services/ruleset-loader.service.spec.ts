import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RULE_SECTIONS } from '../data/rules.data';
import { Rule, RuleSection } from '../models/rule';
import { RulesetLoaderService } from './ruleset-loader.service';

const ASSETS = join(process.cwd(), 'src/assets/rulesets');

/** The real bundled JSON for a request URL — proves the pipeline end to end. */
function realFile(url: string): object {
  const rel = url.replace(/^.*assets\/rulesets\//, '');
  return JSON.parse(readFileSync(join(ASSETS, rel), 'utf-8')) as object;
}

/** Recursively drop every `_meta` key so merged output can be compared to TS. */
function dropMeta(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(dropMeta);
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (k !== '_meta') out[k] = dropMeta(v);
    }
    return out;
  }
  return value;
}

/** RULE_SECTIONS with jrdaAddendum stripped — the expected WFTDA base shape. */
function stripAddendum(sections: readonly RuleSection[]): RuleSection[] {
  const strip = (rule: Rule): Rule => {
    const out = { ...rule };
    delete out.jrdaAddendum;
    if (out.subrules) out.subrules = out.subrules.map(strip);
    return out;
  };
  return sections.map((s) => ({ ...s, rules: s.rules.map(strip) }));
}

describe('RulesetLoaderService', () => {
  let loader: RulesetLoaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    loader = TestBed.inject(RulesetLoaderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  /** Resolve a loader promise, flushing each request with its real JSON file. */
  async function drain<T>(promise: Promise<T>): Promise<T> {
    let settled = false;
    promise.then(
      () => (settled = true),
      () => (settled = true),
    );
    for (let i = 0; i < 100 && !settled; i++) {
      await new Promise((r) => setTimeout(r, 0));
      for (const req of httpMock.match(() => true)) {
        req.flush(realFile(req.request.url));
      }
    }
    return promise;
  }

  it('loads the registry', async () => {
    const index = await drain(loader.loadIndex());
    expect(index.map((r) => r.id)).toEqual(['wftda', 'jrda']);
  });

  it('resolves the jrda extends chain and merges to the original rule structure', async () => {
    const merged = await drain(loader.loadRulesetContent('jrda'));

    expect(merged.manifest.id).toBe('jrda');
    // WFTDA base (no jrdaAddendum) re-merged with JRDA addenda == original TS.
    expect(dropMeta(merged.rules)).toEqual(stripAddendum(RULE_SECTIONS));
  });

  it('surfaces JRDA addenda as provenance on the merged rules', async () => {
    const merged = await drain(loader.loadRulesetContent('jrda'));

    const withAddendum: { id: string; text: string }[] = [];
    const walkMerged = (nodes: unknown): void => {
      if (!Array.isArray(nodes)) return;
      for (const node of nodes as Record<string, unknown>[]) {
        const meta = node['_meta'] as { hasAddendum?: boolean; addendumText?: string } | undefined;
        if (meta?.hasAddendum) {
          withAddendum.push({ id: String(node['id']), text: String(meta.addendumText) });
        }
        walkMerged(node['rules']);
        walkMerged(node['subrules']);
      }
    };
    walkMerged(merged.rules);

    const expected: { id: string; text: string }[] = [];
    const collect = (rules: Rule[]): void => {
      for (const r of rules) {
        if (r.jrdaAddendum != null) expected.push({ id: r.id, text: r.jrdaAddendum });
        if (r.subrules) collect(r.subrules);
      }
    };
    for (const section of RULE_SECTIONS) collect(section.rules);

    expect(withAddendum).toEqual(expected);
  });

  it('caches content — a second request issues no new HTTP calls', async () => {
    await drain(loader.loadRulesetContent('jrda'));
    const again = await loader.loadRulesetContent('jrda');
    httpMock.expectNone(() => true);
    expect(again.manifest.id).toBe('jrda');
  });
});
