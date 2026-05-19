import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ContentLoaderService } from '../../../services/content-loader.service';

/** Badge marking a rule as specific to / modified by the active ruleset. */
@Component({
  selector: 'app-ruleset-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (badge(); as b) {
      <span class="badge" [attr.aria-label]="b.label + ' addendum'">{{ b.label }}</span>
    }
  `,
  styles: `
    .badge {
      display: inline-block;
      padding: 2px 8px;
      background: var(--color-ruleset-badge);
      color: #212529;
      font-family: var(--font-heading);
      font-size: var(--font-size-xs);
      font-weight: 700;
      border-radius: var(--radius-sm);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `,
})
export class RulesetBadgeComponent {
  private readonly content = inject(ContentLoaderService);
  protected readonly badge = computed(() => this.content.activeManifest()?.badge);
}
