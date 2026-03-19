import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { initializeApp } from 'firebase/app';
import {
  getAnalytics,
  logEvent,
  setAnalyticsCollectionEnabled,
  Analytics,
} from 'firebase/analytics';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private analytics: Analytics;
  private router = inject(Router);
  private titleService = inject(Title);

  constructor() {
    const app = initializeApp(environment.firebase);
    this.analytics = getAnalytics(app);
    setAnalyticsCollectionEnabled(this.analytics, true);
    this.trackPageViews();
  }

  private trackPageViews(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        logEvent(this.analytics, 'page_view', {
          page_path: event.urlAfterRedirects,
          page_title: this.titleService.getTitle(),
          page_location: window.location.origin + event.urlAfterRedirects,
        });
      });
  }

  logEvent(eventName: string, params?: Record<string, unknown>): void {
    logEvent(this.analytics, eventName, params);
  }
}
