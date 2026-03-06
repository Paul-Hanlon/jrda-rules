import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-jrda-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="badge" aria-label="JRDA addendum">JRDA</span>`,
  styles: `
    .badge {
      display: inline-block;
      padding: 2px 8px;
      background: var(--color-jrda);
      color: #212529;
      font-family: var(--font-heading);
      font-size: var(--font-size-xs);
      font-weight: 700;
      border-radius: var(--radius-sm);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `,
})
export class JrdaBadgeComponent {}
