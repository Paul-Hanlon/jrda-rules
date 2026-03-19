import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ReadingAgeService } from '../../../services/reading-age.service';
import { UserProfileService } from '../../../services/user-profile.service';
import { ReadingAge } from '../../../models/reading-age';

@Component({
  selector: 'app-reading-age-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <fieldset class="age-selector" role="radiogroup" aria-label="Reading age">
        <legend class="visually-hidden">Select your reading age</legend>
        <span class="label" aria-hidden="true">Age</span>
        @for (age of ages; track age) {
          <button
            type="button"
            role="radio"
            [attr.aria-checked]="readingAgeService.readingAge() === age"
            [class.active]="readingAgeService.readingAge() === age"
            (click)="readingAgeService.setReadingAge(age)"
          >
            {{ age }}
          </button>
        }
      </fieldset>
    }
  `,
  styles: `
    .age-selector {
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
      white-space: nowrap;
      transition:
        background-color 0.15s,
        color 0.15s;

      &:hover {
        background: var(--color-border);
      }

      &.active {
        background: var(--color-primary);
        color: #fff;
      }
    }
  `,
})
export class ReadingAgeSelectorComponent {
  protected readonly readingAgeService = inject(ReadingAgeService);
  private readonly profileService = inject(UserProfileService);

  protected readonly ages: ReadingAge[] = ['7-8', '9-10', '11-12', '13+'];

  protected readonly visible = computed(() => {
    const profile = this.profileService.profile();
    return profile?.role === 'skater';
  });
}
