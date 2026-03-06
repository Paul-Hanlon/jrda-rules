import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GlossaryService } from '../../services/glossary.service';
import { ProgressService } from '../../services/progress.service';
import { GlossaryTerm } from '../../models/glossary';

@Component({
  selector: 'app-glossary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="glossary">
      <h1>Glossary</h1>
      <p class="intro">Learn roller derby terminology. Search for a term or practice with flashcards.</p>

      <div class="controls">
        <div class="search-box">
          <label for="search-input" class="visually-hidden">Search terms</label>
          <input
            id="search-input"
            type="search"
            placeholder="Search terms..."
            [value]="glossaryService.searchQuery()"
            (input)="onSearch($event)"
          />
        </div>
        <button
          class="mode-btn"
          [class.active]="flashcardMode()"
          (click)="toggleFlashcardMode()"
        >
          {{ flashcardMode() ? 'List View' : 'Flashcard Mode' }}
        </button>
      </div>

      @if (flashcardMode()) {
        @if (currentCard(); as card) {
          <div class="flashcard-container">
            <div
              class="flashcard"
              [class.flipped]="cardFlipped()"
              (click)="flipCard()"
              (keydown.enter)="flipCard()"
              (keydown.space)="flipCard()"
              tabindex="0"
              role="button"
              [attr.aria-label]="cardFlipped() ? 'Definition: ' + card.definition : 'Term: ' + card.term + '. Press to reveal definition.'"
            >
              <div class="card-front">
                <span class="card-label">Term</span>
                <h2>{{ card.term }}</h2>
                <span class="card-hint">Tap to reveal</span>
              </div>
              <div class="card-back">
                <span class="card-label">Definition</span>
                <p>{{ card.definition }}</p>
              </div>
            </div>

            <div class="flashcard-actions">
              <button class="action-btn study" (click)="nextCard(false)">Study More</button>
              <button class="action-btn know" (click)="nextCard(true)">Got It!</button>
            </div>

            <p class="card-count" aria-live="polite">
              Card {{ cardIndex() + 1 }} of {{ flashcardDeck().length }}
            </p>
          </div>
        } @else {
          <p class="empty-state">All terms mastered! Great job!</p>
        }
      } @else {
        <div class="terms-list" role="list">
          @for (term of glossaryService.filteredTerms(); track term.id) {
            <div class="term-card" role="listitem">
              <button
                class="term-header"
                (click)="toggleTerm(term.id)"
                [attr.aria-expanded]="expandedTerm() === term.id"
              >
                <h2>{{ term.term }}</h2>
                @if (isMastered(term.id)) {
                  <span class="mastered-badge" aria-label="Mastered">&#10003;</span>
                }
              </button>
              @if (expandedTerm() === term.id) {
                <div class="term-content">
                  <p>{{ term.definition }}</p>
                  @if (term.ruleReferences?.length) {
                    <div class="references">
                      <strong>Rules:</strong> {{ term.ruleReferences!.join(', ') }}
                    </div>
                  }
                </div>
              }
            </div>
          } @empty {
            <p class="empty-state">No terms match your search.</p>
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

    h1 {
      font-size: var(--font-size-2xl);
      color: var(--color-primary);
    }

    .intro {
      color: var(--color-text-secondary);
    }

    .controls {
      display: flex;
      gap: var(--space-md);
      flex-wrap: wrap;
    }

    .search-box {
      flex: 1;
      min-width: 200px;

      input {
        width: 100%;
        padding: var(--space-sm) var(--space-md);
        border: 2px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-base);
        min-height: var(--touch-target);

        &:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);
        }
      }
    }

    .mode-btn {
      padding: var(--space-sm) var(--space-lg);
      background: var(--color-secondary);
      color: #fff;
      border-radius: var(--radius-sm);
      font-weight: 600;
      min-height: var(--touch-target);

      &:hover {
        background: var(--color-secondary-light);
      }

      &.active {
        background: var(--color-primary);
      }
    }

    .terms-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .term-card {
      background: var(--color-surface);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
    }

    .term-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: var(--space-md) var(--space-lg);
      text-align: left;
      min-height: var(--touch-target);

      h2 {
        font-size: var(--font-size-base);
        font-weight: 600;
      }

      &:hover {
        background: var(--color-border-light);
      }
    }

    .mastered-badge {
      color: var(--color-success);
      font-size: var(--font-size-lg);
      font-weight: 700;
    }

    .term-content {
      padding: 0 var(--space-lg) var(--space-lg);
      line-height: 1.7;

      .references {
        margin-top: var(--space-sm);
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
      }
    }

    // Flashcard styles
    .flashcard-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-lg);
    }

    .flashcard {
      width: 100%;
      max-width: 500px;
      min-height: 250px;
      perspective: 1000px;
      cursor: pointer;
      position: relative;

      .card-front,
      .card-back {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-md);
        padding: var(--space-xl);
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
        backface-visibility: hidden;
        transition: transform 0.5s;
        text-align: center;
      }

      .card-front {
        h2 {
          font-size: var(--font-size-2xl);
          color: var(--color-primary);
        }
      }

      .card-back {
        transform: rotateY(180deg);

        p {
          font-size: var(--font-size-base);
          line-height: 1.6;
        }
      }

      &.flipped {
        .card-front {
          transform: rotateY(180deg);
        }
        .card-back {
          transform: rotateY(0);
        }
      }
    }

    .card-label {
      font-size: var(--font-size-xs);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-text-muted);
    }

    .card-hint {
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
    }

    .flashcard-actions {
      display: flex;
      gap: var(--space-md);
    }

    .action-btn {
      padding: var(--space-sm) var(--space-xl);
      border-radius: var(--radius-sm);
      font-weight: 600;
      min-height: var(--touch-target);
      color: #fff;

      &.study {
        background: var(--color-accent);
        &:hover { background: var(--color-accent-light); }
      }
      &.know {
        background: var(--color-success);
        &:hover { opacity: 0.9; }
      }
    }

    .card-count {
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
    }

    .empty-state {
      text-align: center;
      padding: var(--space-2xl);
      color: var(--color-text-muted);
      font-size: var(--font-size-lg);
    }
  `,
})
export class GlossaryComponent {
  protected readonly glossaryService = inject(GlossaryService);
  private readonly progressService = inject(ProgressService);

  protected readonly flashcardMode = signal(false);
  protected readonly expandedTerm = signal<string | null>(null);
  protected readonly cardFlipped = signal(false);
  protected readonly cardIndex = signal(0);
  protected readonly flashcardDeck = signal<GlossaryTerm[]>([]);

  protected readonly currentCard = () => {
    const deck = this.flashcardDeck();
    const idx = this.cardIndex();
    return deck[idx] ?? null;
  };

  protected onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.glossaryService.setSearchQuery(value);
  }

  protected toggleFlashcardMode(): void {
    const entering = !this.flashcardMode();
    this.flashcardMode.set(entering);
    if (entering) {
      const mastered = this.progressService.progress().masteredTermIds;
      this.flashcardDeck.set(this.glossaryService.getRandomTerms(20, mastered));
      this.cardIndex.set(0);
      this.cardFlipped.set(false);
    }
  }

  protected toggleTerm(termId: string): void {
    if (this.expandedTerm() === termId) {
      this.expandedTerm.set(null);
    } else {
      this.expandedTerm.set(termId);
      this.progressService.markTermViewed(termId);
    }
  }

  protected flipCard(): void {
    this.cardFlipped.update((v) => !v);
  }

  protected nextCard(mastered: boolean): void {
    const card = this.currentCard();
    if (card) {
      if (mastered) {
        this.progressService.markTermMastered(card.id);
      }
    }
    const nextIdx = this.cardIndex() + 1;
    if (nextIdx < this.flashcardDeck().length) {
      this.cardIndex.set(nextIdx);
      this.cardFlipped.set(false);
    } else {
      // Reshuffle remaining
      const mastered2 = this.progressService.progress().masteredTermIds;
      const remaining = this.glossaryService.getRandomTerms(20, mastered2);
      this.flashcardDeck.set(remaining);
      this.cardIndex.set(0);
      this.cardFlipped.set(false);
    }
  }

  protected isMastered(termId: string): boolean {
    return this.progressService.progress().masteredTermIds.includes(termId);
  }
}
