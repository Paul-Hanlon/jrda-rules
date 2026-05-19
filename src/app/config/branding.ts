/**
 * Central app branding — the single source of truth for the app name,
 * tagline, and default ruleset. UI strings are wired to read from here in
 * Phase 5; defined now so later phases have one place to reference.
 */
export const BRANDING = {
  appName: 'Derby Rules',
  tagline: 'Interactive learning for Roller Derby rules',
  /** Ruleset selected for new users and when none is stored. */
  defaultRulesetId: 'jrda',
} as const;
