import { getDisneyPlusLink } from '../data/links';
import type { TrackItem } from '../data/types';
import { escapeHtml } from '../utils';

export function renderWatchNow(item: TrackItem): string {
  const url = getDisneyPlusLink(item);
  const title = escapeHtml(item.title);

  if (!url) {
    const reason = item.id === 'doomsday'
      ? 'O filme completo ainda não está disponível no Disney+.'
      : 'Link direto do Disney+ ainda não catalogado para este título.';
    return `<span class="watch-unavailable" role="note">${reason}</span>`;
  }

  return `
    <a
      href="${url}"
      target="_blank"
      rel="noopener noreferrer"
      class="pixel-action-btn pixel-action-btn--disney"
      aria-label="Assistir agora: ${title} no Disney+ (abre em nova aba)"
      title="Abrir ${title} no Disney+; pode exigir login e assinatura"
    >
      <span class="mcu-pixel-icon" aria-hidden="true">▶</span>
      <span>Assistir agora</span>
    </a>
  `;
}
