import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { UserProfileService } from '../../../services/user-profile.service';
import { IconComponent, IconName } from '../icon/icon.component';
import { LogoMarkComponent } from '../logo-mark/logo-mark.component';
import { JuniorSwitcherComponent } from '../junior-switcher/junior-switcher.component';

interface NavItem {
  path: string;
  label: string;
  icon: IconName;
}

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, IconComponent, LogoMarkComponent, JuniorSwitcherComponent],
  template: `
    @if (showParentBanner()) {
      <div class="parent-banner" role="status">
        <span class="banner-left">
          <app-icon name="user" [size]="14" [strokeWidth]="2.2" />
          <span>Parent mode &middot; viewing {{ activeSkateName() }}</span>
        </span>
        <button type="button" class="banner-link" (click)="goToCustodian()">
          Back to parent dashboard
        </button>
      </div>
    }

    <header class="header">
      <div class="header-inner">
        <a [routerLink]="homeRoute()" class="logo" aria-label="Derby Rules home">
          <app-logo-mark [size]="38" primary="var(--color-text)" accent="var(--color-primary)" />
          <span class="logo-text">
            <span class="wordmark">DERBY RULES</span>
            <span class="tagline">for every skater</span>
          </span>
        </a>

        <nav class="desktop-nav" aria-label="Main navigation">
          @for (item of navItems(); track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: item.path === '/' || item.path === '/custodian' }"
              class="nav-link"
            >
              <app-icon [name]="item.icon" [size]="16" [strokeWidth]="2.2" />
              {{ item.label }}
            </a>
          }
        </nav>

        @if (isParent()) {
          <button
            type="button"
            class="profile-btn"
            (click)="openSwitcher()"
            [class.active]="switcherOpen()"
          >
            <app-icon name="users" [size]="18" [strokeWidth]="2.2" />
            <span class="profile-text">
              <span class="profile-name parent-name">{{ parentLabel() }}</span>
              <span class="profile-role">
                {{ parentSubLabel() }}
                <app-icon name="chev-down" [size]="10" [strokeWidth]="2.4" />
              </span>
            </span>
          </button>
        } @else {
          <button
            type="button"
            class="profile-btn"
            (click)="goToProfile()"
            [class.active]="isOnProfile()"
          >
            <app-icon name="user" [size]="18" [strokeWidth]="2.2" />
            <span class="profile-text">
              <span class="profile-name">{{ skateName() }}</span>
              <span class="profile-role">{{ roleLabel() }}</span>
            </span>
          </button>
        }
      </div>
    </header>

    <nav class="mobile-nav" aria-label="Main navigation">
      @for (item of navItems(); track item.path) {
        <a
          [routerLink]="item.path"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: item.path === '/' || item.path === '/custodian' }"
          class="mobile-nav-link"
        >
          <app-icon [name]="item.icon" [size]="22" [strokeWidth]="2.2" />
          <span class="nav-label">{{ item.label }}</span>
        </a>
      }
    </nav>

    @if (switcherOpen()) {
      <app-junior-switcher (closed)="switcherOpen.set(false)" />
    }
  `,
  styles: `
    /* Parent banner */
    .parent-banner {
      position: sticky;
      top: 0;
      z-index: 101;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-md);
      padding: 6px 20px;
      background: var(--color-primary);
      color: #fff;
    }

    .banner-left {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.625rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }

    .banner-link {
      background: transparent;
      border: none;
      color: #fff;
      text-decoration: underline;
      font-family: var(--font-mono);
      font-size: 0.625rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      padding: 2px 4px;
    }

    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--color-surface);
      border-bottom: var(--stroke) solid var(--color-border-strong);
      box-shadow: var(--shadow-md);
    }

    .header-inner {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: var(--space-lg);
      max-width: var(--max-width);
      margin: 0 auto;
      padding: var(--space-sm) var(--space-md);
      min-height: var(--header-height);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      color: var(--color-text);
      text-decoration: none;

      &:hover {
        text-decoration: none;
      }
    }

    .logo-text {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }

    .wordmark {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.15rem;
      letter-spacing: -0.01em;
    }

    .tagline {
      font-family: var(--font-mono);
      font-size: 0.625rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      margin-top: 4px;
    }

    .desktop-nav {
      display: none;
      align-items: center;
      gap: var(--space-xs);
      justify-self: center;

      @media (min-width: 768px) {
        display: flex;
      }
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--radius-sm);
      font-family: var(--font-display);
      font-weight: 600;
      font-size: 0.8125rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: background-color 0.15s, color 0.15s;

      &:hover {
        background: var(--color-surface-alt);
        color: var(--color-text);
        text-decoration: none;
      }

      &.active {
        background: var(--color-text);
        color: var(--color-surface);
      }
    }

    .profile-btn {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: 6px 14px;
      min-height: 44px;
      background: var(--color-surface);
      color: var(--color-text);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-hard);
      font-family: var(--font-display);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      transition: transform 0.08s, box-shadow 0.08s;
      cursor: pointer;

      &:hover {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
      }

      &.active {
        background: var(--color-text);
        color: var(--color-surface);
        box-shadow: none;
      }

      &.active app-icon {
        color: var(--color-accent);
      }
    }

    .profile-text {
      display: none;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1;

      @media (min-width: 480px) {
        display: flex;
      }
    }

    .profile-name {
      font-size: 0.75rem;
      letter-spacing: 0.02em;
    }

    .parent-name {
      max-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .profile-role {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      font-family: var(--font-mono);
      font-weight: 500;
      font-size: 0.5625rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      margin-top: 2px;
    }

    .profile-btn.active .profile-role {
      color: var(--color-accent);
    }

    .mobile-nav {
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: var(--color-surface);
      border-top: var(--stroke) solid var(--color-border-strong);
      box-shadow: 0 -4px 18px rgba(11, 16, 38, 0.08);

      @media (min-width: 768px) {
        display: none;
      }
    }

    .mobile-nav-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-height: var(--nav-height-mobile);
      padding: var(--space-xs);
      gap: 2px;
      font-family: var(--font-display);
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      text-decoration: none;
      transition: color 0.15s;

      &:hover {
        text-decoration: none;
      }

      &.active {
        color: var(--color-primary);
      }
    }
  `,
})
export class HeaderComponent {
  private readonly profileService = inject(UserProfileService);
  private readonly router = inject(Router);

  protected readonly switcherOpen = signal(false);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects.split('?')[0].split('#')[0]),
    ),
    { initialValue: this.router.url.split('?')[0].split('#')[0] },
  );

  protected readonly isParent = computed(
    () => this.profileService.profile()?.accountType === 'parent',
  );

  protected readonly homeRoute = computed(() => (this.isParent() ? '/custodian' : '/'));

  /** URL-level check used for nav-link active states. */
  protected readonly isOnDashboard = computed(() => {
    const u = this.currentUrl();
    return u === '/' || u === '/custodian';
  });

  /**
   * Whether the current view is the custodian component (not just the URL).
   * Parents at `/` without having stepped in still see the custodian, so
   * the banner must account for that.
   */
  private readonly isOnCustodianComponent = computed(() => {
    const u = this.currentUrl();
    if (u === '/custodian') return true;
    return u === '/' && !this.profileService.inJuniorView();
  });

  protected readonly showParentBanner = computed(
    () => this.isParent() && !this.isOnCustodianComponent(),
  );

  protected readonly navItems = computed<NavItem[]>(() => {
    const base: NavItem[] = [
      { path: this.homeRoute(), label: 'Home', icon: 'home' },
      { path: '/rules', label: 'Rules', icon: 'book' },
      { path: '/glossary', label: 'Glossary', icon: 'search' },
      { path: '/quizzes', label: 'Quizzes', icon: 'question' },
      { path: '/casebook', label: 'Casebook', icon: 'clipboard' },
      { path: '/support', label: 'Support', icon: 'support' },
    ];
    return base;
  });

  protected readonly skateName = computed(
    () => this.profileService.profile()?.skateName ?? 'Profile',
  );

  protected readonly roleLabel = computed(() => {
    const p = this.profileService.profile();
    if (this.profileService.derivedRole() === 'adult') return 'Adult';
    return p?.level ? `Junior · ${p.level}` : 'Junior';
  });

  protected readonly isOnProfile = computed(() => this.currentUrl().startsWith('/profile'));

  protected readonly activeSkateName = computed(
    () => this.profileService.profile()?.skateName ?? 'skater',
  );

  protected readonly parentLabel = computed(() => {
    if (this.isOnCustodianComponent()) return 'Parent';
    return this.profileService.profile()?.skateName ?? 'Parent';
  });

  protected readonly parentSubLabel = computed(() => {
    if (this.isOnCustodianComponent()) {
      const n = this.profileService.juniors().length;
      return `${n} skater${n === 1 ? '' : 's'}`;
    }
    return 'Switch';
  });

  protected goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  protected goToCustodian(): void {
    this.profileService.exitJuniorView();
    this.router.navigate(['/custodian']);
  }

  protected openSwitcher(): void {
    this.switcherOpen.set(true);
  }
}
