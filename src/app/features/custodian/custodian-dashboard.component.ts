import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../../services/user-profile.service';
import { JuniorProfile } from '../../models/user-profile';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { TrackOvalComponent } from '../../shared/components/track-oval/track-oval.component';
import { JuniorCardComponent, JuniorSummary } from './junior-card.component';

@Component({
  selector: 'app-custodian-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, TrackOvalComponent, JuniorCardComponent],
  template: `
    <div class="custodian">
      <!-- Hero -->
      <section class="hero">
        <app-track-oval style="color: var(--color-accent); opacity: 0.3;" />
        <div class="hero-body">
          <div class="kicker">Parent &middot; Guardian</div>
          <h1>{{ juniors().length === 1 ? 'Your skater' : 'Your skaters' }}</h1>
          <p class="subtitle">
            Keep tabs on their progress. Tap a card to step into their view, or set up a login so
            they can open the app on their own device.
          </p>
          <div class="chip-row">
            <span class="chip chip-accent" style="transform: rotate(-2deg);">
              {{ juniors().length }}
              junior{{ juniors().length === 1 ? '' : 's' }}
            </span>
            <span class="chip chip-outline" style="transform: rotate(2deg);">
              {{ withLoginCount() }}/{{ juniors().length }} with login
            </span>
          </div>
        </div>
      </section>

      <!-- Roster -->
      <section class="roster" aria-label="Your juniors">
        <div class="section-head">
          <div class="kicker kicker-muted">Your roster</div>
          <h2>Pick a skater</h2>
        </div>

        @if (juniors().length > 0) {
          <div class="grid">
            @for (j of juniors(); track j.skateName; let i = $index) {
              <app-junior-card
                [index]="i"
                [junior]="j"
                [summary]="summaryFor(i, j)"
                (stepInto)="stepInto(i)"
                (remove)="remove(i)"
              />
            }

            <button type="button" class="add-tile" (click)="addJunior()">
              <span class="add-circle" aria-hidden="true">
                <app-icon name="plus" [size]="20" [strokeWidth]="2.4" />
              </span>
              <span class="add-title">Add another skater</span>
              <span class="add-sub">Got more kids in derby? Set them up here.</span>
            </button>
          </div>
        } @else {
          <div class="empty">
            <p>No juniors yet.</p>
            <button type="button" class="pill pill-primary" (click)="addJunior()">
              <app-icon name="plus" [size]="16" [strokeWidth]="2.4" />
              Add a skater
            </button>
          </div>
        }
      </section>

      <!-- Housekeeping strip -->
      <aside class="housekeeping" role="note">
        <app-icon name="shield" [size]="18" [strokeWidth]="2.2" />
        <div class="house-text">
          <strong>Junior accounts stay private.</strong>
          No ads, no tracking. Progress syncs across devices when juniors sign in with their login.
        </div>
      </aside>
    </div>
  `,
  styles: `
    .custodian {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    /* Hero */
    .hero {
      position: relative;
      overflow: hidden;
      background: var(--color-text);
      color: var(--color-surface);
      padding: 26px 22px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
    }

    .hero-body {
      position: relative;
    }

    .kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--color-accent);
    }

    .kicker-muted {
      color: var(--color-text-muted);
    }

    .hero h1 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(1.75rem, 5vw, 2.25rem);
      letter-spacing: -0.02em;
      line-height: 1;
      color: var(--color-surface);
      margin: 4px 0 8px;
    }

    .subtitle {
      font-family: var(--font-body);
      font-size: 0.9375rem;
      line-height: 1.5;
      margin: 0;
      color: var(--color-surface);
      opacity: 0.88;
      max-width: 48ch;
    }

    .chip-row {
      margin-top: var(--space-md);
      display: flex;
      gap: var(--space-xs);
      flex-wrap: wrap;
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

    /* Roster */
    .section-head {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      margin-bottom: var(--space-md);
    }

    .section-head h2 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.375rem;
      letter-spacing: -0.01em;
      margin: 0;
    }

    .grid {
      display: grid;
      gap: var(--space-md);
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .add-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 32px 20px;
      min-height: 200px;
      background: transparent;
      color: var(--color-text);
      border: 2px dashed var(--color-border-strong);
      border-radius: var(--radius-card);
      cursor: pointer;
      text-align: center;
      font-family: inherit;

      &:hover {
        background: var(--color-surface-alt);
      }
    }

    .add-circle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: 50%;
      color: var(--color-text);
      margin-bottom: 6px;
    }

    .add-title {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1rem;
      letter-spacing: -0.01em;
      color: var(--color-text);
    }

    .add-sub {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      color: var(--color-text-muted);
      max-width: 24ch;
    }

    .empty {
      padding: 32px;
      background: var(--color-surface);
      border: 2px dashed var(--color-border);
      border-radius: var(--radius-card);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 18px;
      min-height: 44px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.8125rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      box-shadow: var(--shadow-hard);
      cursor: pointer;
    }

    .pill-primary {
      background: var(--color-primary);
      color: #fff;
    }

    /* Housekeeping */
    .housekeeping {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      background: var(--color-surface-alt);
      border: var(--stroke) dashed var(--color-border);
      border-radius: var(--radius-sm);
      color: var(--color-text-muted);
    }

    .house-text {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      line-height: 1.5;
      color: var(--color-text);

      strong {
        font-family: var(--font-display);
        font-weight: 800;
        margin-right: 4px;
      }
    }
  `,
})
export class CustodianDashboardComponent implements OnInit {
  private readonly profileService = inject(UserProfileService);
  private readonly router = inject(Router);

  protected readonly juniors = this.profileService.juniors;

  protected readonly withLoginCount = computed(
    () => this.juniors().filter((j) => !!j.login).length,
  );

  ngOnInit(): void {
    // Returning to the parent home always resets the junior-view flag so the
    // `/` route is owned by the custodian again until the parent steps in.
    this.profileService.exitJuniorView();
  }

  protected stepInto(index: number): void {
    this.profileService.setActiveJunior(index);
    this.profileService.enterJuniorView();
    this.router.navigate(['/']);
  }

  protected remove(index: number): void {
    this.profileService.removeJunior(index);
  }

  protected addJunior(): void {
    alert("To add another junior today, reset onboarding and go through the parent flow. We're wiring this to a sheet soon.");
  }

  protected summaryFor(index: number, junior: JuniorProfile): JuniorSummary {
    // Deterministic mock summary derived from the junior's identity so the
    // numbers are stable across renders. Replace with a real backend hook
    // when the per-junior progress endpoint lands.
    const seed = this.hashString(`${junior.skateName}|${junior.number ?? ''}|${index}`);
    const rand = (offset: number, span: number) =>
      ((seed >>> offset) & 0xffff) % span;
    const rulesTotal = 24;
    const termsTotal = 16;
    return {
      rulesRead: rand(0, rulesTotal + 1),
      rulesTotal,
      termsMastered: rand(4, termsTotal + 1),
      termsTotal,
      quizBest: 55 + rand(8, 45),
      casesDone: rand(12, 4),
      casesTotal: 3,
      streakDays: rand(16, 9),
      lastActiveDays: rand(20, 6),
    };
  }

  private hashString(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h * 31 + s.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  }
}
