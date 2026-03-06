import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="progress-track"
      role="progressbar"
      [attr.aria-valuenow]="percentage()"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-label]="label()"
    >
      <div class="progress-fill" [style.width.%]="percentage()"></div>
    </div>
  `,
  styles: `
    .progress-track {
      height: 8px;
      background: var(--color-border-light);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--color-primary);
      border-radius: var(--radius-full);
      transition: width 0.3s ease;
    }
  `,
})
export class ProgressBarComponent {
  readonly value = input.required<number>();
  readonly max = input.required<number>();
  readonly label = input('Progress');

  protected readonly percentage = computed(() => {
    const max = this.max();
    if (max === 0) return 0;
    return Math.round((this.value() / max) * 100);
  });
}
