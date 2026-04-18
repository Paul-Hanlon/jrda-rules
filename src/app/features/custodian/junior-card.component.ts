import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { JuniorLogin, JuniorProfile } from '../../models/user-profile';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { JerseyNumberComponent } from '../../shared/components/jersey-number/jersey-number.component';
import { TrackOvalComponent } from '../../shared/components/track-oval/track-oval.component';

export interface JuniorSummary {
  rulesRead: number;
  rulesTotal: number;
  termsMastered: number;
  termsTotal: number;
  quizBest: number;
  casesDone: number;
  casesTotal: number;
  streakDays: number;
  lastActiveDays: number;
}

type LoginMode = 'none' | 'form' | 'view';

@Component({
  selector: 'app-junior-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, JerseyNumberComponent, TrackOvalComponent],
  template: `
    <article class="card">
      <!-- Identity header -->
      <button
        type="button"
        class="head"
        (click)="stepInto.emit()"
        [attr.aria-label]="'Step into ' + junior().skateName + ' — Junior ' + junior().level"
      >
        <app-jersey-number
          [n]="junior().number || '00'"
          [size]="68"
          [background]="accent()"
          borderColor="var(--color-text)"
        />
        <span class="head-text">
          <span class="kicker">Junior &middot; {{ junior().level }}</span>
          <span class="name">{{ junior().skateName }}</span>
          <span class="meta">
            Age {{ junior().age || '—' }} &middot; {{ junior().team || 'Unassigned' }}
          </span>
        </span>
        <span class="go" aria-hidden="true">
          <app-icon name="arrow-right" [size]="16" [strokeWidth]="2.4" color="var(--color-accent)" />
        </span>
      </button>

      <!-- Stats block -->
      <div class="stats">
        <div class="bar-row">
          <span class="bar-label">Rules read</span>
          <span class="bar-count">{{ summary().rulesRead }}/{{ summary().rulesTotal }}</span>
          <div class="bar" aria-hidden="true">
            <div
              class="bar-fill"
              [style.width.%]="pct(summary().rulesRead, summary().rulesTotal)"
              [style.background]="accent()"
            ></div>
          </div>
        </div>
        <div class="bar-row">
          <span class="bar-label">Terms mastered</span>
          <span class="bar-count">{{ summary().termsMastered }}/{{ summary().termsTotal }}</span>
          <div class="bar" aria-hidden="true">
            <div
              class="bar-fill bar-fill-ink"
              [style.width.%]="pct(summary().termsMastered, summary().termsTotal)"
            ></div>
          </div>
        </div>

        <div class="tile-grid">
          @for (tile of miniTiles(); track tile.label) {
            <div class="tile">
              <app-icon [name]="tile.icon" [size]="14" [strokeWidth]="2.2" />
              <span class="tile-value">{{ tile.value }}</span>
              <span class="tile-label">{{ tile.label }}</span>
            </div>
          }
        </div>

        <div class="stats-foot">
          <span class="last-active">Last active &middot; {{ lastActiveLabel() }}</span>
          <button
            type="button"
            class="remove"
            (click)="onRemove($event)"
            aria-label="Remove junior"
          >
            <app-icon name="close" [size]="14" [strokeWidth]="2.4" />
          </button>
        </div>
      </div>

      <!-- Login strip -->
      <div class="login-strip" [attr.data-mode]="mode()">
        @switch (mode()) {
          @case ('none') {
            <button type="button" class="login-cta" (click)="openForm()">
              <app-icon name="lock" [size]="16" [strokeWidth]="2.2" />
              <span>Create login</span>
              <app-icon name="arrow-right" [size]="16" [strokeWidth]="2.4" />
            </button>
          }

          @case ('form') {
            <form
              class="login-form"
              (submit)="onSubmit($event)"
              (keydown.enter)="$event.preventDefault()"
            >
              <div class="kicker-row">Set up {{ junior().skateName }}'s login</div>

              <label class="field">
                <span class="field-label">Username</span>
                <input
                  type="text"
                  class="mono"
                  [value]="username()"
                  (input)="onUsername($event)"
                  maxlength="20"
                  autocomplete="off"
                  autofocus
                />
                <span class="field-hint">Lowercase letters, numbers, dashes. 3–20 characters.</span>
              </label>

              <div class="field">
                <span class="field-label">4-digit PIN</span>
                <div class="pin-row">
                  @for (i of pinIndexes; track i) {
                    <input
                      #pinInput
                      type="text"
                      inputmode="numeric"
                      pattern="[0-9]*"
                      maxlength="1"
                      class="pin-input"
                      [attr.data-pin-index]="i"
                      [value]="pinDigits()[i]"
                      (input)="onPinInput($event, i)"
                      (keydown)="onPinKeydown($event, i)"
                      autocomplete="off"
                      aria-label="PIN digit {{ i + 1 }}"
                    />
                  }
                </div>
                <span class="field-hint">Easy to remember. Your junior can change it later.</span>
              </div>

              <div class="form-actions">
                <button type="button" class="pill pill-ghost" (click)="cancelForm()">Cancel</button>
                <button
                  type="submit"
                  class="pill pill-primary"
                  [disabled]="!formValid()"
                >
                  <app-icon name="check" [size]="14" [strokeWidth]="2.4" />
                  Create login
                </button>
              </div>
            </form>
          }

          @case ('view') {
            @if (junior().login; as login) {
              <div class="credential">
                <div class="kicker-row">Sign-in card &middot; show your junior</div>
                <div class="cred-card">
                  <app-track-oval style="color: var(--color-accent); opacity: 0.18;" />
                  <div class="cred-body">
                    <div class="cred-kicker">{{ junior().skateName }}'s login</div>
                    <div class="cred-product">Derby Rules App</div>
                    <div class="cred-row">
                      <span class="cred-label">Username</span>
                      <span class="cred-value">{{ login.username }}</span>
                    </div>
                    <div class="cred-row">
                      <span class="cred-label">4-digit PIN</span>
                      <div class="pin-tiles">
                        @for (digit of splitPin(login.pin); track $index) {
                          <span class="pin-tile">{{ pinRevealed() ? digit : '•' }}</span>
                        }
                      </div>
                    </div>
                    <button
                      type="button"
                      class="reveal-btn"
                      (click)="togglePinReveal()"
                      [attr.aria-pressed]="pinRevealed()"
                    >
                      {{ pinRevealed() ? 'Hide PIN' : 'Reveal PIN' }}
                    </button>
                  </div>
                </div>
                <div class="view-actions">
                  <button type="button" class="text-link" (click)="resetLogin()">
                    ↻ Reset login
                  </button>
                  <button type="button" class="pill pill-primary" (click)="closeView()">
                    Done
                  </button>
                </div>
              </div>
            } @else {
              <button type="button" class="login-cta" (click)="openForm()">
                <app-icon name="lock" [size]="16" [strokeWidth]="2.2" />
                <span>Create login</span>
                <app-icon name="arrow-right" [size]="16" [strokeWidth]="2.4" />
              </button>
            }
          }
        }
      </div>
    </article>
  `,
  styles: `
    .card {
      display: flex;
      flex-direction: column;
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      overflow: hidden;
    }

    /* Identity header */
    .head {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px 18px 14px;
      background: transparent;
      border: none;
      border-bottom: var(--stroke) solid var(--color-border-strong);
      text-align: left;
      cursor: pointer;
      width: 100%;

      &:hover {
        background: var(--color-surface-alt);
      }
    }

    .head-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .name {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.375rem;
      letter-spacing: -0.015em;
      line-height: 1.15;
      color: var(--color-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .meta {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      color: var(--color-text-muted);
    }

    .go {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      background: var(--color-text);
      color: var(--color-accent);
      border-radius: var(--radius-sm);
      flex-shrink: 0;
    }

    /* Stats block */
    .stats {
      padding: 14px 18px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      border-bottom: var(--stroke) solid var(--color-border-strong);
    }

    .bar-row {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto;
      column-gap: 8px;
      row-gap: 4px;
    }

    .bar-label {
      font-family: var(--font-mono);
      font-size: 0.625rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .bar-count {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.8125rem;
      color: var(--color-text);
    }

    .bar {
      grid-column: 1 / -1;
      height: 6px;
      background: var(--color-surface-alt);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: 999px;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      transition: width 0.3s ease;
    }

    .bar-fill-ink {
      background: var(--color-text);
    }

    @media (prefers-reduced-motion: reduce) {
      .bar-fill { transition: none; }
    }

    .tile-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
    }

    .tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 6px;
      background: var(--color-surface-alt);
      border: var(--stroke) solid var(--color-border);
      border-radius: var(--radius-sm);
      color: var(--color-text-muted);
    }

    .tile-value {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 0.9375rem;
      color: var(--color-text);
      line-height: 1;
    }

    .tile-label {
      font-family: var(--font-mono);
      font-size: 0.5625rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .stats-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10px;
      border-top: 1px dashed var(--color-border);
    }

    .last-active {
      font-family: var(--font-mono);
      font-size: 0.625rem;
      letter-spacing: 0.08em;
      color: var(--color-text-muted);
    }

    .remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: transparent;
      border: none;
      color: var(--color-text-muted);
      cursor: pointer;
      border-radius: var(--radius-sm);

      &:hover {
        color: var(--color-error);
        background: var(--color-surface-alt);
      }
    }

    /* Login strip */
    .login-strip {
      background: var(--color-surface-alt);
    }

    .login-cta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      width: 100%;
      padding: 14px 18px;
      background: transparent;
      border: none;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.8125rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--color-text);
      cursor: pointer;

      &:hover {
        background: var(--color-surface);
      }

      span { flex: 1; text-align: left; }
    }

    .login-form,
    .credential {
      padding: 14px 18px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .kicker-row {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .field-label {
      font-family: var(--font-mono);
      font-size: 0.625rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .field input {
      padding: 10px 14px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      background: var(--color-surface);
      font-family: var(--font-body);
      font-size: 0.9375rem;
      color: var(--color-text);

      &:focus-visible {
        outline: 3px solid var(--color-accent);
        outline-offset: 2px;
      }
    }

    .field input.mono {
      font-family: var(--font-mono);
      font-weight: 500;
    }

    .field-hint {
      font-size: 0.6875rem;
      color: var(--color-text-muted);
    }

    .pin-row {
      display: flex;
      gap: 8px;
    }

    .pin-input {
      flex: 1;
      min-width: 0;
      width: 0;
      box-sizing: border-box;
      padding: 14px 0;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      background: var(--color-surface);
      text-align: center;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.375rem;
      color: var(--color-text);

      &:focus-visible {
        outline: 3px solid var(--color-accent);
        outline-offset: 2px;
      }
    }

    .form-actions,
    .view-actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
      padding-top: 4px;
    }

    .view-actions {
      justify-content: space-between;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 14px;
      min-height: 40px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.75rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      box-shadow: var(--shadow-hard);
      cursor: pointer;

      &:hover:not(:disabled) {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .pill-primary {
      background: var(--color-primary);
      color: #fff;
    }

    .pill-ghost {
      background: var(--color-surface);
      color: var(--color-text);
    }

    .text-link {
      background: transparent;
      border: none;
      color: var(--color-text-muted);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.75rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      cursor: pointer;

      &:hover {
        color: var(--color-text);
      }
    }

    /* Credential card */
    .cred-card {
      position: relative;
      overflow: hidden;
      background: var(--color-text);
      color: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      padding: 18px;
    }

    .cred-body {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .cred-kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-accent);
    }

    .cred-product {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.25rem;
      letter-spacing: -0.01em;
      margin-bottom: 4px;
    }

    .cred-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .cred-label {
      font-family: var(--font-mono);
      font-size: 0.5625rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--color-accent);
      opacity: 0.7;
    }

    .cred-value {
      font-family: var(--font-mono);
      font-weight: 600;
      font-size: 1.125rem;
      letter-spacing: 0.08em;
      color: var(--color-surface);
    }

    .pin-tiles {
      display: flex;
      gap: 8px;
    }

    .pin-tile {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 38px;
      padding: 10px 0;
      background: var(--color-accent);
      color: var(--color-accent-ink);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.375rem;
    }

    .reveal-btn {
      width: 100%;
      padding: 10px;
      background: transparent;
      color: var(--color-accent);
      border: 2px dashed var(--color-accent);
      border-radius: var(--radius-sm);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;

      &:hover {
        background: rgba(199, 255, 63, 0.1);
      }
    }
  `,
})
export class JuniorCardComponent {
  readonly index = input.required<number>();
  readonly junior = input.required<JuniorProfile>();
  readonly summary = input.required<JuniorSummary>();

  readonly stepInto = output<void>();
  readonly remove = output<void>();

  private readonly profileService = inject(UserProfileService);

  protected readonly mode = signal<LoginMode>('none');
  protected readonly username = signal('');
  protected readonly pinDigits = signal<string[]>(['', '', '', '']);
  protected readonly pinRevealed = signal(false);
  protected readonly pinIndexes = [0, 1, 2, 3];

  protected readonly accent = computed(() =>
    this.index() % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)',
  );

  protected readonly miniTiles = computed<Array<{ icon: IconName; value: string; label: string }>>(() => [
    { icon: 'question', value: `${this.summary().quizBest}%`, label: 'Quiz best' },
    { icon: 'clipboard', value: `${this.summary().casesDone}/${this.summary().casesTotal}`, label: 'Cases' },
    { icon: 'bolt', value: this.summary().streakDays > 0 ? `${this.summary().streakDays}d` : '—', label: 'Streak' },
  ]);

  protected readonly lastActiveLabel = computed(() => {
    const d = this.summary().lastActiveDays;
    if (d <= 0) return 'Today';
    if (d === 1) return 'Yesterday';
    return `${d} days ago`;
  });

  protected readonly formValid = computed(() => {
    const u = this.username();
    const pin = this.pinDigits().join('');
    return u.length >= 3 && /^\d{4}$/.test(pin);
  });

  constructor() {
    // Whenever the junior input changes, sync the strip mode to the saved login.
    queueMicrotask(() => this.syncModeFromJunior());
  }

  private syncModeFromJunior(): void {
    if (this.junior().login) {
      if (this.mode() === 'none') this.mode.set('view');
    } else {
      if (this.mode() === 'view') this.mode.set('none');
    }
  }

  protected openForm(): void {
    this.username.set(this.slugify(this.junior().skateName));
    this.pinDigits.set(['', '', '', '']);
    this.mode.set('form');
  }

  protected cancelForm(): void {
    this.mode.set(this.junior().login ? 'view' : 'none');
    this.pinRevealed.set(false);
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.save();
  }

  protected save(): void {
    if (!this.formValid()) return;
    const login: JuniorLogin = {
      username: this.username(),
      pin: this.pinDigits().join(''),
      createdAt: Date.now(),
    };
    this.profileService.setJuniorLogin(this.index(), login);
    this.pinRevealed.set(true);
    this.mode.set('view');
  }

  protected closeView(): void {
    this.pinRevealed.set(false);
    this.mode.set('none');
  }

  protected togglePinReveal(): void {
    this.pinRevealed.update((v) => !v);
  }

  protected resetLogin(): void {
    if (!confirm(`Reset ${this.junior().skateName}'s login? They'll need a new one.`)) return;
    this.profileService.clearJuniorLogin(this.index());
    this.pinRevealed.set(false);
    this.openForm();
  }

  protected onRemove(event: Event): void {
    event.stopPropagation();
    if (!confirm(`Remove ${this.junior().skateName}? Their progress will be lost.`)) return;
    this.remove.emit();
  }

  protected onUsername(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    const cleaned = raw.toLowerCase().replace(/[^a-z0-9-_]/g, '').slice(0, 20);
    this.username.set(cleaned);
    if (raw !== cleaned) (event.target as HTMLInputElement).value = cleaned;
  }

  protected onPinInput(event: Event, index: number): void {
    const el = event.target as HTMLInputElement;
    const digit = el.value.replace(/\D/g, '').slice(-1);
    el.value = digit;
    this.pinDigits.update((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });
    if (digit && index < 3) {
      const next = document.querySelector<HTMLInputElement>(
        `[data-pin-index="${index + 1}"]`,
      );
      next?.focus();
      next?.select();
    }
  }

  protected onPinKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.pinDigits()[index] && index > 0) {
      const prev = document.querySelector<HTMLInputElement>(
        `[data-pin-index="${index - 1}"]`,
      );
      prev?.focus();
      prev?.select();
    }
  }

  protected splitPin(pin: string): string[] {
    return pin.split('').slice(0, 4);
  }

  protected pct(value: number, total: number): number {
    if (!total) return 0;
    return Math.min(100, Math.round((value / total) * 100));
  }

  private slugify(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 20);
  }
}
