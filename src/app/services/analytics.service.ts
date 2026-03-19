import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, Analytics } from 'firebase/analytics';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private analytics: Analytics;
  private router = inject(Router);

  constructor() {
    const app = initializeApp(environment.firebase);
    this.analytics = getAnalytics(app);
    this.trackPageViews();
  }

  private trackPageViews(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        logEvent(this.analytics, 'page_view', {
          page_path: (event as NavigationEnd).urlAfterRedirects,
        });
      });
  }

  logEvent(eventName: string, params?: Record<string, unknown>): void {
    logEvent(this.analytics, eventName, params);
  }
}
