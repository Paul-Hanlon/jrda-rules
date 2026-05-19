import { mergeCollection, tagBase, TreeShape } from './ruleset-merge';
import { Merged } from '../models/ruleset';

interface Item {
  id: string;
  label: string;
}

interface Node {
  id: string;
  label: string;
  kids?: Node[];
}

const TREE: TreeShape<Node> = {
  childrenOf: (n) => n.kids,
  withChildren: (n, c) => ({ ...n, kids: [...c] }),
};

const m = (n: Node): Merged<Node> => n as Merged<Node>;

describe('ruleset-merge', () => {
  describe('tagBase', () => {
    it('tags flat items as inherited', () => {
      expect(tagBase<Item>([{ id: 'a', label: 'A' }], 'wftda')).toEqual([
        { id: 'a', label: 'A', _meta: { provenance: 'inherited', rulesetId: 'wftda' } },
      ]);
    });

    it('tags nested nodes recursively', () => {
      const out = tagBase<Node>([{ id: 'p', label: 'P', kids: [{ id: 'c', label: 'C' }] }], 'w', TREE);
      expect(out[0]._meta).toEqual({ provenance: 'inherited', rulesetId: 'w' });
      expect(m(out[0].kids![0])._meta).toEqual({ provenance: 'inherited', rulesetId: 'w' });
    });
  });

  describe('standalone ruleset', () => {
    it('mergeCollection with override.base ignores the parent', () => {
      const out = mergeCollection<Item>([], { base: [{ id: 'a', label: 'A' }] }, 'wftda');
      expect(out).toEqual([{ id: 'a', label: 'A', _meta: { provenance: 'inherited', rulesetId: 'wftda' } }]);
    });
  });

  describe('addendum op', () => {
    it('sets hasAddendum/addendumText and keeps provenance', () => {
      const parent = tagBase<Item>([{ id: 'a', label: 'A' }], 'wftda');
      const out = mergeCollection(parent, { ops: [{ op: 'addendum', id: 'a', text: 'note' }] }, 'jrda');
      expect(out[0]._meta).toEqual({
        provenance: 'inherited',
        rulesetId: 'wftda',
        hasAddendum: true,
        addendumText: 'note',
      });
    });

    it('targets a nested node by id', () => {
      const parent = tagBase<Node>([{ id: 'p', label: 'P', kids: [{ id: 'c', label: 'C' }] }], 'w', TREE);
      const out = mergeCollection(parent, { ops: [{ op: 'addendum', id: 'c', text: 'x' }] }, 'jrda', TREE);
      expect(m(out[0].kids![0])._meta.hasAddendum).toBe(true);
      expect(m(out[0].kids![0])._meta.addendumText).toBe('x');
    });
  });

  describe('replace op', () => {
    it('swaps the value and marks it replaced', () => {
      const parent = tagBase<Item>([{ id: 'a', label: 'A' }], 'wftda');
      const out = mergeCollection(
        parent,
        { ops: [{ op: 'replace', id: 'a', value: { id: 'a', label: 'A2' } }] },
        'jrda',
      );
      expect(out[0].label).toBe('A2');
      expect(out[0]._meta).toEqual({ provenance: 'replaced', rulesetId: 'jrda' });
    });
  });

  describe('add op', () => {
    it('appends when no `after` is given', () => {
      const parent = tagBase<Item>([{ id: 'a', label: 'A' }], 'wftda');
      const out = mergeCollection(parent, { ops: [{ op: 'add', value: { id: 'b', label: 'B' } }] }, 'jrda');
      expect(out.map((i) => i.id)).toEqual(['a', 'b']);
      expect(out[1]._meta).toEqual({ provenance: 'added', rulesetId: 'jrda' });
    });

    it('inserts directly after the `after` sibling, including nested', () => {
      const parent = tagBase<Node>([{ id: 'p', label: 'P', kids: [{ id: 'c1', label: 'C1' }] }], 'w', TREE);
      const out = mergeCollection(
        parent,
        { ops: [{ op: 'add', after: 'c1', value: { id: 'c2', label: 'C2' } }] },
        'jrda',
        TREE,
      );
      expect(out[0].kids!.map((k) => k.id)).toEqual(['c1', 'c2']);
    });
  });

  describe('remove op', () => {
    it('drops the item, including from a nested array', () => {
      const parent = tagBase<Node>(
        [{ id: 'p', label: 'P', kids: [{ id: 'c1', label: 'C1' }, { id: 'c2', label: 'C2' }] }],
        'w',
        TREE,
      );
      const out = mergeCollection(parent, { ops: [{ op: 'remove', id: 'c1' }] }, 'jrda', TREE);
      expect(out[0].kids!.map((k) => k.id)).toEqual(['c2']);
    });
  });

  describe('ordering & purity', () => {
    it('applies ops in order', () => {
      const parent = tagBase<Item>([{ id: 'a', label: 'A' }], 'wftda');
      const out = mergeCollection(
        parent,
        {
          ops: [
            { op: 'add', value: { id: 'b', label: 'B' } },
            { op: 'remove', id: 'b' },
          ],
        },
        'jrda',
      );
      expect(out.map((i) => i.id)).toEqual(['a']);
    });

    it('does not mutate the parent input', () => {
      const parent = tagBase<Item>([{ id: 'a', label: 'A' }], 'wftda');
      const snapshot = structuredClone(parent);
      mergeCollection(parent, { ops: [{ op: 'addendum', id: 'a', text: 'note' }] }, 'jrda');
      expect(parent).toEqual(snapshot);
    });

    it('preserves parent provenance for untouched items across a chain', () => {
      // wftda base -> jrda adds 'b' -> mrda leaves both untouched
      const wftda = mergeCollection<Item>([], { base: [{ id: 'a', label: 'A' }] }, 'wftda');
      const jrda = mergeCollection(wftda, { ops: [{ op: 'add', value: { id: 'b', label: 'B' } }] }, 'jrda');
      const mrda = mergeCollection(jrda, { ops: [] }, 'mrda');
      expect(mrda[0]._meta).toEqual({ provenance: 'inherited', rulesetId: 'wftda' });
      expect(mrda[1]._meta).toEqual({ provenance: 'added', rulesetId: 'jrda' });
    });
  });
});
