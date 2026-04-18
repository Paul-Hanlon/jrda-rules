import { Injectable, computed, signal } from '@angular/core';
import {
  AuthDetails,
  DerivedRole,
  JuniorLogin,
  JuniorProfile,
  UserProfile,
  roleFromAge,
} from '../models/user-profile';

const STORAGE_KEY = 'jrda-user-profile';

const DEFAULT_PROFILE: UserProfile = {
  role: 'skater',
  accountType: 'skater',
  level: 'L3',
  skateName: 'Rolla Fister',
  number: '42',
  age: '12',
  team: 'Iron Jaws Jr.',
  readingAge: '13+',
};

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private readonly _profile = signal<UserProfile | null>(this.load());

  readonly profile = this._profile.asReadonly();

  /** User has dismissed the landing splash. */
  readonly isLanded = computed(() => !!this._profile()?.landed);

  /** User has finished onboarding and should see the main shell. */
  readonly isNewUser = computed(() => !this._profile()?.onboarded);

  /**
   * Transient (not persisted) flag: a parent has stepped into a junior's
   * view. When true, the `/` route falls through to the skater dashboard
   * instead of the custodian dashboard. Cleared when the custodian page
   * mounts (so returning to the parent home resets the mode).
   */
  readonly inJuniorView = signal(false);

  enterJuniorView(): void {
    this.inJuniorView.set(true);
  }

  exitJuniorView(): void {
    this.inJuniorView.set(false);
  }

  readonly derivedRole = computed<DerivedRole>(() => roleFromAge(this._profile()?.age));
  readonly juniors = computed<JuniorProfile[]>(() => this._profile()?.juniors ?? []);
  readonly activeJunior = computed<JuniorProfile | null>(() => {
    const p = this._profile();
    if (!p?.juniors?.length) return null;
    const idx = p.activeJuniorIndex ?? 0;
    return p.juniors[idx] ?? p.juniors[0] ?? null;
  });

  save(profile: UserProfile): void {
    this._profile.set(profile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }

  markLanded(): void {
    const current = this._profile() ?? { ...DEFAULT_PROFILE };
    this.save({ ...current, landed: true });
  }

  completeOnboarding(): void {
    const current = this._profile() ?? { ...DEFAULT_PROFILE };
    this.save({ ...current, landed: true, onboarded: true });
  }

  update(patch: Partial<UserProfile>): void {
    const current = this._profile() ?? { ...DEFAULT_PROFILE };
    this.save({ ...current, ...patch });
  }

  getOrDefault(): UserProfile {
    return this._profile() ?? { ...DEFAULT_PROFILE };
  }

  setAuth(auth: AuthDetails | null): void {
    const current = this._profile() ?? { ...DEFAULT_PROFILE };
    if (auth) {
      this.save({ ...current, auth });
    } else {
      const { auth: _removed, ...rest } = current;
      this.save(rest);
    }
  }

  setActiveJunior(index: number): void {
    const current = this._profile();
    if (!current?.juniors?.length) return;
    const safeIdx = Math.max(0, Math.min(index, current.juniors.length - 1));
    const junior = current.juniors[safeIdx];
    this.save({
      ...current,
      activeJuniorIndex: safeIdx,
      skateName: junior.skateName,
      number: junior.number,
      age: junior.age,
      dob: junior.dob,
      team: junior.team,
      level: junior.level,
    });
  }

  setJuniorLogin(index: number, login: JuniorLogin): void {
    const current = this._profile();
    if (!current?.juniors?.length) return;
    const safeIdx = Math.max(0, Math.min(index, current.juniors.length - 1));
    const juniors = current.juniors.map((j, i) =>
      i === safeIdx ? { ...j, login } : j,
    );
    this.save({ ...current, juniors });
  }

  clearJuniorLogin(index: number): void {
    const current = this._profile();
    if (!current?.juniors?.length) return;
    const safeIdx = Math.max(0, Math.min(index, current.juniors.length - 1));
    const juniors = current.juniors.map((j, i) => {
      if (i !== safeIdx) return j;
      const { login: _removed, ...rest } = j;
      return rest;
    });
    this.save({ ...current, juniors });
  }

  removeJunior(index: number): void {
    const current = this._profile();
    if (!current?.juniors?.length) return;
    const safeIdx = Math.max(0, Math.min(index, current.juniors.length - 1));
    const juniors = current.juniors.filter((_, i) => i !== safeIdx);
    const nextActive = Math.min(
      current.activeJuniorIndex ?? 0,
      Math.max(juniors.length - 1, 0),
    );
    this.save({ ...current, juniors, activeJuniorIndex: nextActive });
  }

  reset(): void {
    this._profile.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  private load(): UserProfile | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored) as UserProfile;
      if (parsed.role && parsed.level) {
        // Back-compat: profiles written before the landed/onboarded flags
        // existed have neither flag. Treat those users as past both gates
        // so they don't bounce through onboarding again. Newly-landed users
        // already have `landed: true` set, so this branch won't touch them.
        if (parsed.landed === undefined && parsed.onboarded === undefined) {
          parsed.landed = true;
          parsed.onboarded = true;
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  }
}
