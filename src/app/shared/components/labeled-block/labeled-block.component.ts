import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-labeled-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kicker">{{ label() }}</div>
    <p class="body"><ng-content /></p>
  `,
  styles: `
    :host {
      display: block;
    }

    .kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      margin-bottom: 4px;
    }

    .body {
      font-family: var(--font-body);
      font-size: 0.875rem;
      line-height: 1.6;
      color: var(--color-text);
      margin: 0;
    }
  `,
})
export class LabeledBlockComponent {
  readonly label = input<string>('');
}
