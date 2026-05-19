import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service';
import { SkillLevelService } from '../../services/skill-level.service';
import { ReadingAgeService } from '../../services/reading-age.service';
import { ProgressService } from '../../services/progress.service';
import { JerseyNumberComponent } from '../../shared/components/jersey-number/jersey-number.component';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { TrackOvalComponent } from '../../shared/components/track-oval/track-oval.component';
import { RemoteConfigService } from '../../services/remote-config.service';
import { ContentLoaderService } from '../../services/content-loader.service';
import { RulesetService } from '../../services/ruleset.service';
import { BRANDING } from '../../config/branding';
import { ReadingAge } from '../../models/reading-age';
import { SkillLevel } from '../../models/skill-level';

interface LevelChoice {
  value: SkillLevel;
  label: string;
}

interface StatTile {
  icon: IconName;
  label: string;
  value: () => number;
  total: number;
}

@Component({
  selector: 'app-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, JerseyNumberComponent, IconComponent, TrackOvalComponent],
  template: `
    <div class="profile">
      <!-- Page head -->
      <header class="page-head">
        <div class="kicker">Your skater card</div>
        <h1>Profile</h1>
        <p class="subtitle">
          Your skate name, number, and team. Keep it accurate — your dashboard uses this info.
        </p>
      </header>

      <!-- Skater card -->
      <article class="skater-card">
        <!-- Hero banner -->
        <section class="hero">
          <app-track-oval style="color: var(--color-accent); opacity: 0.35;" />
          <div class="hero-body">
            <app-jersey-number
              [n]="number()"
              [size]="92"
              background="var(--color-primary)"
              borderColor="var(--color-surface)"
            />
            <div class="hero-info">
              <div class="hero-kicker">Skate name</div>
              <h2 class="hero-name">{{ skateName() || 'Skater' }}</h2>
              <div class="chip-row">
                <span class="chip chip-accent" style="transform: rotate(-2deg);">
                  {{ roleChipLabel() }}
                </span>
                @if (team()) {
                  <span class="chip chip-outline" style="transform: rotate(2deg);">
                    {{ team() }}
                  </span>
                }
              </div>
            </div>
          </div>
        </section>

        <!-- Details region -->
        <section class="details">
          <div class="details-head">
            <h3>Details</h3>
            @if (!editing()) {
              <button type="button" class="btn btn-ghost" (click)="startEditing()">
                <app-icon name="pencil" [size]="16" [strokeWidth]="2.2" />
                Edit
              </button>
            } @else {
              <div class="btn-row">
                <button type="button" class="btn btn-ghost" (click)="cancel()">Cancel</button>
                <button type="button" class="btn btn-primary" (click)="save()">
                  <app-icon name="check" [size]="16" [strokeWidth]="2.4" />
                  Save
                </button>
              </div>
            }
          </div>

          <form
            class="field-grid"
            (ngSubmit)="save()"
            (keydown.enter)="$event.preventDefault()"
          >
            <label class="field">
              <span class="field-label">Skate name</span>
              @if (editing()) {
                <input
                  type="text"
                  [(ngModel)]="skateNameDraft"
                  name="skateName"
                  maxlength="40"
                  autocomplete="off"
                />
              } @else {
                <span class="field-readonly">{{ skateName() || '—' }}</span>
              }
            </label>

            <label class="field">
              <span class="field-label">Skater number</span>
              @if (editing()) {
                <input
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  class="mono"
                  [(ngModel)]="numberDraft"
                  name="number"
                  maxlength="4"
                  (input)="clampNumber($event)"
                  autocomplete="off"
                />
              } @else {
                <span class="field-readonly mono">{{ number() || '—' }}</span>
              }
            </label>

            <label class="field">
              <span class="field-label">Age</span>
              @if (editing()) {
                <input
                  type="number"
                  class="mono"
                  [(ngModel)]="ageDraft"
                  name="age"
                  min="4"
                  max="99"
                  maxlength="2"
                  autocomplete="off"
                />
              } @else {
                <span class="field-readonly mono">{{ age() || '—' }}</span>
              }
            </label>

            <label class="field">
              <span class="field-label">Team name</span>
              @if (editing()) {
                <input
                  type="text"
                  [(ngModel)]="teamDraft"
                  name="team"
                  maxlength="60"
                  autocomplete="off"
                />
              } @else {
                <span class="field-readonly">{{ team() || '—' }}</span>
              }
            </label>
          </form>

          @if (rulesetPickerEnabled()) {
            <div class="junior-block">
              <div class="junior-group">
                <div class="group-label">
                  <span class="group-label-primary">Ruleset</span>
                  <span class="group-label-sub">which rules you're learning</span>
                </div>
                <div class="seg-row" role="radiogroup" aria-label="Ruleset">
                  @for (r of availableRulesets(); track r.id) {
                    <button
                      type="button"
                      role="radio"
                      class="seg"
                      [class.on]="rulesetDraft() === r.id"
                      [attr.aria-checked]="rulesetDraft() === r.id"
                      [disabled]="!editing()"
                      (click)="rulesetDraft.set(r.id)"
                    >
                      {{ r.name }}
                    </button>
                  }
                </div>
              </div>
            </div>
          }

          @if (isJuniorDraft()) {
            <div class="junior-block">
              <div class="junior-group">
                <div class="group-label">
                  <span class="group-label-primary">Skill level</span>
                  <span class="group-label-sub">tailors rules to your level</span>
                </div>
                <div class="seg-row" role="radiogroup" aria-label="Skill level">
                  @for (choice of levelChoices; track choice.value) {
                    <button
                      type="button"
                      role="radio"
                      class="seg"
                      [class.on]="levelDraft() === choice.value"
                      [attr.aria-checked]="levelDraft() === choice.value"
                      [disabled]="!editing()"
                      (click)="levelDraft.set(choice.value)"
                    >
                      {{ choice.label }}
                    </button>
                  }
                </div>
              </div>

              <div class="junior-group">
                <div class="group-label">
                  <span class="group-label-primary">Reading age</span>
                  <span class="group-label-sub">adjusts rule language</span>
                </div>
                <div class="seg-row" role="radiogroup" aria-label="Reading age">
                  @for (age of readingAges; track age) {
                    <button
                      type="button"
                      role="radio"
                      class="seg"
                      [class.on]="readingAgeDraft() === age"
                      [attr.aria-checked]="readingAgeDraft() === age"
                      [disabled]="!editing()"
                      (click)="readingAgeDraft.set(age)"
                    >
                      {{ age }}
                    </button>
                  }
                </div>
              </div>
            </div>
          }
        </section>
      </article>

      <!-- Progress strip -->
      <section class="progress-strip" aria-label="Your learning progress">
        <div class="kicker">Your learning</div>
        <h2>Progress</h2>
        <div class="stat-grid">
          @for (tile of stats; track tile.label) {
            <div class="stat-tile">
              <div class="stat-top">
                <app-icon [name]="tile.icon" [size]="20" [strokeWidth]="2.2" />
                <span class="stat-total">/{{ tile.total }}</span>
              </div>
              <div class="stat-value">{{ tile.value() }}</div>
              <div class="stat-label">{{ tile.label }}</div>
              <div class="ticker" aria-hidden="true">
                <div class="ticker-fill" [style.width.%]="pct(tile.value(), tile.total)"></div>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: `
    .profile {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    /* Page head */
    .page-head {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .page-head h1 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 2rem;
      letter-spacing: -0.02em;
      margin: 0;
    }

    .subtitle {
      color: var(--color-text-secondary);
      margin: 0;
      line-height: 1.5;
    }

    /* Skater card (wraps hero + details) */
    .skater-card {
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      overflow: hidden;
    }

    /* Hero banner */
    .hero {
      position: relative;
      overflow: hidden;
      background: var(--color-text);
      color: var(--color-surface);
      padding: 28px 24px;
    }

    .hero-body {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--space-lg);
      flex-wrap: wrap;
    }

    .hero-info {
      flex: 1;
      min-width: 200px;
    }

    .hero-kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-accent);
    }

    .hero-name {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(1.6rem, 5vw, 1.9rem);
      letter-spacing: -0.02em;
      line-height: 1.05;
      color: var(--color-surface);
      margin: 2px 0 0;
    }

    .chip-row {
      margin-top: var(--space-sm);
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }

    .chip {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: var(--radius-chip);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.6875rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      border: var(--stroke) solid var(--color-accent);
      white-space: nowrap;
    }

    .chip-accent {
      background: var(--color-accent);
      color: var(--color-accent-ink);
    }

    .chip-outline {
      background: transparent;
      color: var(--color-accent);
    }

    /* Details region */
    .details {
      padding: var(--space-lg);
    }

    .details-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-md);
      gap: var(--space-sm);
      flex-wrap: wrap;
    }

    .details-head h3 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.125rem;
      margin: 0;
      letter-spacing: -0.01em;
    }

    .btn-row {
      display: flex;
      gap: var(--space-xs);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.75rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      min-height: 40px;
      cursor: pointer;
      transition: transform 0.08s, box-shadow 0.08s;
    }

    .btn-primary {
      background: var(--color-primary);
      color: #fff;
      box-shadow: var(--shadow-hard);

      &:hover:not(:disabled) {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
      }
    }

    .btn-ghost {
      background: var(--color-surface);
      color: var(--color-text);

      &:hover:not(:disabled) {
        background: var(--color-surface-alt);
      }
    }

    /* Field grid */
    .field-grid {
      display: grid;
      gap: var(--space-md);
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .field-label {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .field input,
    .field-readonly {
      padding: 10px 14px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      font-family: var(--font-body);
      font-size: 0.9375rem;
      color: var(--color-text);
      min-height: 44px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }

    .field input {
      background: var(--color-surface);
      box-shadow: inset 0 2px 0 var(--color-surface-alt);
      width: 100%;
      outline: none;

      &:focus-visible {
        outline: 3px solid var(--color-accent);
        outline-offset: 2px;
      }
    }

    .field-readonly {
      background: var(--color-surface-alt);
      border-color: var(--color-border);
      color: var(--color-text);
      user-select: text;
    }

    .mono {
      font-family: var(--font-mono);
      letter-spacing: 0.04em;
    }

    /* Junior block */
    .junior-block {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      margin-top: var(--space-md);
      padding-top: var(--space-md);
      border-top: 2px dashed var(--color-border);
    }

    .junior-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .group-label {
      display: flex;
      align-items: baseline;
      gap: 8px;
      flex-wrap: wrap;
    }

    .group-label-primary {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--color-text);
    }

    .group-label-sub {
      font-size: 0.8125rem;
      color: var(--color-text-muted);
    }

    .seg-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
      gap: 8px;
    }

    .seg {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 12px;
      min-height: 40px;
      background: var(--color-surface);
      color: var(--color-text);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.75rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      cursor: pointer;
      transition: transform 0.08s, box-shadow 0.08s;

      &.on {
        background: var(--color-primary);
        color: #fff;
        box-shadow: var(--shadow-hard);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    /* Progress strip */
    .progress-strip {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .progress-strip h2 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.375rem;
      letter-spacing: -0.01em;
      margin: 0 0 var(--space-md);
    }

    .stat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: var(--space-sm);
    }

    .stat-tile {
      padding: var(--space-md);
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
    }

    .stat-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--color-text-muted);
    }

    .stat-total {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
    }

    .stat-value {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 2.25rem;
      color: var(--color-primary);
      line-height: 1;
      margin: 6px 0 2px;
    }

    .stat-label {
      font-family: var(--font-display);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--color-text-secondary);
    }

    .ticker {
      margin-top: 10px;
      height: 10px;
      background: var(--color-surface-alt);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: 999px;
      overflow: hidden;
    }

    .ticker-fill {
      height: 100%;
      background: var(--color-primary);
      background-image: repeating-linear-gradient(
        -45deg,
        rgba(0, 0, 0, 0) 0 6px,
        rgba(0, 0, 0, 0.18) 6px 10px
      );
      transition: width 0.3s ease;
    }
  `,
})
export class ProfileComponent {
  private readonly profileService = inject(UserProfileService);
  private readonly skillLevelService = inject(SkillLevelService);
  private readonly readingAgeService = inject(ReadingAgeService);
  private readonly progressService = inject(ProgressService);
  private readonly remoteConfig = inject(RemoteConfigService);
  private readonly contentLoader = inject(ContentLoaderService);
  private readonly rulesetService = inject(RulesetService);

  protected readonly multiRulesetEnabled = this.remoteConfig.flag('multiRuleset');
  protected readonly availableRulesets = this.contentLoader.availableRulesets;
  protected readonly rulesetPickerEnabled = computed(
    () => this.multiRulesetEnabled() && this.availableRulesets().length > 1,
  );

  protected readonly levelChoices: LevelChoice[] = [
    { value: 'L1', label: 'L1 · New skater' },
    { value: 'L2', label: 'L2 · Intermediate' },
    { value: 'L3', label: 'L3 · Advanced' },
  ];
  protected readonly readingAges: ReadingAge[] = ['7-8', '9-10', '11-12', '13+'];

  protected readonly editing = signal(false);

  protected readonly skateNameDraft = signal('');
  protected readonly numberDraft = signal('');
  protected readonly ageDraft = signal('');
  protected readonly teamDraft = signal('');
  protected readonly levelDraft = signal<SkillLevel>('L1');
  protected readonly readingAgeDraft = signal<ReadingAge>('13+');
  protected readonly rulesetDraft = signal<string>(BRANDING.defaultRulesetId);

  protected readonly skateName = computed(() => this.profileService.profile()?.skateName ?? '');
  protected readonly number = computed(() => this.profileService.profile()?.number ?? '00');
  protected readonly age = computed(() => this.profileService.profile()?.age ?? '');
  protected readonly team = computed(() => this.profileService.profile()?.team ?? '');

  protected readonly isJuniorDraft = computed(() => {
    const n = parseInt(this.ageDraft() || this.age(), 10);
    return Number.isFinite(n) && n < 18;
  });

  protected readonly roleChipLabel = computed(() => {
    const role = this.profileService.derivedRole();
    const ageStr = this.age();
    const ageSuffix = ageStr ? ` · age ${ageStr}` : '';
    return (role === 'adult' ? 'Adult' : 'Junior') + ageSuffix;
  });

  protected readonly stats: StatTile[] = [
    {
      icon: 'book',
      label: 'Rules read',
      value: () => this.progressService.readRuleCount(),
      total: 24,
    },
    {
      icon: 'check',
      label: 'Mastered',
      value: () => this.progressService.masteredTermCount(),
      total: 16,
    },
    {
      icon: 'clipboard',
      label: 'Cases solved',
      value: () => this.progressService.completedScenarioCount(),
      total: 3,
    },
  ];

  constructor() {
    this.resetDrafts();
  }

  protected startEditing(): void {
    this.resetDrafts();
    this.editing.set(true);
  }

  protected cancel(): void {
    this.resetDrafts();
    this.editing.set(false);
  }

  protected save(): void {
    const current = this.profileService.getOrDefault();
    const nextLevel = this.levelDraft();
    const nextReadingAge = this.readingAgeDraft();
    const pickRuleset = this.rulesetPickerEnabled();

    this.profileService.save({
      ...current,
      skateName: this.skateNameDraft().trim() || current.skateName,
      number: this.numberDraft().replace(/\D/g, '').slice(0, 4),
      age: this.ageDraft(),
      team: this.teamDraft().trim(),
      level: nextLevel,
      readingAge: nextReadingAge,
      ...(pickRuleset ? { rulesetId: this.rulesetDraft() } : {}),
    });

    this.skillLevelService.setLevel(nextLevel);
    this.readingAgeService.setReadingAge(nextReadingAge);
    if (pickRuleset) this.rulesetService.setRuleset(this.rulesetDraft());
    this.editing.set(false);
  }

  protected clampNumber(event: Event): void {
    const target = event.target as HTMLInputElement;
    const cleaned = target.value.replace(/\D/g, '').slice(0, 4);
    if (cleaned !== target.value) target.value = cleaned;
    this.numberDraft.set(cleaned);
  }

  protected pct(v: number, total: number): number {
    if (!total) return 0;
    return Math.min(100, Math.round((v / total) * 100));
  }

  private resetDrafts(): void {
    const p = this.profileService.getOrDefault();
    this.skateNameDraft.set(p.skateName ?? '');
    this.numberDraft.set(p.number ?? '');
    this.ageDraft.set(p.age ?? '');
    this.teamDraft.set(p.team ?? '');
    this.levelDraft.set(p.level);
    this.readingAgeDraft.set(p.readingAge ?? '13+');
    this.rulesetDraft.set(this.rulesetService.selectedRulesetId());
  }
}
