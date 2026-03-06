import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RulesService } from '../../services/rules.service';
import { ProgressService } from '../../services/progress.service';
import { JrdaBadgeComponent } from '../../shared/components/jrda-badge/jrda-badge.component';
import { Rule } from '../../models/rule';

@Component({
  selector: 'app-rule-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, JrdaBadgeComponent],
  template: `
    <div class="rule-section">
      @if (section(); as s) {
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a routerLink="/rules">Rules</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ s.number }}. {{ s.title }}</span>
        </nav>

        <h1>
          <span class="section-icon" aria-hidden="true">{{ s.icon }}</span>
          {{ s.number }}. {{ s.title }}
        </h1>
        <p class="description">{{ s.description }}</p>

        <div class="rules-list">
          @for (rule of s.rules; track rule.id) {
            <div class="rule-item" [class.read]="isRead(rule.id)">
              <button
                class="rule-header"
                (click)="toggleExpanded(rule.id)"
                [attr.aria-expanded]="isExpanded(rule.id)"
                [attr.aria-controls]="'rule-' + rule.id"
              >
                <span class="rule-number">{{ rule.number }}</span>
                <span class="rule-title">{{ rule.title }}</span>
                @if (rule.jrdaAddendum) {
                  <app-jrda-badge />
                }
                <span class="expand-icon" aria-hidden="true">
                  {{ isExpanded(rule.id) ? '\u25B2' : '\u25BC' }}
                </span>
              </button>

              @if (isExpanded(rule.id)) {
                <div [id]="'rule-' + rule.id" class="rule-content">
                  <p>{{ rule.content }}</p>

                  @if (rule.jrdaAddendum) {
                    <div class="jrda-addendum">
                      <app-jrda-badge />
                      <p>{{ rule.jrdaAddendum }}</p>
                    </div>
                  }

                  @if (rule.subrules?.length) {
                    <div class="subrules">
                      @for (sub of rule.subrules; track sub.id) {
                        <div class="subrule">
                          <strong>{{ sub.number }}</strong> {{ sub.content }}
                          @if (sub.jrdaAddendum) {
                            <div class="jrda-addendum">
                              <app-jrda-badge />
                              <p>{{ sub.jrdaAddendum }}</p>
                            </div>
                          }
                        </div>
                      }
                    </div>
                  }

                  @if (!isRead(rule.id)) {
                    <button class="mark-read-btn" (click)="markRead(rule.id)">
                      Mark as read
                    </button>
                  } @else {
                    <span class="read-badge">Read</span>
                  }
                </div>
              }
            </div>
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

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);

      a {
        color: var(--color-primary);
      }
    }

    h1 {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      font-size: var(--font-size-2xl);
      color: var(--color-primary);
    }

    .section-icon {
      font-size: var(--font-size-3xl);
    }

    .description {
      color: var(--color-text-secondary);
    }

    .rules-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .rule-item {
      background: var(--color-surface);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      overflow: hidden;

      &.read {
        border-left: 3px solid var(--color-success);
      }
    }

    .rule-header {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      width: 100%;
      padding: var(--space-md) var(--space-lg);
      text-align: left;
      min-height: var(--touch-target);

      &:hover {
        background: var(--color-border-light);
      }
    }

    .rule-number {
      font-family: var(--font-heading);
      font-weight: 700;
      color: var(--color-primary);
      flex-shrink: 0;
    }

    .rule-title {
      flex: 1;
      font-weight: 600;
    }

    .expand-icon {
      font-size: var(--font-size-xs);
      color: var(--color-text-muted);
    }

    .rule-content {
      padding: 0 var(--space-lg) var(--space-lg);
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      line-height: 1.7;
    }

    .jrda-addendum {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      padding: var(--space-md);
      background: var(--color-jrda-bg);
      border-left: 3px solid var(--color-jrda-border);
      border-radius: var(--radius-sm);
    }

    .subrules {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      padding-left: var(--space-lg);
    }

    .subrule {
      padding: var(--space-sm) 0;
      border-bottom: 1px solid var(--color-border-light);

      &:last-child {
        border-bottom: none;
      }
    }

    .mark-read-btn {
      align-self: flex-start;
      padding: var(--space-sm) var(--space-md);
      background: var(--color-primary);
      color: #fff;
      border-radius: var(--radius-sm);
      font-weight: 600;
      font-size: var(--font-size-sm);
      min-height: var(--touch-target);

      &:hover {
        background: var(--color-primary-dark);
      }
    }

    .read-badge {
      display: inline-block;
      padding: var(--space-xs) var(--space-sm);
      background: color-mix(in srgb, var(--color-success) 15%, transparent);
      color: var(--color-success);
      border-radius: var(--radius-sm);
      font-size: var(--font-size-sm);
      font-weight: 600;
      align-self: flex-start;
    }
  `,
})
export class RuleSectionComponent {
  readonly sectionId = input.required<string>();

  private readonly rulesService = inject(RulesService);
  private readonly progressService = inject(ProgressService);
  private readonly expandedRules = signal<Set<string>>(new Set());

  protected readonly section = computed(() => {
    const id = this.sectionId();
    return this.rulesService.sections().find((s) => s.id === id);
  });

  protected isExpanded(ruleId: string): boolean {
    return this.expandedRules().has(ruleId);
  }

  protected toggleExpanded(ruleId: string): void {
    this.expandedRules.update((set) => {
      const next = new Set(set);
      if (next.has(ruleId)) {
        next.delete(ruleId);
      } else {
        next.add(ruleId);
      }
      return next;
    });
  }

  protected isRead(ruleId: string): boolean {
    return this.progressService.progress().readRuleIds.includes(ruleId);
  }

  protected markRead(ruleId: string): void {
    this.progressService.markRuleRead(ruleId);
  }
}
