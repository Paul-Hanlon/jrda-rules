import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { ContentLoaderService, ContentLoadState } from './services/content-loader.service';

describe('App', () => {
  beforeEach(async () => {
    // Seed a landed + onboarded profile so App renders the main shell
    // (header + router outlet) rather than the landing / onboarding gate.
    localStorage.setItem(
      'jrda-user-profile',
      JSON.stringify({ role: 'skater', level: 'L3', landed: true, onboarded: true }),
    );
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        // Stub the content gate as already loaded so the shell renders.
        {
          provide: ContentLoaderService,
          useValue: { state: signal<ContentLoadState>('ready') } as Partial<ContentLoaderService>,
        },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render header', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should have skip to content link', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const skipLink = compiled.querySelector('.skip-to-content');
    expect(skipLink).toBeTruthy();
    expect(skipLink?.getAttribute('href')).toBe('#main-content');
  });
});
