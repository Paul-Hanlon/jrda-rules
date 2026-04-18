import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-track-oval',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg aria-hidden="true" viewBox="0 0 800 400" class="oval" preserveAspectRatio="xMidYMid slice">
      <ellipse
        cx="400" cy="200" rx="350" ry="150"
        fill="none" stroke="currentColor" stroke-width="2"
        stroke-dasharray="6 10" opacity="0.5"
      />
      <ellipse
        cx="400" cy="200" rx="260" ry="90"
        fill="none" stroke="currentColor" stroke-width="1.5"
        stroke-dasharray="4 8" opacity="0.4"
      />
      <ellipse
        cx="400" cy="200" rx="180" ry="50"
        fill="none" stroke="currentColor" stroke-width="1"
        opacity="0.25"
      />
    </svg>
  `,
  styles: `
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      color: currentColor;
    }

    .oval {
      width: 100%;
      height: 100%;
      display: block;
    }
  `,
})
export class TrackOvalComponent {}
