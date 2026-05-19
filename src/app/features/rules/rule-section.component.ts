import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RulesService } from '../../services/rules.service';
import { ProgressService } from '../../services/progress.service';
import { ContentLoaderService } from '../../services/content-loader.service';
import { RulesetBadgeComponent } from '../../shared/components/ruleset-badge/ruleset-badge.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { Rule, RuleSection } from '../../models/rule';

@Component({
  selector: 'app-rule-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RulesetBadgeComponent, IconComponent],
  template: `
    <div class="rule-section">
      @if (section(); as s) {
        <nav class="crumbs" aria-label="Breadcrumb">
          <a routerLink="/rules">Rules</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ s.number }}. {{ s.title }}</span>
        </nav>

        <header class="page-head">
          <div class="kicker">Section {{ s.number }}</div>
          <h1>{{ s.title }}</h1>
          <p class="description">{{ s.description }}</p>
        </header>

        <div class="rules-list">
          @for (rule of s.rules; track rule.id) {
            @let open = isExpanded(rule.id);
            @let read = isRead(rule.id);
            <article
              [id]="'rule-' + rule.id"
              class="rule-item"
              [class.read]="read"
              [class.open]="open"
            >
              <button
                type="button"
                class="rule-header"
                (click)="toggleExpanded(rule.id)"
                [attr.aria-expanded]="open"
                [attr.aria-controls]="'rule-body-' + rule.id"
              >
                <span class="rule-num">{{ rule.number }}</span>
                <span class="rule-title">{{ rule.title }}</span>
                @if (rule._meta?.hasAddendum) {
                  <span class="chip chip-gold">{{ badgeLabel() }}</span>
                }
                <app-icon
                  [name]="open ? 'chev-up' : 'chev-down'"
                  [size]="18"
                  [strokeWidth]="2.2"
                />
              </button>

              @if (open) {
                <div [id]="'rule-body-' + rule.id" class="rule-body">
                  <p class="rule-content">{{ rule.content }}</p>

                  @if (rule._meta?.hasAddendum) {
                    <aside class="jrda-callout">
                      <app-ruleset-badge />
                      <p>{{ rule._meta?.addendumText }}</p>
                    </aside>
                  }

                  @if (rule.subrules?.length) {
                    <div class="subrules">
                      @for (sub of rule.subrules; track sub.id) {
                        <div [id]="'rule-' + sub.id" class="subrule">
                          <div class="subrule-head">
                            <span class="subrule-num">{{ sub.number }}</span>
                            @if (sub.title) {
                              <span class="subrule-title">{{ sub.title }}</span>
                            }
                          </div>
                          <p class="subrule-content">{{ sub.content }}</p>
                          @if (sub._meta?.hasAddendum) {
                            <aside class="jrda-callout">
                              <app-ruleset-badge />
                              <p>{{ sub._meta?.addendumText }}</p>
                            </aside>
                          }
                        </div>
                      }
                    </div>
                  }

                  <div class="rule-actions">
                    @if (read) {
                      <span class="pill pill-success">
                        <app-icon name="check" [size]="14" [strokeWidth]="2.5" />
                        Read
                      </span>
                    } @else {
                      <button
                        type="button"
                        class="pill pill-accent"
                        (click)="markRead(rule.id)"
                      >
                        <app-icon name="check" [size]="14" [strokeWidth]="2.5" />
                        Mark as read
                      </button>
                    }
                  </div>
                </div>
              }
            </article>
          }
        </div>
      } @else {
        <p>Section not found.</p>
        <a routerLink="/rules">Back to Rules</a>
      }
    </div>
  `,
  styles: `
    .rule-section {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    /* Crumbs */
    .crumbs {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      color: var(--color-text-muted);

      a {
        color: var(--color-primary);
        text-decoration: none;

        &:hover { text-decoration: underline; }
      }
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

    .description {
      color: var(--color-text-secondary);
      margin: 0;
    }

    /* Rule list */
    .rules-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .rule-item {
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      overflow: hidden;
      transition: box-shadow 0.08s;

      &.read {
        box-shadow: none;
        border-left-width: 6px;
        border-left-color: var(--color-success);
      }
    }

    .rule-header {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      min-height: 52px;
      background: transparent;
      border: none;
      text-align: left;
      cursor: pointer;

      &:hover { background: var(--color-surface-alt); }
    }

    .rule-num {
      flex-shrink: 0;
      padding: 4px 8px;
      background: var(--color-text);
      color: var(--color-surface);
      border-radius: 4px;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.8125rem;
      letter-spacing: 0.03em;
    }

    .rule-title {
      flex: 1;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1rem;
      color: var(--color-text);
    }

    .rule-body {
      padding: 0 18px 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .rule-content {
      margin: 0;
      font-size: 0.9375rem;
      line-height: 1.65;
      color: var(--color-text-secondary);
    }

    /* JRDA addendum callout */
    .jrda-callout {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      padding: var(--space-md);
      background: var(--color-jrda-bg);
      border-left: 4px solid var(--color-jrda-border);
      border-radius: var(--radius-sm);

      p {
        margin: 0;
        line-height: 1.6;
        color: var(--color-text);
      }
    }

    /* Subrules */
    .subrules {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-left: 16px;
      border-left: 2px dashed var(--color-border);
    }

    .subrule {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .subrule-head {
      display: flex;
      align-items: baseline;
      gap: 8px;
      flex-wrap: wrap;
    }

    .subrule-num {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--color-primary);
      letter-spacing: 0.02em;
    }

    .subrule-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.875rem;
      color: var(--color-text);
    }

    .subrule-content {
      margin: 0;
      font-size: 0.9375rem;
      line-height: 1.6;
      color: var(--color-text-secondary);
    }

    /* Chips + pills */
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: var(--radius-chip);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.625rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border: var(--stroke) solid var(--color-border-strong);
      white-space: nowrap;
    }

    .chip-gold {
      background: var(--color-jrda-bg);
      color: var(--color-text);
    }

    .rule-actions {
      display: flex;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 999px;
      border: var(--stroke) solid var(--color-border-strong);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.75rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      box-shadow: var(--shadow-hard);
      cursor: pointer;

      &:hover:not([disabled]) {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
      }
    }

    .pill-accent {
      background: var(--color-accent);
      color: var(--color-accent-ink);
    }

    .pill-success {
      background: var(--color-success);
      color: #fff;
      cursor: default;
      box-shadow: none;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
  `,
})
export class RuleSectionComponent implements OnInit {
  readonly sectionId = input.required<string>();

  private readonly rulesService = inject(RulesService);
  private readonly progressService = inject(ProgressService);
  private readonly content = inject(ContentLoaderService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly badgeLabel = computed(() => this.content.activeManifest()?.badge?.label ?? '');

  private readonly expandedRules = signal<Set<string>>(new Set());
  private didSeed = false;

  protected readonly section = computed<RuleSection | undefined>(() =>
    this.rulesService.sections().find((s) => s.id === this.sectionId())
  );

  ngOnInit(): void {
    this.seedOnce();
    this.route.fragment
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((fragment) => this.applyFragment(fragment));
  }

  private seedOnce(): void {
    if (this.didSeed) return;
    const s = this.section();
    if (!s?.rules.length) return;

    const fragment = this.route.snapshot.fragment;
    const target = fragment ? this.findByNumber(s, fragment) : null;
    const seedId = target?.id ?? s.rules[0].id;
    this.expandedRules.set(new Set([seedId]));
    this.didSeed = true;

    if (target) {
      queueMicrotask(() => this.scrollToRule(target.id));
    }
  }

  private applyFragment(fragment: string | null): void {
    const s = this.section();
    if (!s || !fragment) return;
    const target = this.findByNumber(s, fragment);
    if (!target) return;
    this.expandedRules.update((set) => {
      if (set.has(target.id)) return set;
      const next = new Set(set);
      next.add(target.id);
      return next;
    });
    queueMicrotask(() => this.scrollToRule(target.id));
  }

  protected isExpanded(ruleId: string): boolean {
    return this.expandedRules().has(ruleId);
  }

  protected toggleExpanded(ruleId: string): void {
    this.expandedRules.update((set) => {
      const next = new Set(set);
      if (next.has(ruleId)) next.delete(ruleId);
      else next.add(ruleId);
      return next;
    });
  }

  protected isRead(ruleId: string): boolean {
    return this.progressService.progress().readRuleIds.includes(ruleId);
  }

  protected markRead(ruleId: string): void {
    this.progressService.markRuleRead(ruleId);
  }

  private findByNumber(section: RuleSection, number: string): Rule | null {
    for (const rule of section.rules) {
      if (rule.number === number) return rule;
      for (const sub of rule.subrules ?? []) {
        if (sub.number === number) return sub;
      }
    }
    return null;
  }

  private scrollToRule(id: string): void {
    const el = document.getElementById('rule-' + id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + rect.top - 80, behavior: 'smooth' });
  }
}
