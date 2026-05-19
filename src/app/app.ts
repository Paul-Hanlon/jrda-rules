import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { OnboardingComponent } from './features/onboarding/onboarding.component';
import { LandingComponent } from './features/landing/landing.component';
import { ContentLoadingComponent } from './shared/components/content-loading/content-loading.component';
import { UserProfileService } from './services/user-profile.service';
import { ContentLoaderService } from './services/content-loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, OnboardingComponent, LandingComponent, ContentLoadingComponent],
  template: `
    @if (!profileService.isLanded()) {
      <app-landing />
    } @else if (contentLoader.state() !== 'ready') {
      <app-content-loading />
    } @else if (profileService.isNewUser()) {
      <app-onboarding />
    } @else {
      <a class="skip-to-content" href="#main-content">Skip to content</a>
      <app-header />
      <main id="main-content" class="main-content">
        <router-outlet />
      </main>
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
  protected readonly contentLoader = inject(ContentLoaderService);
}
