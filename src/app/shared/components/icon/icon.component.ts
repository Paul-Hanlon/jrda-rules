import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type IconName =
  | 'home'
  | 'book'
  | 'search'
  | 'question'
  | 'clipboard'
  | 'support'
  | 'star'
  | 'check'
  | 'close'
  | 'chev-right'
  | 'chev-left'
  | 'chev-down'
  | 'chev-up'
  | 'arrow-right'
  | 'plus'
  | 'flag'
  | 'flip'
  | 'whistle'
  | 'skate'
  | 'helmet'
  | 'track'
  | 'user'
  | 'settings'
  | 'bolt'
  | 'trophy'
  | 'target'
  | 'sparkle'
  | 'pencil'
  | 'message'
  | 'mail'
  | 'link'
  | 'share'
  | 'circle'
  | 'shield'
  | 'zap'
  | 'users'
  | 'lock';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
      [innerHTML]="paths()"
    ></svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
      line-height: 0;
    }
  `,
})
export class IconComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly name = input.required<IconName>();
  readonly size = input<number>(22);
  readonly strokeWidth = input<number>(2);

  protected readonly paths = computed<SafeHtml>(() => {
    const map: Record<IconName, string> = {
      home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
      book: '<path d="M4 4.5A1.5 1.5 0 015.5 3H19v16H5.5A1.5 1.5 0 014 17.5v-13z"/><path d="M4 17.5A1.5 1.5 0 015.5 16H19"/><path d="M8 7h7M8 11h5"/>',
      search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.4-4.4"/>',
      question:
        '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 114 2c-.8.6-1.5 1.1-1.5 2.5"/><circle cx="12" cy="17.2" r=".7" fill="currentColor" stroke="none"/>',
      clipboard:
        '<rect x="6" y="4" width="12" height="17" rx="1.5"/><path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/><path d="M9 10h6M9 14h6M9 18h4"/>',
      support:
        '<path d="M18 8h1.5a2.5 2.5 0 010 5H18"/><path d="M5 8h13v5a5 5 0 01-5 5h-3a5 5 0 01-5-5V8z"/><path d="M8 3v2M11 2v2M14 3v2"/>',
      star: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.7 1.2 6.6L12 17.7l-5.9 3 1.2-6.6L2.5 9.4l6.6-.9L12 2.5z"/>',
      check: '<path d="M4 12l5 5 11-11"/>',
      close: '<path d="M6 6l12 12M18 6L6 18"/>',
      'chev-right': '<path d="M9 5l7 7-7 7"/>',
      'chev-left': '<path d="M15 5l-7 7 7 7"/>',
      'chev-down': '<path d="M5 9l7 7 7-7"/>',
      'chev-up': '<path d="M5 15l7-7 7 7"/>',
      'arrow-right': '<path d="M4 12h16"/><path d="M13 5l7 7-7 7"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      flag: '<path d="M5 22V3"/><path d="M5 4s2-1 5-1 5 2 8 2 4-1 4-1v12s-1 1-4 1-5-2-8-2-5 1-5 1"/>',
      flip: '<path d="M3 8l4-4 4 4"/><path d="M7 4v12"/><path d="M21 16l-4 4-4-4"/><path d="M17 20V8"/>',
      whistle:
        '<circle cx="14" cy="13" r="6"/><path d="M14 13l-9-5v-2a1 1 0 011.4-.9L14 8.5"/><circle cx="14" cy="13" r="1.5" fill="currentColor" stroke="none"/>',
      skate:
        '<path d="M3 14h13a4 4 0 014 4v1H3z"/><path d="M3 14V6h3l2 3h3l2-3"/><circle cx="7" cy="19" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none"/><circle cx="17" cy="19" r="1.2" fill="currentColor" stroke="none"/>',
      helmet: '<path d="M4 14a8 8 0 0116 0v3H4z"/><path d="M4 17h16v2H4z"/><path d="M8 10.5l4-4 4 4"/>',
      track: '<ellipse cx="12" cy="12" rx="9.5" ry="6"/><ellipse cx="12" cy="12" rx="5" ry="2.5"/>',
      user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/>',
      settings:
        '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.8.3h0a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v0a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/>',
      bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
      trophy:
        '<path d="M7 4h10v5a5 5 0 01-10 0z"/><path d="M17 6h3v1a3 3 0 01-3 3M7 6H4v1a3 3 0 003 3"/><path d="M9 15h6v3H9zM8 20h8"/>',
      target:
        '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
      sparkle:
        '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
      pencil: '<path d="M4 20h4l11-11-4-4L4 16z"/><path d="M14 6l4 4"/>',
      message: '<path d="M4 5h16v11H8l-4 4z"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
      link: '<path d="M10 14a4 4 0 005.6 0l3-3a4 4 0 00-5.6-5.6L11 7"/><path d="M14 10a4 4 0 00-5.6 0l-3 3a4 4 0 005.6 5.6L13 17"/>',
      share:
        '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
      circle: '<circle cx="12" cy="12" r="8.5"/>',
      shield: '<path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6z"/>',
      zap: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
      users:
        '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/><circle cx="17" cy="9" r="2.8"/><path d="M15 14.5c3 0 6 2.4 6 5.5"/>',
      lock:
        '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/><circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none"/>',
    };
    return this.sanitizer.bypassSecurityTrustHtml(map[this.name()] ?? '');
  });
}
