import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-jersey-number',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="jersey"
      [style.width.px]="size()"
      [style.height.px]="size()"
      [style.background]="background()"
      [style.border-color]="borderColor()"
      [attr.aria-label]="'Skater number ' + n()"
    >
      <span class="stripes" aria-hidden="true"></span>
      <span class="digits" [style.font-size.px]="fontSize()">{{ n() }}</span>
    </span>
  `,
  styles: `
    .jersey {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: #fff;
      border: 3px solid;
      box-shadow: var(--shadow-hard);
      overflow: hidden;
      font-family: var(--font-display);
      font-weight: 700;
      line-height: 1;
    }

    .stripes {
      position: absolute;
      inset: 0;
      background-image: repeating-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0) 0 12px,
        rgba(255, 255, 255, 0.14) 12px 14px
      );
      pointer-events: none;
    }

    .digits {
      position: relative;
      letter-spacing: -0.02em;
    }
  `,
})
export class JerseyNumberComponent {
  readonly n = input<string | number>('00');
  readonly size = input<number>(84);
  readonly background = input<string>('var(--color-primary)');
  readonly borderColor = input<string>('var(--color-text)');

  protected readonly fontSize = computed(() => {
    const digits = String(this.n()).length;
    const ratio = digits <= 1 ? 0.56 : digits === 2 ? 0.5 : digits === 3 ? 0.4 : 0.32;
    return Math.round(this.size() * ratio);
  });
}
