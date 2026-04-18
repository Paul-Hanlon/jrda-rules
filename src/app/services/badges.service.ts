import { Injectable, computed, inject } from '@angular/core';
import { ProgressService } from './progress.service';
import { BADGES, BadgeDef } from '../models/badge';

@Injectable({ providedIn: 'root' })
export class BadgesService {
  private readonly progress = inject(ProgressService);

  readonly all: readonly BadgeDef[] = BADGES;

  readonly earned = computed<BadgeDef[]>(() =>
    BADGES.filter((b) => b.isEarned(this.progress.progress()))
  );

  readonly earnedCount = computed(() => this.earned().length);

  isEarned(id: string): boolean {
    const def = BADGES.find((b) => b.id === id);
    return !!def && def.isEarned(this.progress.progress());
  }
}
