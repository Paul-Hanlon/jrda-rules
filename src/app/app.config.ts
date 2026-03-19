import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { AnalyticsService } from './services/analytics.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideAppInitializer(() => {
      inject(AnalyticsService);
    }),
  ],
};
