import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../../../services/user-profile.service';
import { IconComponent } from '../icon/icon.component';
import { JerseyNumberComponent } from '../jersey-number/jersey-number.component';

@Component({
  selector: 'app-junior-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, JerseyNumberComponent],
  template: `
    <div class="backdrop" (click)="closed.emit()" aria-hidden="true"></div>
    <aside class="drawer" role="dialog" aria-labelledby="switcher-title">
      <header class="head">
        <div class="head-text">
          <div class="kicker">Switch skater</div>
          <h2 id="switcher-title">Who's using the app?</h2>
        </div>
        <button type="button" class="icon-btn" (click)="closed.emit()" aria-label="Close">
          <app-icon name="close" [size]="18" [strokeWidth]="2.4" />
        </button>
      </header>

      <div class="body">
        @for (j of juniors(); track j.skateName; let i = $index) {
          @let active = i === activeIndex();
          <button
            type="button"
            class="row"
            [class.active]="active"
            (click)="pick(i)"
            [attr.aria-current]="active ? 'true' : null"
          >
            <app-jersey-number
              [n]="j.number || '00'"
              [size]="46"
              [background]="colorForIndex(i)"
              borderColor="var(--color-text)"
            />
            <span class="row-text">
              <span class="row-name">{{ j.skateName }}</span>
              <span class="row-meta">{{ j.level }} &middot; {{ j.team || 'Unassigned' }}</span>
            </span>
            @if (active) {
              <app-icon name="check" [size]="16" [strokeWidth]="2.6" />
            }
          </button>
        }
      </div>

      <footer class="foot">
        <button
          type="button"
          class="home-btn"
          [class.on]="onCustodian()"
          (click)="goToCustodian()"
        >
          <app-icon name="home" [size]="16" [strokeWidth]="2.4" />
          Parent dashboard
        </button>
      </footer>
    </aside>
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 200;
      display: block;
    }

    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(10, 11, 20, 0.4);
    }

    .drawer {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(380px, 92vw);
      background: var(--color-surface);
      border-left: var(--stroke) solid var(--color-border-strong);
      box-shadow: -12px 0 32px rgba(11, 16, 38, 0.2);
      display: flex;
      flex-direction: column;
    }

    .head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-sm);
      padding: 18px 20px;
      background: var(--color-text);
      color: var(--color-surface);
      border-bottom: var(--stroke) solid var(--color-border-strong);
    }

    .kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-accent);
    }

    .head h2 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.375rem;
      letter-spacing: -0.015em;
      margin: 2px 0 0;
      color: var(--color-surface);
    }

    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: transparent;
      color: var(--color-surface);
      border: none;
      border-radius: var(--radius-sm);

      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }
    }

    .body {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 12px 14px;
      min-height: 64px;
      text-align: left;
      background: var(--color-surface);
      color: var(--color-text);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      cursor: pointer;
      transition: transform 0.08s, box-shadow 0.08s;

      &:hover {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
      }

      &.active {
        background: var(--color-text);
        color: var(--color-surface);
      }
    }

    .row-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .row-name {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.9375rem;
      letter-spacing: -0.005em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .row-meta {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .row.active .row-meta {
      color: var(--color-accent);
    }

    .foot {
      padding: 14px 16px;
      background: var(--color-surface-alt);
      border-top: var(--stroke) solid var(--color-border-strong);
    }

    .home-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      min-height: 44px;
      padding: 10px 14px;
      background: var(--color-surface);
      color: var(--color-text);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-hard);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.8125rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      cursor: pointer;

      &:hover:not(.on) {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
      }

      &.on {
        background: var(--color-text);
        color: var(--color-accent);
        box-shadow: none;
      }
    }
  `,
})
export class JuniorSwitcherComponent {
  private readonly profileService = inject(UserProfileService);
  private readonly router = inject(Router);

  readonly closed = output<void>();

  protected readonly juniors = this.profileService.juniors;

  protected readonly activeIndex = computed(
    () => this.profileService.profile()?.activeJuniorIndex ?? 0,
  );

  protected readonly onCustodian = computed(() => {
    const url = this.router.url.split('?')[0].split('#')[0];
    return url === '/custodian' || url === '/';
  });

  protected colorForIndex(i: number): string {
    return i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)';
  }

  protected pick(index: number): void {
    this.profileService.setActiveJunior(index);
    this.profileService.enterJuniorView();
    this.closed.emit();
    this.router.navigate(['/']);
  }

  protected goToCustodian(): void {
    this.profileService.exitJuniorView();
    this.closed.emit();
    this.router.navigate(['/custodian']);
  }
}
