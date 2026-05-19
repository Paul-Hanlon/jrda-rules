import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RulesetLoaderService } from './ruleset-loader.service';

const ASSETS = join(process.cwd(), 'src/assets/rulesets');

/** The real bundled JSON for a request URL — exercises the pipeline end to end. */
function realFile(url: string): object {
  const rel = url.replace(/^.*assets\/rulesets\//, '');
  return JSON.parse(readFileSync(join(ASSETS, rel), 'utf-8')) as object;
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

  it('resolves the jrda extends chain and tags every rule node with provenance', async () => {
    const merged = await drain(loader.loadRulesetContent('jrda'));

    expect(merged.manifest.id).toBe('jrda');
    expect(merged.manifest.extends).toBe('wftda');
    expect(merged.rules.length).toBeGreaterThan(0);

    let nodes = 0;
    const walk = (list: unknown): void => {
      if (!Array.isArray(list)) return;
      for (const node of list as Record<string, unknown>[]) {
        nodes += 1;
        expect(node['_meta']).toBeDefined();
        walk(node['rules']);
        walk(node['subrules']);
      }
    };
    walk(merged.rules);
    expect(nodes).toBeGreaterThan(merged.rules.length);
  });

  it('surfaces the JRDA addenda as provenance on the merged rules', async () => {
    const merged = await drain(loader.loadRulesetContent('jrda'));

    const addenda: { id: string; text: string }[] = [];
    const walk = (list: unknown): void => {
      if (!Array.isArray(list)) return;
      for (const node of list as Record<string, unknown>[]) {
        const meta = node['_meta'] as { hasAddendum?: boolean; addendumText?: string } | undefined;
        if (meta?.hasAddendum) {
          addenda.push({ id: String(node['id']), text: String(meta.addendumText) });
        }
        walk(node['rules']);
        walk(node['subrules']);
      }
    };
    walk(merged.rules);

    // The bundled jrda/rules.json carries exactly the addenda extracted in Phase 2.
    const expected = (realFile('jrda/rules.json') as { ops: { id: string; text: string }[] }).ops;
    expect(addenda).toEqual(expected.map((op) => ({ id: op.id, text: op.text })));
    expect(addenda.length).toBeGreaterThan(0);
  });

  it('caches content — a second request issues no new HTTP calls', async () => {
    await drain(loader.loadRulesetContent('jrda'));
    const again = await loader.loadRulesetContent('jrda');
    httpMock.expectNone(() => true);
    expect(again.manifest.id).toBe('jrda');
  });
});
