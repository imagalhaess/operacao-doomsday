import { allItems } from '../data/tracks';
import { getProgress } from '../state/store';
import { formatDate, statusLabel, escapeHtml } from '../utils';

export function renderHistoryPage(): string {
  const done = allItems
    .filter((item) => getProgress(item.id).status !== 'pending')
    .sort((a, b) =>
      (getProgress(b.id).watchedAt || '').localeCompare(
        getProgress(a.id).watchedAt || ''
      )
    );

  const historyListHtml = done
    .map((item) => {
      const p = getProgress(item.id);
      return `
        <div class="timeline-item">
          <div class="timeline-year">${p.watchedAt ? formatDate(p.watchedAt) : 'sem data'}</div>
          <div class="timeline-line"></div>
          <div class="timeline-content">
            <div class="track-kicker">${item.trackName}</div>
            <h3>${item.title}</h3>
            <p>
              <span class="status-dot ${p.status}"></span>
              ${statusLabel(p.status)}
              ${p.rating ? ` · ${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)}` : ''}
              ${p.notes ? ` · “${escapeHtml(p.notes)}”` : ''}
            </p>
            <button class="small-button" data-action="open-detail" data-id="${item.id}">Editar registro</button>
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="eyebrow">Registro pessoal</div>
    <h1>Meu histórico</h1>
    <p class="lede">Tudo o que você marcou como assistido, parcial ou conhecido pelo resumo, com data e avaliação.</p>

    <div class="section-head">
      <div>
        <h2>${done.length} registros</h2>
      </div>
      ${
        done.length > 0
          ? `<button class="ghost-button" data-action="reset">Limpar progresso</button>`
          : ''
      }
    </div>

    ${
      done.length
        ? `<div class="timeline">${historyListHtml}</div>`
        : '<div class="empty">Ainda não há registros. Abra um dossiê na maratona para começar.</div>'
    }
  `;
}
