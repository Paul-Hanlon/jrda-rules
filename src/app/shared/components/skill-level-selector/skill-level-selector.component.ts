import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SkillLevelService } from '../../../services/skill-level.service';
import { SkillLevel } from '../../../models/skill-level';
import { SKILL_LEVELS } from '../../../data/skill-levels.data';

@Component({
  selector: 'app-skill-level-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset class="level-selector" role="radiogroup" aria-label="Skill level">
      <legend class="visually-hidden">Select your skill level</legend>
      @for (info of levels; track info.level) {
        <button
          type="button"
          role="radio"
          [attr.aria-checked]="skillLevelService.level() === info.level"
          [class.active]="skillLevelService.level() === info.level"
          [attr.data-level]="info.level"
          (click)="skillLevelService.setLevel(info.level)"
        >
          {{ info.level }}
        </button>
      }
    </fieldset>
  `,
  styles: `
    .level-selector {
      display: flex;
      gap: var(--space-xs);
      border: none;
      padding: 0;
    }

    button {
      min-width: var(--touch-target);
      min-height: 36px;
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--radius-full);
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      background: var(--color-border-light);
      transition: background-color 0.15s, color 0.15s;

      &:hover {
        background: var(--color-border);
      }

      &.active[data-level='L1'] {
        background: var(--color-level-1);
        color: #fff;
      }

      &.active[data-level='L2'] {
        background: var(--color-level-2);
        color: #fff;
      }

      &.active[data-level='L3'] {
        background: var(--color-level-3);
        color: #fff;
      }
    }
  `,
})
export class SkillLevelSelectorComponent {
  protected readonly skillLevelService = inject(SkillLevelService);
  protected readonly levels = SKILL_LEVELS;
}
