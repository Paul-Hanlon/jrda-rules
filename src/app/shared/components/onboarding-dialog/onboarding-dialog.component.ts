import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { SkillLevelService } from '../../../services/skill-level.service';
import { ReadingAgeService } from '../../../services/reading-age.service';
import { UserProfileService } from '../../../services/user-profile.service';
import { UserRole } from '../../../models/user-profile';
import { ReadingAge } from '../../../models/reading-age';
import { SkillLevel } from '../../../models/skill-level';
import { SKILL_LEVELS } from '../../../data/skill-levels.data';

@Component({
  selector: 'app-onboarding-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="backdrop" (click)="$event.stopPropagation()">
      <dialog class="dialog" open aria-labelledby="onboarding-title" role="dialog">
        @if (step() === 1) {
          <h2 id="onboarding-title">Welcome to JRDA Rules!</h2>
          <p class="prompt">Tell us about yourself so we can tailor your experience.</p>
          <fieldset class="options" role="radiogroup" aria-label="I am a">
            <legend class="legend">I am a...</legend>
            @for (r of roles; track r.value) {
              <button
                type="button"
                role="radio"
                [attr.aria-checked]="selectedRole() === r.value"
                [class.selected]="selectedRole() === r.value"
                (click)="selectedRole.set(r.value)"
              >
                <span class="option-icon" aria-hidden="true">{{ r.icon }}</span>
                <span class="option-label">{{ r.label }}</span>
              </button>
            }
          </fieldset>
          <button
            type="button"
            class="next-btn"
            [disabled]="!selectedRole()"
            (click)="advanceFromRole()"
          >
            Next
          </button>
        }

        @if (step() === 2) {
          <h2 id="onboarding-title">How old are you?</h2>
          <p class="prompt">
            This helps us use words that are easier to understand. You can change this anytime.
          </p>
          <fieldset class="options" role="radiogroup" aria-label="Reading age">
            <legend class="legend">Select your age range</legend>
            @for (age of ages; track age) {
              <button
                type="button"
                role="radio"
                [attr.aria-checked]="selectedReadingAge() === age"
                [class.selected]="selectedReadingAge() === age"
                (click)="selectedReadingAge.set(age)"
              >
                <span class="option-label">{{ age }}</span>
              </button>
            }
          </fieldset>
          <div class="btn-row">
            <button type="button" class="back-btn" (click)="step.set(1)">Back</button>
            <button
              type="button"
              class="next-btn"
              [disabled]="!selectedReadingAge()"
              (click)="step.set(3)"
            >
              Next
            </button>
          </div>
        }

        @if (step() === 3) {
          <h2 id="onboarding-title">
            @switch (selectedRole()) {
              @case ('skater') {
                What level are you studying?
              }
              @case ('coach') {
                What level do you coach?
              }
              @case ('parent') {
                What level is your skater at?
              }
            }
          </h2>
          <p class="prompt">You can change this anytime from the header.</p>
          <fieldset class="options" role="radiogroup" aria-label="Skill level">
            <legend class="legend">Select a level</legend>
            @for (info of levels; track info.level) {
              <button
                type="button"
                role="radio"
                [attr.aria-checked]="selectedLevel() === info.level"
                [class.selected]="selectedLevel() === info.level"
                [attr.data-level]="info.level"
                (click)="selectedLevel.set(info.level)"
              >
                <span class="option-icon" aria-hidden="true" [style.color]="info.color">
                  {{ info.level }}
                </span>
                <span class="option-details">
                  <span class="option-label">{{ info.label }}</span>
                  <span class="option-desc">{{ info.description }}</span>
                </span>
              </button>
            }
          </fieldset>
          <div class="btn-row">
            <button type="button" class="back-btn" (click)="goBackFromLevel()">Back</button>
            <button
              type="button"
              class="next-btn"
              [disabled]="!selectedLevel()"
              (click)="complete()"
            >
              Get Started
            </button>
          </div>
        }
      </dialog>
    </div>
  `,
  styles: `
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
      padding: var(--space-md);
    }

    .dialog {
      position: relative;
      width: 100%;
      max-width: 480px;
      margin: 0;
      padding: var(--space-xl);
      border: none;
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      box-shadow: var(--shadow-lg);
    }

    h2 {
      font-size: var(--font-size-2xl);
      color: var(--color-primary);
      margin-bottom: var(--space-sm);
    }

    .prompt {
      color: var(--color-text-secondary);
      margin-bottom: var(--space-lg);
    }

    .legend {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: var(--font-size-base);
      margin-bottom: var(--space-sm);
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      border: none;
      padding: 0;
      margin-bottom: var(--space-lg);

      button {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        width: 100%;
        padding: var(--space-md) var(--space-lg);
        border: 2px solid var(--color-border-light);
        border-radius: var(--radius-md);
        background: var(--color-surface);
        text-align: left;
        transition:
          border-color 0.15s,
          background-color 0.15s;

        &:hover {
          border-color: var(--color-border);
          background: var(--color-bg);
        }

        &.selected {
          border-color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 5%, transparent);
        }
      }
    }

    .option-icon {
      font-size: 1.5rem;
      font-weight: 800;
      font-family: var(--font-heading);
      flex-shrink: 0;
    }

    .option-label {
      font-weight: 700;
      font-size: var(--font-size-base);
    }

    .option-details {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .option-desc {
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
    }

    .btn-row {
      display: flex;
      gap: var(--space-sm);
      justify-content: flex-end;
    }

    .next-btn,
    .back-btn {
      padding: var(--space-sm) var(--space-lg);
      border-radius: var(--radius-sm);
      font-weight: 700;
      font-size: var(--font-size-base);
      min-height: var(--touch-target);
    }

    .next-btn {
      background: var(--color-primary);
      color: #fff;
      margin-left: auto;
      transition: background-color 0.15s;

      &:hover:not(:disabled) {
        background: var(--color-primary-dark);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .back-btn {
      background: var(--color-border-light);
      color: var(--color-text-secondary);

      &:hover {
        background: var(--color-border);
      }
    }
  `,
})
export class OnboardingDialogComponent {
  private readonly profileService = inject(UserProfileService);
  private readonly skillLevelService = inject(SkillLevelService);
  private readonly readingAgeService = inject(ReadingAgeService);

  readonly dismissed = output<void>();

  protected readonly step = signal(1);
  protected readonly selectedRole = signal<UserRole | null>(null);
  protected readonly selectedReadingAge = signal<ReadingAge | null>(null);
  protected readonly selectedLevel = signal<SkillLevel | null>(null);
  protected readonly levels = SKILL_LEVELS;
  protected readonly ages: ReadingAge[] = ['7-8', '9-10', '11-12', '13+'];

  protected readonly isSkater = computed(() => this.selectedRole() === 'skater');

  protected readonly roles = [
    { value: 'skater' as const, label: 'Skater', icon: '\u{1F6FC}' },
    { value: 'coach' as const, label: 'Coach', icon: '\u{1F4CB}' },
    { value: 'parent' as const, label: 'Parent / Guardian', icon: '\u{1F46A}' },
  ];

  protected advanceFromRole(): void {
    if (this.selectedRole() === 'skater') {
      this.step.set(2);
    } else {
      this.step.set(3);
    }
  }

  protected goBackFromLevel(): void {
    if (this.selectedRole() === 'skater') {
      this.step.set(2);
    } else {
      this.step.set(1);
    }
  }

  protected complete(): void {
    const role = this.selectedRole();
    const level = this.selectedLevel();
    if (!role || !level) return;

    const readingAge = this.selectedReadingAge();
    if (role === 'skater' && readingAge) {
      this.readingAgeService.setReadingAge(readingAge);
      this.profileService.save({ role, level, readingAge });
    } else {
      this.profileService.save({ role, level });
    }

    this.skillLevelService.setLevel(level);
    this.dismissed.emit();
  }
}
