import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import {
  getAnalytics,
  logEvent,
  setAnalyticsCollectionEnabled,
  Analytics,
} from 'firebase/analytics';
import { getFirebaseApp } from './firebase-app';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private analytics: Analytics;
  private router = inject(Router);
  private titleService = inject(Title);

  constructor() {
    this.analytics = getAnalytics(getFirebaseApp());
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
