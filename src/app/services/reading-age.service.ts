import { computed, inject, Injectable, signal } from '@angular/core';
import { ReadingAge } from '../models/reading-age';
import { UserProfileService } from './user-profile.service';
import { migrateStorageKey } from './storage-migration';

const STORAGE_KEY = 'derby-rules-reading-age';
const LEGACY_KEY = 'jrda-reading-age';

@Injectable({ providedIn: 'root' })
export class ReadingAgeService {
  private readonly profileService = inject(UserProfileService);
  private readonly _readingAge = signal<ReadingAge>(this.loadReadingAge());

  readonly readingAge = this._readingAge.asReadonly();

  readonly effectiveReadingAge = computed<ReadingAge>(() => {
    const profile = this.profileService.profile();
    if (profile?.role === 'coach' || profile?.role === 'parent') {
      return '13+';
    }
    return this._readingAge();
  });

  setReadingAge(age: ReadingAge): void {
    this._readingAge.set(age);
    localStorage.setItem(STORAGE_KEY, age);
  }

  private loadReadingAge(): ReadingAge {
    migrateStorageKey(LEGACY_KEY, STORAGE_KEY);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === '7-8' || stored === '9-10' || stored === '11-12' || stored === '13+') {
      return stored;
    }
    return '13+';
  }
}
