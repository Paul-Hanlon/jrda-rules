import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { OnboardingDialogComponent } from './shared/components/onboarding-dialog/onboarding-dialog.component';
import { UserProfileService } from './services/user-profile.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, OnboardingDialogComponent],
  template: `
    <a class="skip-to-content" href="#main-content">Skip to content</a>
    <app-header />
    <main id="main-content" class="main-content">
      <router-outlet />
    </main>
    @if (profileService.isNewUser()) {
      <app-onboarding-dialog (dismissed)="profileService.isNewUser.set(false)" />
    }
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
export class App {
  protected readonly profileService = inject(UserProfileService);
}
