import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RulesService } from '../../services/rules.service';
import { SkillLevelService } from '../../services/skill-level.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { RuleSection } from '../../models/rule';

@Component({
  selector: 'app-rules-browser',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    <section class="rules-browser">
      <header class="page-head">
        <div class="kicker">03 · Rules Browser</div>
        <h1>Official JRDA Rules</h1>
        <p class="intro">
          Filtered for {{ currentLevel() }} · {{ sections().length }} section{{ sections().length === 1 ? '' : 's' }}
        </p>
      </header>

      <div class="section-list">
        @for (s of sections(); track s.id; let i = $index) {
          <a
            [routerLink]="['/rules', s.id]"
            class="section-card"
            [attr.aria-label]="'Section ' + s.number + ': ' + s.title"
          >
            <div class="num-plate" [class.even]="i % 2 === 0" [class.odd]="i % 2 === 1">
              <span class="num">{{ s.number }}</span>
            </div>
            <div class="card-body">
              <div class="body-text">
                <div class="kicker kicker-muted">Section {{ s.number }}</div>
                <h3>{{ s.title }}</h3>
                <p>{{ s.description }}</p>
                <div class="chip-row">
                  <span class="chip chip-neutral">
                    {{ s.rules.length }} rule{{ s.rules.length === 1 ? '' : 's' }}
                  </span>
                  @if (hasAnyJrda(s)) {
                    <span class="chip chip-gold">Has JRDA addendum</span>
                  }
                </div>
              </div>
              <app-icon name="arrow-right" [size]="22" [strokeWidth]="2.2" />
            </div>
          </a>
        }
      </div>
    </section>
  `,
  styles: `
    .rules-browser {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
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

    .kicker-muted {
      color: var(--color-text-muted);
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

    /* List */
    .section-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .section-card {
      display: flex;
      padding: 0;
      overflow: hidden;
      background: var(--color-surface);
      border: var(--stroke) solid var(--color-border-strong);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-hard);
      color: var(--color-text);
      text-decoration: none;
      transition: transform 0.08s, box-shadow 0.08s;

      &:hover {
        transform: translate(1px, 1px);
        box-shadow: 0 1px 0 rgba(11, 16, 38, 0.9);
        text-decoration: none;
      }
    }

    .num-plate {
      width: 96px;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      border-right: var(--stroke) solid var(--color-border-strong);
    }

    .num-plate.even { background: var(--color-primary); }
    .num-plate.odd { background: var(--color-text); }

    .num-plate::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image: repeating-linear-gradient(
        45deg,
        transparent 0 8px,
        rgba(255, 255, 255, 0.08) 8px 10px
      );
      pointer-events: none;
    }

    .num-plate .num {
      position: relative;
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 3.5rem;
      line-height: 1;
      letter-spacing: -0.04em;
    }

    .card-body {
      flex: 1;
      min-width: 0;
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: var(--space-md);
    }

    .body-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .body-text h3 {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.375rem;
      letter-spacing: -0.015em;
      color: var(--color-text);
      margin: 0;
      line-height: 1.15;
    }

    .body-text p {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      margin: 2px 0 0;
      line-height: 1.5;
    }

    .chip-row {
      margin-top: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
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

    .chip-neutral {
      background: var(--color-surface-alt);
      color: var(--color-text);
    }

    .chip-gold {
      background: var(--color-jrda-bg);
      color: var(--color-text);
    }
  `,
})
export class RulesBrowserComponent {
  private readonly rulesService = inject(RulesService);
  private readonly skillLevelService = inject(SkillLevelService);

  protected readonly sections = this.rulesService.sections;
  protected readonly currentLevel = this.skillLevelService.level;

  protected hasAnyJrda(section: RuleSection): boolean {
    return section.rules.some(
      (r) => !!r.jrdaAddendum || (r.subrules ?? []).some((s) => !!s.jrdaAddendum)
    );
  }
}
