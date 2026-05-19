import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-flag-question-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="backdrop" (click)="close()">
      <dialog
        class="dialog"
        open
        role="dialog"
        aria-labelledby="flag-dialog-title"
        (click)="$event.stopPropagation()"
      >
        <h2 id="flag-dialog-title">Flag this content</h2>
        <p class="context">
          <strong>{{ contextTitle() }}</strong> &mdash; {{ contentText() }}
        </p>

        <label for="flag-description">What's wrong?</label>
        <textarea
          #descriptionInput
          id="flag-description"
          rows="4"
          placeholder="e.g. The correct answer seems wrong, the question is unclear..."
          [value]="description()"
          (input)="description.set(descriptionInput.value)"
        ></textarea>

        <div class="btn-row">
          <button type="button" class="cancel-btn" (click)="close()">Cancel</button>
          <button
            type="button"
            class="submit-btn"
            [disabled]="!description().trim()"
            (click)="submit()"
          >
            Report on GitHub
          </button>
        </div>
      </dialog>
    </div>
  `,
  styles: `
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
      padding: var(--space-md);
    }

    .dialog {
      position: relative;
      width: 100%;
      max-width: 480px;
      margin: 0;
      padding: var(--space-xl);
      border: none;
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      box-shadow: var(--shadow-lg);
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    h2 {
      font-size: var(--font-size-xl);
      color: var(--color-primary);
    }

    .context {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      background: var(--color-bg);
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--radius-sm);
      line-height: 1.5;
    }

    label {
      font-weight: 700;
      font-size: var(--font-size-base);
    }

    textarea {
      width: 100%;
      padding: var(--space-sm) var(--space-md);
      border: 2px solid var(--color-border);
      border-radius: var(--radius-sm);
      font-family: inherit;
      font-size: var(--font-size-base);
      resize: vertical;
      background: var(--color-surface);
      color: var(--color-text);

      &:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
        border-color: var(--color-primary);
      }
    }

    .btn-row {
      display: flex;
      gap: var(--space-sm);
      justify-content: flex-end;
    }

    .submit-btn,
    .cancel-btn {
      padding: var(--space-sm) var(--space-lg);
      border-radius: var(--radius-sm);
      font-weight: 700;
      font-size: var(--font-size-base);
      min-height: var(--touch-target);
    }

    .submit-btn {
      background: var(--color-primary);
      color: #fff;
      transition: background-color 0.15s;

      &:hover:not(:disabled) {
        background: var(--color-primary-dark);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .cancel-btn {
      background: var(--color-border-light);
      color: var(--color-text-secondary);

      &:hover {
        background: var(--color-border);
      }
    }
  `,
})
export class FlagQuestionDialogComponent {
  readonly contentText = input.required<string>();
  readonly contentId = input.required<string>();
  readonly contextTitle = input.required<string>();
  readonly ruleReference = input.required<string>();

  readonly closed = output<void>();

  protected readonly description = signal('');

  protected close(): void {
    this.closed.emit();
  }

  protected submit(): void {
    const desc = this.description().trim();
    if (!desc) return;

    const title = encodeURIComponent(`Content issue: ${this.contentText().slice(0, 80)}`);
    const body = encodeURIComponent(
      [
        `**Content ID:** ${this.contentId()}`,
        `**Context:** ${this.contextTitle()}`,
        `**Rule Reference:** ${this.ruleReference()}`,
        `**Content:** ${this.contentText()}`,
        '',
        `**Issue Description:**`,
        desc,
      ].join('\n')
    );

    const url = `https://github.com/tbg-development/derby-rules/issues/new?title=${title}&body=${body}&labels=question-flag`;
    window.open(url, '_blank', 'noopener');
    this.closed.emit();
  }
}
