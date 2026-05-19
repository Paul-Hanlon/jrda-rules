import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentLoaderService } from '../../../services/content-loader.service';

/** App-level gate shown while the active ruleset's content loads. */
@Component({
  selector: 'app-content-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="content-gate" role="status" aria-live="polite">
      @if (content.state() === 'error') {
        <p class="msg">
          Sorry — the rules couldn't be loaded. Please check your connection and refresh.
        </p>
      } @else {
        <span class="spinner" aria-hidden="true"></span>
        <p class="msg">Loading the rules…</p>
      }
    </div>
  `,
  styles: `
    .content-gate {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-md);
      min-height: 60vh;
      padding: var(--space-lg);
      text-align: center;
    }

    .msg {
      font-family: var(--font-heading);
      font-weight: 600;
      color: var(--color-text-secondary);
      max-width: 32ch;
    }

    .spinner {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--radius-full);
      border: 3px solid var(--color-border-light);
      border-top-color: var(--color-primary);
      animation: content-gate-spin 0.8s linear infinite;
    }

    @keyframes content-gate-spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .spinner {
        animation-duration: 2.4s;
      }
    }
  `,
})
export class ContentLoadingComponent {
  protected readonly content = inject(ContentLoaderService);
}
