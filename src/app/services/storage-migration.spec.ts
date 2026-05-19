import { TestBed } from '@angular/core/testing';
import { DEFAULT_PROGRESS } from '../models/progress';
import { migrateStorageKey } from './storage-migration';
import { SkillLevelService } from './skill-level.service';
import { ReadingAgeService } from './reading-age.service';
import { ProgressService } from './progress.service';
import { UserProfileService } from './user-profile.service';

describe('migrateStorageKey', () => {
  afterEach(() => localStorage.clear());

  it('copies a legacy value to the new key and removes the old one', () => {
    localStorage.setItem('jrda-x', 'value');
    migrateStorageKey('jrda-x', 'derby-rules-x');
    expect(localStorage.getItem('derby-rules-x')).toBe('value');
    expect(localStorage.getItem('jrda-x')).toBeNull();
  });

  it('leaves an already-migrated new key untouched', () => {
    localStorage.setItem('jrda-x', 'old');
    localStorage.setItem('derby-rules-x', 'new');
    migrateStorageKey('jrda-x', 'derby-rules-x');
    expect(localStorage.getItem('derby-rules-x')).toBe('new');
    expect(localStorage.getItem('jrda-x')).toBe('old');
  });

  it('is a no-op when neither key exists', () => {
    migrateStorageKey('jrda-x', 'derby-rules-x');
    expect(localStorage.getItem('derby-rules-x')).toBeNull();
  });
});

describe('service storage-key migration', () => {
  afterEach(() => localStorage.clear());

  it('SkillLevelService migrates jrda-skill-level', () => {
    localStorage.setItem('jrda-skill-level', 'L2');
    expect(TestBed.inject(SkillLevelService).level()).toBe('L2');
    expect(localStorage.getItem('derby-rules-skill-level')).toBe('L2');
    expect(localStorage.getItem('jrda-skill-level')).toBeNull();
  });

  it('ReadingAgeService migrates jrda-reading-age', () => {
    localStorage.setItem('jrda-reading-age', '9-10');
    expect(TestBed.inject(ReadingAgeService).readingAge()).toBe('9-10');
    expect(localStorage.getItem('derby-rules-reading-age')).toBe('9-10');
    expect(localStorage.getItem('jrda-reading-age')).toBeNull();
  });

  it('ProgressService migrates jrda-progress', () => {
    localStorage.setItem(
      'jrda-progress',
      JSON.stringify({ ...DEFAULT_PROGRESS, readRuleIds: ['1.1'] }),
    );
    expect(TestBed.inject(ProgressService).progress().readRuleIds).toEqual(['1.1']);
    expect(localStorage.getItem('derby-rules-progress')).not.toBeNull();
    expect(localStorage.getItem('jrda-progress')).toBeNull();
  });

  it('UserProfileService migrates jrda-user-profile', () => {
    localStorage.setItem(
      'jrda-user-profile',
      JSON.stringify({ role: 'skater', level: 'L3', landed: true, onboarded: true }),
    );
    expect(TestBed.inject(UserProfileService).profile()?.role).toBe('skater');
    expect(localStorage.getItem('derby-rules-user-profile')).not.toBeNull();
    expect(localStorage.getItem('jrda-user-profile')).toBeNull();
  });
});
