import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { AnalyticsService } from './services/analytics.service';
import { RemoteConfigService } from './services/remote-config.service';
import { ContentLoaderService } from './services/content-loader.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideAppInitializer(() => {
      inject(AnalyticsService);
      inject(RemoteConfigService);
      inject(ContentLoaderService);
    }),
  ],
};
