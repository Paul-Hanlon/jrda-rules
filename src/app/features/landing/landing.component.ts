import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-landing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="landing">
      <div class="chrome">
        <span class="meta">Unofficial · v0.1</span>
        <span class="meta">Est. 2026</span>
      </div>

      <div class="hero">
        <span class="plate">Roller Derby · Rules + Glossary</span>

        <h1 class="title">
          Learn<br />
          the <span class="mark">rules</span>.<br />
          Skate <em>fearless.</em>
        </h1>

        <p class="sub">
          A pocket companion for skaters, refs, NSOs, and everyone cheering them on.
          Built around the 2025 Roller Derby rulebook.
        </p>

        <div class="stats">
          <div class="stat">
            <span class="n">7</span>
            <span class="l">Sections</span>
          </div>
          <div class="stat stat--primary">
            <span class="n">140+</span>
            <span class="l">Rules</span>
          </div>
          <div class="stat">
            <span class="n">3</span>
            <span class="l">Levels</span>
          </div>
        </div>

        <div class="spacer"></div>

        <div class="ctas">
          <button type="button" class="btn btn--primary" (click)="start()">
            <span>I'm new here — start</span>
            <span aria-hidden="true" class="arr">→</span>
          </button>
          <!-- TODO: route to /restore once sign-in / restore-from-code exists. -->
          <button type="button" class="btn btn--secondary" (click)="start()">
            <span>I've been here before</span>
          </button>
        </div>
      </div>

      <div class="ticker" aria-hidden="true">
        <div class="track">
          @for (_ of repeats; track $index) {
            <span class="phrase">Be the best, with the best against the best</span>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100dvh;
      background: var(--color-bg);
      color: var(--color-text);
    }

    .landing {
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
    }

    .chrome {
      display: flex;
      justify-content: space-between;
      padding: 28px 36px 0;
    }

    @media (max-width: 640px) {
      .chrome {
        padding: 18px 20px 0;
      }
    }

    .meta {
      font-family: var(--font-mono);
      font-weight: 500;
      font-size: 0.6875rem;
      line-height: 1;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .hero {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 44px 56px 0;
    }

    @media (max-width: 640px) {
      .hero {
        padding: 28px 20px 0;
      }
    }

    .spacer {
      flex: 1;
    }

    .plate {
      align-self: flex-start;
      margin-bottom: 28px;
      background: var(--color-text);
      color: var(--color-bg);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-hard);
      padding: 8px 16px;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.6875rem;
      line-height: 1;
      letter-spacing: 0.25em;
      text-transform: uppercase;
    }

    @media (max-width: 640px) {
      .plate {
        margin-bottom: 20px;
        padding: 6px 12px;
        font-size: 0.625rem;
      }
    }

    .title {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 6.75rem;
      line-height: 0.9;
      letter-spacing: -0.025em;
      margin: 0 0 18px;
      text-wrap: balance;
    }

    .title em {
      font-style: italic;
    }

    @media (max-width: 640px) {
      .title {
        font-size: 3.375rem;
      }
    }

    .mark {
      display: inline-block;
      background: var(--color-primary);
      color: #fff;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-hard);
      padding: 4px 22px 0;
      transform: rotate(-2deg);
    }

    @media (max-width: 640px) {
      .mark {
        padding: 2px 12px 0;
      }
    }

    .sub {
      font-family: var(--font-body);
      font-weight: 400;
      font-size: 1.1875rem;
      line-height: 1.45;
      color: var(--color-text-muted);
      max-width: 520px;
      margin: 0 0 28px;
      text-wrap: pretty;
    }

    @media (max-width: 640px) {
      .sub {
        font-size: 0.9375rem;
        margin-bottom: 22px;
      }
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 140px));
      gap: 12px;
      margin-bottom: 36px;
    }

    @media (max-width: 640px) {
      .stats {
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin-bottom: 24px;
      }
    }

    .stat {
      padding: 14px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      background: var(--color-surface);
      box-shadow: var(--shadow-hard);
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .stat .n {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 2.125rem;
      line-height: 1;
      letter-spacing: -1px;
    }

    .stat .l {
      font-family: var(--font-mono);
      font-weight: 500;
      font-size: 0.625rem;
      line-height: 1;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      opacity: 0.85;
    }

    @media (max-width: 640px) {
      .stat {
        padding: 10px;
      }
      .stat .n {
        font-size: 1.625rem;
      }
    }

    .stat--primary {
      background: var(--color-primary);
      color: #fff;
    }

    .ctas {
      display: flex;
      gap: 12px;
      align-items: center;
      padding-bottom: 44px;
    }

    @media (max-width: 640px) {
      .ctas {
        flex-direction: column;
        align-items: stretch;
        padding-bottom: 24px;
      }
    }

    .btn {
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-hard);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      transition: transform 0.08s, box-shadow 0.08s;
      font-family: var(--font-display);

      &:hover {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
      }
    }

    .btn--primary {
      background: var(--color-primary);
      color: #fff;
      padding: 20px 32px;
      min-width: 280px;
      font-weight: 900;
      font-size: 1.375rem;
      line-height: 1;
      letter-spacing: -0.3px;

      .arr {
        font-size: 20px;
      }
    }

    @media (max-width: 640px) {
      .btn--primary {
        min-width: 0;
        padding: 18px 20px;
        font-size: 1.125rem;
      }
    }

    .btn--secondary {
      background: var(--color-surface);
      color: var(--color-text);
      padding: 18px 22px;
      font-weight: 800;
      font-size: 1.0625rem;
      line-height: 1;
    }

    @media (max-width: 640px) {
      .btn--secondary {
        padding: 14px 18px;
        font-size: 0.9375rem;
      }
    }

    .ticker {
      border-top: var(--stroke) solid var(--color-border-strong);
      background: var(--color-text);
      color: var(--color-bg);
      padding: 12px 0;
      overflow: hidden;
      white-space: nowrap;
    }

    @media (max-width: 640px) {
      .ticker {
        padding: 10px 0;
      }
    }

    .track {
      display: inline-block;
      animation: jrda-ticker 32s linear infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .track {
        animation: none;
      }
    }

    .phrase {
      font-family: var(--font-mono);
      font-weight: 500;
      font-size: 0.6875rem;
      line-height: 1;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      margin-right: 36px;
    }

    @keyframes jrda-ticker {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
  `,
})
export class LandingComponent {
  private readonly profile = inject(UserProfileService);

  /** Signals the parent when the user has dismissed the splash. */
  readonly landed = output<void>();

  protected readonly repeats = Array.from({ length: 6 });

  protected start(): void {
    this.profile.markLanded();
    this.landed.emit();
  }
}
