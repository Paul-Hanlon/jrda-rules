import { Injectable, signal } from '@angular/core';
import { SkillLevel } from '../models/skill-level';

const STORAGE_KEY = 'jrda-skill-level';

@Injectable({ providedIn: 'root' })
export class SkillLevelService {
  private readonly _level = signal<SkillLevel>(this.loadLevel());

  readonly level = this._level.asReadonly();

  setLevel(level: SkillLevel): void {
    this._level.set(level);
    localStorage.setItem(STORAGE_KEY, level);
  }

  private loadLevel(): SkillLevel {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'L1' || stored === 'L2' || stored === 'L3') {
      return stored;
    }
    return 'L1';
  }
}
