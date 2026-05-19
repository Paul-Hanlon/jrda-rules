/**
 * One-time rename of a localStorage key from the legacy `jrda-` prefix to the
 * current `derby-rules-` prefix. If the new key is absent and the legacy key
 * exists, the value is copied across and the legacy key removed. Safe to call
 * on every load — it is a no-op once migrated.
 */
export function migrateStorageKey(legacyKey: string, currentKey: string): void {
  if (localStorage.getItem(currentKey) !== null) return;
  const legacyValue = localStorage.getItem(legacyKey);
  if (legacyValue !== null) {
    localStorage.setItem(currentKey, legacyValue);
    localStorage.removeItem(legacyKey);
  }
}
