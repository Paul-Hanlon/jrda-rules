import { Injectable, signal } from '@angular/core';
import { UserProfile } from '../models/user-profile';

const STORAGE_KEY = 'jrda-user-profile';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private readonly _profile = signal<UserProfile | null>(this.load());

  readonly profile = this._profile.asReadonly();
  readonly isNewUser = signal(!this.load());

  save(profile: UserProfile): void {
    this._profile.set(profile);
    this.isNewUser.set(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }

  private load(): UserProfile | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored) as UserProfile;
      if (parsed.role && parsed.level) return parsed;
      return null;
    } catch {
      return null;
    }
  }
}
