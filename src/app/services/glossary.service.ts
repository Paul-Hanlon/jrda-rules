import { computed, inject, Injectable, signal } from '@angular/core';
import { GLOSSARY_DATA_BY_AGE } from '../data/glossary-data-by-age';
import { GlossaryTerm } from '../models/glossary';
import { ReadingAgeService } from './reading-age.service';

@Injectable({ providedIn: 'root' })
export class GlossaryService {
  private readonly readingAge = inject(ReadingAgeService);
  private readonly _searchQuery = signal('');

  readonly searchQuery = this._searchQuery.asReadonly();

  readonly allTerms = computed<GlossaryTerm[]>(() => {
    const age = this.readingAge.effectiveReadingAge();
    return GLOSSARY_DATA_BY_AGE[age];
  });

  readonly filteredTerms = computed<GlossaryTerm[]>(() => {
    const query = this._searchQuery().toLowerCase().trim();
    if (!query) return this.allTerms();
    return this.allTerms().filter(
      (term) =>
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query)
    );
  });

  setSearchQuery(query: string): void {
    this._searchQuery.set(query);
  }

  getRandomTerms(count: number, excludeIds: string[] = []): GlossaryTerm[] {
    const available = this.allTerms().filter((t) => !excludeIds.includes(t.id));
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  getTerm(id: string): GlossaryTerm | undefined {
    return this.allTerms().find((t) => t.id === id);
  }
}
