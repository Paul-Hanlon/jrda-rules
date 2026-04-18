import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-dob-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dob" role="group" aria-label="Date of birth">
      <label class="field">
        <span class="label">Day</span>
        <input
          #dayInput
          class="input"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="2"
          placeholder="DD"
          data-dob="day"
          [value]="day()"
          (input)="onDay($event)"
          (blur)="padDay()"
          autofocus
          aria-label="Day"
        />
      </label>
      <span class="slash" aria-hidden="true">/</span>
      <label class="field">
        <span class="label">Month</span>
        <input
          #monthInput
          class="input"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="2"
          placeholder="MM"
          data-dob="month"
          [value]="month()"
          (input)="onMonth($event)"
          (blur)="padMonth()"
          aria-label="Month"
        />
      </label>
      <span class="slash" aria-hidden="true">/</span>
      <label class="field year">
        <span class="label">Year</span>
        <input
          #yearInput
          class="input"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="4"
          placeholder="YYYY"
          data-dob="year"
          [value]="year()"
          (input)="onYear($event)"
          aria-label="Year"
        />
      </label>
    </div>
  `,
  styles: `
    .dob {
      display: flex;
      align-items: flex-end;
      gap: 10px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 0 0 auto;
    }

    .field.year {
      flex: 1 1 auto;
      min-width: 110px;
    }

    .label {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .input {
      width: 72px;
      padding: 14px 10px;
      min-height: 56px;
      background: var(--color-surface);
      color: var(--color-text);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-hard);
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.375rem;
      letter-spacing: 0.04em;
      text-align: center;

      &:focus-visible {
        outline: 3px solid var(--color-accent);
        outline-offset: 2px;
      }
    }

    .field.year .input {
      width: 100%;
    }

    .slash {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.75rem;
      color: var(--color-text-muted);
      line-height: 1;
      padding-bottom: 14px;
    }
  `,
})
export class DobPickerComponent {
  /** Bound YYYY-MM-DD string. Empty when not yet valid. */
  readonly value = input<string>('');
  readonly valueChange = output<string>();

  protected readonly day = signal('');
  protected readonly month = signal('');
  protected readonly year = signal('');

  private readonly monthInput = viewChild<ElementRef<HTMLInputElement>>('monthInput');
  private readonly yearInput = viewChild<ElementRef<HTMLInputElement>>('yearInput');

  constructor() {
    // Hydrate internal fields when the bound value arrives as a complete
    // YYYY-MM-DD. We intentionally do NOT clear local state when value is
    // empty — the picker emits '' for partial input, and clearing local
    // state would fight the user's typing.
    effect(() => {
      const v = this.value();
      if (!v) return;
      const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!m) return;
      if (this.year() !== m[1]) this.year.set(m[1]);
      if (this.month() !== m[2]) this.month.set(m[2]);
      if (this.day() !== m[3]) this.day.set(m[3]);
    });
  }

  protected onDay(event: Event): void {
    const el = event.target as HTMLInputElement;
    const cleaned = el.value.replace(/\D/g, '').slice(0, 2);
    if (el.value !== cleaned) el.value = cleaned;
    this.day.set(cleaned);
    this.emit();
  }

  protected onMonth(event: Event): void {
    const el = event.target as HTMLInputElement;
    const cleaned = el.value.replace(/\D/g, '').slice(0, 2);
    if (el.value !== cleaned) el.value = cleaned;
    this.month.set(cleaned);
    this.emit();
  }

  protected onYear(event: Event): void {
    const el = event.target as HTMLInputElement;
    const cleaned = el.value.replace(/\D/g, '').slice(0, 4);
    if (el.value !== cleaned) el.value = cleaned;
    this.year.set(cleaned);
    this.emit();
  }

  protected padDay(): void {
    const v = this.day();
    if (v.length === 1) this.day.set(v.padStart(2, '0'));
    this.emit();
  }

  protected padMonth(): void {
    const v = this.month();
    if (v.length === 1) this.month.set(v.padStart(2, '0'));
    this.emit();
  }

  private emit(): void {
    const d = this.day();
    const m = this.month();
    const y = this.year();
    if (d.length >= 1 && m.length >= 1 && y.length === 4) {
      const dd = d.padStart(2, '0');
      const mm = m.padStart(2, '0');
      const year = parseInt(y, 10);
      const month = parseInt(mm, 10);
      const day = parseInt(dd, 10);
      const valid =
        year >= 1900 &&
        year <= new Date().getFullYear() &&
        month >= 1 &&
        month <= 12 &&
        day >= 1 &&
        day <= 31;
      if (valid) {
        this.valueChange.emit(`${y}-${mm}-${dd}`);
        return;
      }
    }
    this.valueChange.emit('');
  }
}
