import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { UserProfileService } from '../../services/user-profile.service';
import { SkillLevelService } from '../../services/skill-level.service';
import { DailyJamService } from '../../services/daily-jam.service';
import { BadgesService } from '../../services/badges.service';
import { RemoteConfigService } from '../../services/remote-config.service';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { JerseyNumberComponent } from '../../shared/components/jersey-number/jersey-number.component';
import { SkillLevel } from '../../models/skill-level';

interface StatTile {
  icon: IconName;
  label: string;
  value: () => number;
  total: number;
}

interface QuickLink {
  path: string;
  label: string;
  description: string;
  icon: IconName;
  number: string;
  color: string;
  isAccent: boolean;
}

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, JerseyNumberComponent],
  template: `
    <div class="dashboard">
      <!-- Hero -->
      <section class="hero">
        <div class="hero-backdrop" aria-hidden="true">
          <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="400" cy="200" rx="350" ry="150" fill="none" stroke="var(--color-accent)" stroke-width="2" stroke-dasharray="6 10" opacity="0.35"/>
            <ellipse cx="400" cy="200" rx="260" ry="90" fill="none" stroke="var(--color-accent)" stroke-width="1.5" stroke-dasharray="4 8" opacity="0.25"/>
            <ellipse cx="400" cy="200" rx="180" ry="50" fill="none" stroke="var(--color-accent)" stroke-width="1" opacity="0.2"/>
          </svg>
        </div>
        <div class="hero-body">
          <app-jersey-number [n]="skaterNumber()" [size]="92" borderColor="var(--color-surface)" />
          <div class="hero-info">
            <div class="kicker">Welcome back</div>
            <h1>{{ skaterName() }}</h1>
            <div class="badges">
              <span class="badge badge-accent">{{ roleLabel() }}</span>
              @if (team()) {
                <span class="badge badge-outline">{{ team() }}</span>
              }
              <span class="badge badge-outline">Streak · 4 days</span>
            </div>
            @if (isJunior()) {
              <div class="level-row">
                <span class="level-label">Skill level</span>
                <div class="seg-row" role="radiogroup" aria-label="Skill level">
                  @for (lvl of levels; track lvl) {
                    <button
                      type="button"
                      role="radio"
                      class="seg"
                      [class.on]="currentLevel() === lvl"
                      [attr.aria-checked]="currentLevel() === lvl"
                      (click)="setLevel(lvl)"
                    >
                      {{ lvl }}
                    </button>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section aria-label="Your progress">
        <div class="section-head">
          <div class="kicker">Your stats</div>
          <h2>Progress tracker</h2>
        </div>
        <div class="stat-grid">
          @for (tile of stats; track tile.label) {
            <div class="stat-card">
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

      <!-- Quick links -->
      <section aria-label="Start learning">
        <div class="section-head">
          <div class="kicker">Start learning</div>
          <h2>Pick your lane</h2>
        </div>
        <div class="link-grid">
          @for (link of quickLinks; track link.path) {
            <a
              [routerLink]="link.path"
              class="link-card"
              [style.--card-color]="link.color"
            >
              <div class="link-top">
                <span class="link-num">{{ link.number }}</span>
                <span class="link-icon" [class.accent-icon]="link.isAccent">
                  <app-icon [name]="link.icon" [size]="20" [strokeWidth]="2.2" />
                </span>
              </div>
              <div class="link-body">
                <h3>{{ link.label }}</h3>
                <p>{{ link.description }}</p>
              </div>
              <div class="link-foot">
                <span>Go</span>
                <app-icon name="arrow-right" [size]="18" [strokeWidth]="2.2" />
              </div>
            </a>
          }
        </div>
      </section>

      <!-- Daily Jam + Badges -->
      <section class="motivation-row" aria-label="Daily jam and badges">
        <article class="card card-primary jam-card">
          <div class="kicker kicker-on-primary">Daily Jam</div>

          @if (dailyJam.answeredToday()) {
            <h3>Great jam! See you tomorrow.</h3>
            <p>
              You got
              <strong>{{ dailyJam.todayResult()?.score }} / {{ dailyJam.todayResult()?.total }}</strong>
              · come back for a fresh question.
            </p>
            <div class="jam-actions">
              <a routerLink="/quizzes" class="pill pill-ink">
                <app-icon name="arrow-right" [size]="16" [strokeWidth]="2.4" />
                Play more quizzes
              </a>
            </div>
          } @else if (dailyJam.todayQuestion(); as q) {
            <h3>{{ q.question }}</h3>
            <p>One question a day · keep the rules sharp.</p>
            <div class="jam-actions">
              <a routerLink="/quizzes/daily" class="pill pill-ink">
                <app-icon name="zap" [size]="16" [strokeWidth]="2.4" />
                Play today's Jam
              </a>
            </div>
          } @else {
            <h3>No jam today</h3>
            <p>Check back soon.</p>
          }
        </article>

        @if (showBadges()) {
          <article class="card badges-card">
            <div class="badges-head">
              <div class="kicker">Badges earned</div>
              <span class="badges-count">
                {{ badgesService.earnedCount() }} / {{ badgesService.all.length }}
              </span>
            </div>
            <div class="badge-row">
              @for (b of badgesService.all; track b.id) {
                @let earned = badgesService.isEarned(b.id);
                <span
                  class="chip"
                  [class.chip-default]="earned && b.tone === 'default'"
                  [class.chip-primary]="earned && b.tone === 'primary'"
                  [class.chip-ink]="earned && b.tone === 'ink'"
                  [class.chip-locked]="!earned"
                  [style.transform]="'rotate(' + b.rotate + 'deg)'"
                  [attr.aria-label]="(earned ? 'Earned: ' : 'Locked: ') + b.label"
                >
                  @if (earned) {
                    <app-icon [name]="b.icon" [size]="14" [strokeWidth]="2.4" />
                  } @else {
                    <span class="chip-lock" aria-hidden="true">?</span>
                  }
                  {{ b.label }}
                </span>
              }
            </div>
          </article>
        }
      </section>
    </div>
  `,
  styles: `
    .dashboard {
      display: flex;
      flex-direction: column;
      gap: var(--space-2xl);
    }

    /* Hero */
    .hero {
      position: relative;
      overflow: hidden;
      background: var(--color-text);
      color: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      padding: var(--space-xl) var(--space-lg);
    }

    .hero-backdrop {
      position: absolute;
      inset: 0;
      pointer-events: none;

      svg {
        width: 100%;
        height: 100%;
      }
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
      min-width: 220px;
    }

    .kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-accent);
      margin-bottom: var(--space-xs);
    }

    .hero h1 {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: clamp(1.75rem, 5vw, 2.25rem);
      letter-spacing: -0.02em;
      line-height: 1;
      margin: 0;
    }

    .badges {
      margin-top: var(--space-md);
      display: flex;
      gap: var(--space-xs);
      flex-wrap: wrap;
    }

    .badge {
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

    .badge-accent {
      background: var(--color-accent);
      color: var(--color-accent-ink);
    }

    .badge-outline {
      background: transparent;
      color: var(--color-accent);
    }

    .level-row {
      margin-top: var(--space-md);
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      flex-wrap: wrap;
    }

    .level-label {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      opacity: 0.85;
    }

    .hero .seg-row {
      display: inline-flex;
      border: var(--stroke) solid var(--color-accent);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }

    .hero .seg {
      padding: 6px 14px;
      min-height: 36px;
      min-width: 44px;
      background: transparent;
      color: var(--color-accent);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.8125rem;
      letter-spacing: 0.04em;

      &.on {
        background: var(--color-accent);
        color: var(--color-accent-ink);
      }
    }

    /* Section head */
    .section-head {
      margin-bottom: var(--space-md);
    }

    .section-head .kicker {
      color: var(--color-text-muted);
    }

    .section-head h2 {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.375rem;
      letter-spacing: -0.01em;
      margin: 0;
      color: var(--color-text);
    }

    /* Stats */
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: var(--space-sm);
    }

    .stat-card {
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
      font-weight: 700;
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
      height: 12px;
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

    /* Quick links */
    .link-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--space-md);
    }

    .link-card {
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow: hidden;
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      color: var(--color-text);
      text-decoration: none;
      transition: transform 0.08s, box-shadow 0.08s;

      &:hover {
        text-decoration: none;
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
      }
    }

    .link-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 16px 18px 0;
    }

    .link-num {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      color: var(--color-text-muted);
    }

    .link-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: var(--card-color, var(--color-primary));
      color: #fff;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
    }

    .link-icon.accent-icon {
      color: var(--color-accent-ink);
    }

    .link-body {
      padding: 8px 18px 18px;
    }

    .link-body h3 {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.25rem;
      letter-spacing: -0.01em;
      margin: 0;
      color: var(--color-text);
    }

    .link-body p {
      font-size: 0.8125rem;
      color: var(--color-text-muted);
      margin: 4px 0 0;
      line-height: 1.45;
    }

    .link-foot {
      margin-top: auto;
      padding: 10px 18px;
      border-top: var(--stroke) solid var(--color-border-strong);
      background: var(--color-surface-alt);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-text);
    }

    /* Daily Jam + Badges row */
    .motivation-row {
      display: grid;
      gap: var(--space-md);
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }

    .card {
      padding: var(--space-lg);
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
    }

    .card-primary {
      background: var(--color-primary);
      color: #fff;
      border-color: var(--color-border-strong);
    }

    .kicker-on-primary {
      color: #fff;
      opacity: 0.9;
      margin-bottom: var(--space-xs);
    }

    .jam-card h3 {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.375rem;
      letter-spacing: -0.01em;
      margin: 6px 0 8px;
      line-height: 1.15;
    }

    .jam-card p {
      margin: 0;
      font-size: 0.875rem;
      opacity: 0.9;
      line-height: 1.5;
    }

    .jam-card strong {
      font-weight: 700;
    }

    .jam-actions {
      margin-top: var(--space-md);
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 16px;
      border-radius: 999px;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.8125rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      border: var(--stroke) solid var(--color-border-strong);
      text-decoration: none;
      box-shadow: var(--shadow-hard);

      &:hover {
        text-decoration: none;
      }
    }

    .pill-ink {
      background: var(--color-text);
      color: var(--color-accent);
    }

    .badges-card {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .badges-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    }

    .badges-count {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      color: var(--color-text-muted);
      letter-spacing: 0.15em;
    }

    .badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding-top: 4px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: var(--radius-chip);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.75rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      border: var(--stroke) solid var(--color-border-strong);
      transform-origin: center;
      white-space: nowrap;
    }

    .chip-default {
      background: var(--color-accent);
      color: var(--color-accent-ink);
    }

    .chip-primary {
      background: var(--color-primary);
      color: #fff;
    }

    .chip-ink {
      background: var(--color-text);
      color: var(--color-accent);
    }

    .chip-locked {
      background: var(--color-surface-alt);
      color: var(--color-text-muted);
      border-color: var(--color-border);
      opacity: 0.55;
    }

    .chip-lock {
      display: inline-block;
      width: 14px;
      text-align: center;
    }
  `,
})
export class DashboardComponent {
  private readonly progress = inject(ProgressService);
  private readonly profileService = inject(UserProfileService);
  private readonly skillLevelService = inject(SkillLevelService);

  protected readonly dailyJam = inject(DailyJamService);
  protected readonly badgesService = inject(BadgesService);
  protected readonly showBadges = inject(RemoteConfigService).flag('badge');

  protected readonly levels: SkillLevel[] = ['L1', 'L2', 'L3'];

  protected readonly skaterName = computed(
    () => this.profileService.profile()?.skateName ?? 'Skater'
  );
  protected readonly skaterNumber = computed(
    () => this.profileService.profile()?.number ?? '00'
  );
  protected readonly team = computed(() => this.profileService.profile()?.team ?? '');
  protected readonly isJunior = computed(() => this.profileService.derivedRole() === 'junior');
  protected readonly currentLevel = computed(() => this.skillLevelService.level());

  protected readonly roleLabel = computed(() => {
    if (this.profileService.derivedRole() === 'adult') return 'Adult Derby';
    return `Junior · ${this.currentLevel()}`;
  });

  protected readonly stats: StatTile[] = [
    { icon: 'book', label: 'Rules read', value: () => this.progress.readRuleCount(), total: 24 },
    { icon: 'search', label: 'Terms seen', value: () => this.progress.viewedTermCount(), total: 16 },
    { icon: 'check', label: 'Mastered', value: () => this.progress.masteredTermCount(), total: 16 },
    { icon: 'clipboard', label: 'Cases solved', value: () => this.progress.completedScenarioCount(), total: 3 },
  ];

  protected readonly quickLinks: QuickLink[] = [
    {
      path: '/rules',
      label: 'Rules Browser',
      description: 'Read the official rules section by section',
      icon: 'book',
      number: '01',
      color: 'var(--color-primary)',
      isAccent: false,
    },
    {
      path: '/glossary',
      label: 'Glossary',
      description: 'Look up derby words · flashcard yourself',
      icon: 'search',
      number: '02',
      color: 'var(--color-accent)',
      isAccent: true,
    },
    {
      path: '/quizzes',
      label: 'Quizzes',
      description: 'Test your knowledge with multiple choice',
      icon: 'question',
      number: '03',
      color: 'var(--color-primary)',
      isAccent: false,
    },
    {
      path: '/casebook',
      label: 'Casebook',
      description: "Real game scenarios — what's the call?",
      icon: 'clipboard',
      number: '04',
      color: 'var(--color-accent)',
      isAccent: true,
    },
  ];

  protected pct(v: number, total: number): number {
    if (!total) return 0;
    return Math.min(100, Math.round((v / total) * 100));
  }

  protected setLevel(level: SkillLevel): void {
    this.skillLevelService.setLevel(level);
    const current = this.profileService.getOrDefault();
    this.profileService.save({ ...current, level });
  }
}
