import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <a class="skip-to-content" href="#main-content">Skip to content</a>
    <app-header />
    <main id="main-content" class="main-content">
      <router-outlet />
    </main>
  `,
  styles: `
    .main-content {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: var(--space-lg) var(--space-md);
      padding-bottom: calc(var(--nav-height-mobile) + var(--space-lg));

      @media (min-width: 768px) {
        padding-bottom: var(--space-lg);
      }
    }
  `,
})
export class App {}
