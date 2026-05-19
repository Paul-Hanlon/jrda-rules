import { Injectable, Signal, computed, signal } from '@angular/core';
import {
  RemoteConfig,
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from 'firebase/remote-config';
import { getFirebaseApp } from './firebase-app';

type FlagValue = boolean | string | number;

/**
 * Defaults shipped in the bundle. These match the params set in the Firebase
 * console — change them here when a new flag is added so the app has a
 * sensible value before the first remote fetch completes (or if it fails).
 */
const DEFAULTS: Record<string, FlagValue> = {
  badge: false,
  auth: false,
  parentOnboarding: false,
  multiRuleset: false,
};

/**
 * Key used for the localStorage dev/test override. Reading
 * `flag:<name>` → 'true' / 'false' always wins over the remote value.
 * This is the escape hatch that keeps Playwright tests deterministic
 * without relying on network.
 */
const OVERRIDE_PREFIX = 'flag:';

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  private readonly rc: RemoteConfig;
  private readonly _version = signal(0);
  private readonly flagCache = new Map<string, Signal<boolean>>();

  readonly ready = signal(false);

  constructor() {
    this.rc = getRemoteConfig(getFirebaseApp());
    this.rc.defaultConfig = { ...DEFAULTS } as Record<string, string | number | boolean>;
    // Conservative 1-hour cache; override if we need faster rollouts later.
    this.rc.settings.minimumFetchIntervalMillis = 60 * 60 * 1000;

    fetchAndActivate(this.rc)
      .catch(() => undefined)
      .finally(() => {
        this._version.update((v) => v + 1);
        this.ready.set(true);
      });
  }

  flag(key: string): Signal<boolean> {
    const cached = this.flagCache.get(key);
    if (cached) return cached;

    const sig = computed<boolean>(() => {
      const override = this.readOverride(key);
      if (override !== undefined) return override;
      // Track the activation version so the computed recomputes once remote lands.
      this._version();
      return getValue(this.rc, key).asBoolean();
    });
    this.flagCache.set(key, sig);
    return sig;
  }

  private readOverride(key: string): boolean | undefined {
    try {
      const raw = localStorage.getItem(OVERRIDE_PREFIX + key);
      if (raw === 'true') return true;
      if (raw === 'false') return false;
    } catch {
      /* storage not available — fall through */
    }
    return undefined;
  }
}
