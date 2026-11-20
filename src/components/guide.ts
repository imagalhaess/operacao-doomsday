import { concepts } from '../data/concepts';
import { ui } from '../state/ui';
import { escapeHtml } from '../utils';

export function renderGuidePage(): string {
  const query = (ui.search || '').toLowerCase();
  const filtered = concepts.filter(
    ([title, text]) =>
      !query || `${title} ${text}`.toLowerCase().includes(query)
  );

  return `
    <div class="eyebrow">Manual de campo</div>
    <h1>Entenda o Universo Marvel</h1>
    <p class="lede">Conceitos curtos para conectar as trilhas sem transformar a maratona em uma prova. Pesquise um termo e abra os títulos relacionados quando quiser aprofundar.</p>

    <div class="search-wrap" style="max-width:540px; margin:24px 0 18px">
      <span class="search-icon">⌕</span>
      <input
        class="field"
        data-filter="guide-search"
        value="${escapeHtml(ui.search)}"
        placeholder="Pesquisar conceito..."
        aria-label="Pesquisar conceito"
      >
    </div>

    <div class="guide-grid">
      ${filtered
        .map(
          ([title, text, related]) => `
        <article class="guide-card">
          <h3>${title}</h3>
          <p>${text}</p>
          <div class="related">
            APARECE EM<br>
            <strong>${related.join(' · ')}</strong>
          </div>
        </article>
      `
        )
        .join('')}
    </div>
  `;
}
