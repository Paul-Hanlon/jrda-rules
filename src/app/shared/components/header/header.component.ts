import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SkillLevelSelectorComponent } from '../skill-level-selector/skill-level-selector.component';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, SkillLevelSelectorComponent],
  template: `
    <header class="header">
      <div class="header-inner">
        <a routerLink="/" class="logo" aria-label="JRDA Rules Home">
          <span class="logo-icon" aria-hidden="true">&#9733;</span>
          <span class="logo-text">JRDA Rules</span>
        </a>
        <nav class="desktop-nav" aria-label="Main navigation">
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: item.path === '/' }"
              class="nav-link"
            >
              <span class="nav-icon" aria-hidden="true">{{ item.icon }}</span>
              {{ item.label }}
            </a>
          }
        </nav>
        <app-skill-level-selector />
      </div>
    </header>
    <nav class="mobile-nav" aria-label="Main navigation">
      @for (item of navItems; track item.path) {
        <a
          [routerLink]="item.path"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: item.path === '/' }"
          class="mobile-nav-link"
        >
          <span class="nav-icon" aria-hidden="true">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </a>
      }
    </nav>
  `,
  styles: `
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border-light);
      box-shadow: var(--shadow-sm);
    }

    .header-inner {
      display: flex;
      align-items: center;
      gap: var(--space-lg);
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 var(--space-md);
      height: var(--header-height);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: var(--font-size-xl);
      color: var(--color-primary);
      text-decoration: none;
      flex-shrink: 0;

      &:hover {
        text-decoration: none;
      }
    }

    .logo-icon {
      font-size: var(--font-size-2xl);
    }

    .desktop-nav {
      display: none;
      align-items: center;
      gap: var(--space-xs);
      flex: 1;

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
      font-weight: 600;
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: background-color 0.15s, color 0.15s;

      &:hover {
        background: var(--color-border-light);
        color: var(--color-text);
        text-decoration: none;
      }

      &.active {
        background: color-mix(in srgb, var(--color-primary) 10%, transparent);
        color: var(--color-primary);
      }
    }

    .mobile-nav {
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: var(--color-surface);
      border-top: 1px solid var(--color-border-light);
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);

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
      font-size: var(--font-size-xs);
      font-weight: 600;
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

    .nav-icon {
      font-size: 1.25rem;
    }
  `,
})
export class HeaderComponent {
  protected readonly navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: '\u2302' },
    { path: '/rules', label: 'Rules', icon: '\u{1F4D6}' },
    { path: '/glossary', label: 'Glossary', icon: '\u{1F50D}' },
    { path: '/quizzes', label: 'Quizzes', icon: '\u{2753}' },
    { path: '/casebook', label: 'Casebook', icon: '\u{1F4CB}' },
  ];
}
