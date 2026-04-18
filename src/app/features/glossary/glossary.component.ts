import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { GlossaryService } from '../../services/glossary.service';
import { ProgressService } from '../../services/progress.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { TrackOvalComponent } from '../../shared/components/track-oval/track-oval.component';
import { GlossaryTerm } from '../../models/glossary';

type Mode = 'list' | 'flash';

@Component({
  selector: 'app-glossary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, TrackOvalComponent],
  template: `
    <div class="glossary">
      <header class="page-head">
        <div class="kicker">Vocabulary</div>
        <h1>Glossary</h1>
        <p class="intro">
          Learn the language of derby — search or flashcard yourself.
        </p>
      </header>

      <div class="toolbar">
        <label class="search">
          <span class="search-icon" aria-hidden="true">
            <app-icon name="search" [size]="18" [strokeWidth]="2.2" />
          </span>
          <span class="visually-hidden">Search terms</span>
          <input
            type="search"
            placeholder="Search terms…"
            [value]="glossaryService.searchQuery()"
            (input)="onSearch($event)"
            aria-label="Search terms"
          />
        </label>

        <button
          type="button"
          class="pill"
          [class.pill-primary]="mode() === 'flash'"
          [class.pill-ghost]="mode() !== 'flash'"
          (click)="toggleMode()"
        >
          <app-icon name="flip" [size]="16" [strokeWidth]="2.4" />
          {{ mode() === 'flash' ? 'List view' : 'Flashcards' }}
        </button>
      </div>

      @if (mode() === 'list') {
        @let results = filteredTerms();
        <div class="list" role="list">
          @for (t of results; track t.id) {
            @let open = expanded() === t.id;
            @let viewed = isViewed(t.id);
            <div class="term-card" role="listitem" [class.open]="open">
              <button
                type="button"
                class="term-header"
                (click)="toggleTerm(t)"
                [attr.aria-expanded]="open"
                [attr.aria-controls]="'term-body-' + t.id"
              >
                <span class="term-name">{{ t.term }}</span>
                @if (viewed) {
                  <span class="viewed" aria-label="Viewed">
                    <app-icon name="check" [size]="16" [strokeWidth]="3" />
                  </span>
                }
                <app-icon
                  [name]="open ? 'chev-up' : 'chev-down'"
                  [size]="16"
                  [strokeWidth]="2.2"
                />
              </button>

              @if (open) {
                <div [id]="'term-body-' + t.id" class="term-body">
                  <p>{{ t.definition }}</p>
                  @if (t.ruleReferences?.length) {
                    <div class="refs">Rules: {{ t.ruleReferences!.join(', ') }}</div>
                  }
                </div>
              }
            </div>
          }

          @if (results.length === 0) {
            <p class="empty">No terms match "{{ glossaryService.searchQuery() }}".</p>
          }
        </div>
      } @else {
        @let total = terms().length;
        @let card = currentCard();
        <div class="flash-pane">
          @if (card) {
            <div
              class="flash-frame"
              role="button"
              tabindex="0"
              [attr.aria-label]="
                flipped()
                  ? 'Definition: ' + card.definition
                  : 'Term: ' + card.term + '. Activate to reveal definition.'
              "
              (click)="flipCard()"
              (keydown.enter)="flipCard(); $event.preventDefault()"
              (keydown.space)="flipCard(); $event.preventDefault()"
            >
              <div class="flash-inner" [class.flipped]="flipped()">
                <div class="face face-front">
                  <app-track-oval style="color: var(--color-primary); opacity: 0.22;" />
                  <div class="face-body">
                    <div class="kicker">Term {{ flashIdx() + 1 }} / {{ total }}</div>
                    <h2>{{ card.term }}</h2>
                    <div class="hint">Tap to reveal</div>
                  </div>
                </div>

                <div class="face face-back" #backFace>
                  <div class="kicker kicker-accent">Definition</div>
                  <p>{{ card.definition }}</p>
                </div>
              </div>
            </div>

            <div class="flash-actions">
              <button type="button" class="pill pill-ghost" (click)="nextCard(false)">
                <app-icon name="flip" [size]="14" [strokeWidth]="2.4" />
                Study more
              </button>
              <button type="button" class="pill pill-accent" (click)="nextCard(true)">
                <app-icon name="check" [size]="14" [strokeWidth]="2.4" />
                Got it!
              </button>
            </div>
          } @else {
            <div class="flash-frame flash-empty">
              <div class="face face-front">
                <div class="face-body">
                  <h2>No terms yet</h2>
                  <div class="hint">Check back once the deck is seeded.</div>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: `
    .glossary {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    /* Page head */
    .page-head {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .kicker {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-primary);
    }

    .page-head h1 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 2rem;
      letter-spacing: -0.02em;
      margin: 0;
    }

    .intro {
      color: var(--color-text-secondary);
      margin: 0;
    }

    /* Toolbar */
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: stretch;
    }

    .search {
      position: relative;
      flex: 1;
      min-width: 200px;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--color-text-muted);
      line-height: 0;
    }

    .search input {
      width: 100%;
      padding: 12px 16px 12px 42px;
      min-height: 48px;
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

    /* Pills (shared by toolbar + flashcard actions) */
    .pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 18px;
      min-height: 48px;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.8125rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      box-shadow: var(--shadow-hard);
      cursor: pointer;
      transition: transform 0.08s, box-shadow 0.08s;

      &:hover:not(:disabled) {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
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

    .pill-accent {
      background: var(--color-accent);
      color: var(--color-accent-ink);
    }

    /* List mode */
    .list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .term-card {
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }

    .term-header {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 12px 16px;
      min-height: 48px;
      text-align: left;
      background: transparent;
      border: none;
      cursor: pointer;

      &:hover {
        background: var(--color-surface-alt);
      }
    }

    .term-name {
      flex: 1;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.9375rem;
      color: var(--color-text);
      letter-spacing: -0.005em;
    }

    .viewed {
      display: inline-flex;
      align-items: center;
      color: var(--color-success);
    }

    .term-body {
      padding: 0 16px 14px;
      font-family: var(--font-body);
      font-size: 0.875rem;
      line-height: 1.6;
      color: var(--color-text-secondary);

      p {
        margin: 0;
      }
    }

    .refs {
      margin-top: 8px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--color-text-muted);
      letter-spacing: 0.04em;
    }

    .empty {
      padding: 32px 0;
      text-align: center;
      font-family: var(--font-mono);
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    /* Flashcard mode */
    .flash-pane {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 20px 0;
    }

    .flash-frame {
      width: 100%;
      max-width: 480px;
      height: 280px;
      perspective: 1200px;
      cursor: pointer;

      &:focus-visible {
        outline: 3px solid var(--color-accent);
        outline-offset: 4px;
        border-radius: var(--radius-card);
      }
    }

    .flash-empty {
      cursor: default;
    }

    .flash-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.6s;
    }

    .flash-inner.flipped {
      transform: rotateY(180deg);
    }

    @media (prefers-reduced-motion: reduce) {
      .flash-inner {
        transition: none;
      }
    }

    .face {
      position: absolute;
      inset: 0;
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      backface-visibility: hidden;
      overflow: hidden;
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .face-front {
      background: var(--color-surface);
      align-items: center;
      text-align: center;
    }

    .face-front .face-body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .face-front h2 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 2.5rem;
      color: var(--color-primary);
      letter-spacing: -0.02em;
      margin: 0;
      line-height: 1;
    }

    .hint {
      font-family: var(--font-display);
      font-size: 0.75rem;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .face-back {
      background: var(--color-text);
      color: var(--color-surface);
      transform: rotateY(180deg);
      gap: 10px;
      justify-content: flex-start;
      overflow-y: auto;
      scrollbar-gutter: stable;
    }

    .face-back::-webkit-scrollbar {
      width: 6px;
    }

    .face-back::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.25);
      border-radius: 3px;
    }

    .kicker-accent {
      color: var(--color-accent);
    }

    .face-back p {
      font-family: var(--font-body);
      font-size: 1rem;
      line-height: 1.55;
      margin: 0;
    }

    .flash-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
})
export class GlossaryComponent {
  protected readonly glossaryService = inject(GlossaryService);
  private readonly progressService = inject(ProgressService);

  protected readonly mode = signal<Mode>('list');
  protected readonly expanded = signal<string | null>(null);
  protected readonly flipped = signal(false);
  protected readonly flashIdx = signal(0);

  private readonly backFace = viewChild<ElementRef<HTMLElement>>('backFace');

  protected readonly terms = this.glossaryService.allTerms;
  protected readonly filteredTerms = this.glossaryService.filteredTerms;

  protected readonly currentCard = computed<GlossaryTerm | null>(() => {
    const list = this.terms();
    if (!list.length) return null;
    return list[this.flashIdx() % list.length];
  });

  protected onSearch(event: Event): void {
    this.glossaryService.setSearchQuery((event.target as HTMLInputElement).value);
  }

  protected toggleMode(): void {
    this.mode.update((m) => (m === 'list' ? 'flash' : 'list'));
    this.flipped.set(false);
  }

  protected toggleTerm(term: GlossaryTerm): void {
    if (this.expanded() === term.id) {
      this.expanded.set(null);
      return;
    }
    this.expanded.set(term.id);
    this.progressService.markTermViewed(term.id);
  }

  protected flipCard(): void {
    const willShowBack = !this.flipped();
    this.flipped.set(willShowBack);
    if (willShowBack) {
      const card = this.currentCard();
      if (card) this.progressService.markTermViewed(card.id);
      this.resetBackScroll();
    }
  }

  protected nextCard(mastered: boolean): void {
    const card = this.currentCard();
    if (card && mastered) this.progressService.markTermMastered(card.id);
    const total = this.terms().length;
    if (!total) return;
    this.flashIdx.update((i) => (i + 1) % total);
    this.flipped.set(false);
    this.resetBackScroll();
  }

  private resetBackScroll(): void {
    queueMicrotask(() => {
      const el = this.backFace()?.nativeElement;
      if (el) el.scrollTop = 0;
    });
  }

  protected isViewed(termId: string): boolean {
    return this.progressService.progress().viewedTermIds.includes(termId);
  }
}
