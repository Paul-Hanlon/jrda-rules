import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SkillLevelService } from '../../../services/skill-level.service';
import { ContentLoaderService } from '../../../services/content-loader.service';

@Component({
  selector: 'app-skill-level-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset class="level-selector" role="radiogroup" aria-label="Skill level">
      <legend class="visually-hidden">Select your skill level</legend>
      <span class="label" aria-hidden="true">Level</span>
      @for (info of levels(); track info.id) {
        <button
          type="button"
          role="radio"
          [attr.aria-checked]="skillLevelService.level() === info.id"
          [class.active]="skillLevelService.level() === info.id"
          [attr.data-level]="info.id"
          (click)="skillLevelService.setLevel(info.id)"
        >
          {{ info.id }}
        </button>
      }
    </fieldset>
  `,
  styles: `
    .level-selector {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      border: none;
      padding: 0;
    }

    .label {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: var(--font-size-xs);
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
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
  private readonly content = inject(ContentLoaderService);
  protected readonly skillLevelService = inject(SkillLevelService);
  protected readonly levels = computed(() => this.content.activeManifest()?.skillLevels ?? []);
}
