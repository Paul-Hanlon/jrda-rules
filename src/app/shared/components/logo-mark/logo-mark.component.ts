import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-logo-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse
        cx="20"
        cy="20"
        rx="18"
        ry="12"
        [attr.stroke]="primary()"
        stroke-width="2"
        stroke-dasharray="3 3"
      />
      <path
        d="M20 8l2.6 5.3 5.9.8-4.2 4.2 1 5.9L20 21.4l-5.3 2.8 1-5.9-4.2-4.2 5.9-.8z"
        [attr.fill]="accent()"
      />
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
    }
  `,
})
export class LogoMarkComponent {
  readonly size = input<number>(36);
  readonly primary = input<string>('var(--color-text)');
  readonly accent = input<string>('var(--color-primary)');
}
