/**
 * Pure merge engine for the multi-ruleset content model.
 *
 * A ruleset is either standalone (`override.base`) or inherits from a parent
 * (`override.ops`). `tagBase` seeds the root of an `extends` chain; each child
 * is then folded on with `mergeCollection`, bottom-up. Every item in the result
 * carries `_meta` provenance so the UI can mark inherited / added / replaced
 * items and ruleset-specific addenda.
 *
 * The engine is generic over any `{ id: string }` item. Flat collections omit
 * `tree`; hierarchical ones (rules) pass a `TreeShape` describing how nodes
 * nest. Ops are matched by `id` at any depth.
 */
import { CollectionOverride, Merged, OverrideOp, Provenance } from '../models/ruleset';

/** Describes how a hierarchical collection nests. Omit for flat collections. */
export interface TreeShape<T> {
  /** This node's children, or undefined if it has none. */
  childrenOf(node: T): readonly T[] | undefined;
  /** A copy of `node` with its children replaced. */
  withChildren(node: T, children: readonly T[]): T;
}

/** Recursively attach provenance to a raw node and all its descendants. */
function tagNode<T extends { id: string }>(
  node: T,
  provenance: Provenance,
  rulesetId: string,
  tree?: TreeShape<T>,
): Merged<T> {
  let base = node;
  const kids = tree?.childrenOf(node);
  if (tree && kids) {
    base = tree.withChildren(
      node,
      kids.map((kid) => tagNode(kid, provenance, rulesetId, tree)),
    );
  }
  return { ...base, _meta: { provenance, rulesetId } };
}

/**
 * Tag a raw base collection as the root of an `extends` chain — every item
 * (and descendant) is `inherited` from `rulesetId`.
 */
export function tagBase<T extends { id: string }>(
  base: readonly T[],
  rulesetId: string,
  tree?: TreeShape<T>,
): Merged<T>[] {
  return base.map((node) => tagNode(node, 'inherited', rulesetId, tree));
}

/** Locate the array + index holding the item with `id`, searching all depths. */
function findContainer<T extends { id: string }>(
  items: Merged<T>[],
  id: string,
  tree?: TreeShape<T>,
): { arr: Merged<T>[]; index: number } | null {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) return { arr: items, index: i };
    const kids = tree?.childrenOf(items[i]) as Merged<T>[] | undefined;
    if (kids) {
      const found = findContainer(kids, id, tree);
      if (found) return found;
    }
  }
  return null;
}

/** Apply one override op in place to an already-cloned merged collection. */
function applyOp<T extends { id: string }>(
  items: Merged<T>[],
  op: OverrideOp<T>,
  rulesetId: string,
  tree?: TreeShape<T>,
): void {
  switch (op.op) {
    case 'remove': {
      const found = findContainer(items, op.id, tree);
      if (found) found.arr.splice(found.index, 1);
      return;
    }
    case 'replace': {
      const found = findContainer(items, op.id, tree);
      if (found) found.arr[found.index] = tagNode(op.value, 'replaced', rulesetId, tree);
      return;
    }
    case 'addendum': {
      const found = findContainer(items, op.id, tree);
      if (found) {
        const node = found.arr[found.index];
        node._meta = { ...node._meta, hasAddendum: true, addendumText: op.text };
      }
      return;
    }
    case 'add': {
      const tagged = tagNode(op.value, 'added', rulesetId, tree);
      if (op.after) {
        const found = findContainer(items, op.after, tree);
        if (found) {
          found.arr.splice(found.index + 1, 0, tagged);
          return;
        }
      }
      items.push(tagged);
      return;
    }
  }
}

/**
 * Merge one ruleset's override onto its parent.
 *
 * - Standalone ruleset (`override.base`): `parent` is ignored; the base is
 *   tagged `inherited`.
 * - Inheriting ruleset (`override.ops`): the parent's merged result is cloned
 *   (provenance preserved) and the ops are applied in order.
 */
export function mergeCollection<T extends { id: string }>(
  parent: readonly Merged<T>[],
  override: CollectionOverride<T>,
  rulesetId: string,
  tree?: TreeShape<T>,
): Merged<T>[] {
  if (override.base) {
    return tagBase(override.base, rulesetId, tree);
  }
  const items = structuredClone(parent) as Merged<T>[];
  for (const op of override.ops ?? []) {
    applyOp(items, op, rulesetId, tree);
  }
  return items;
}
