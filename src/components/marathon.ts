import { allItems, tracks } from '../data/tracks';
import { getDisneyPlusLink } from '../data/links';
import { getProgress } from '../state/store';
import { ui } from '../state/ui';
import { statusLabel, importanceClass, escapeHtml, formatDate } from '../utils';
import { renderPoster } from './poster';
import { renderMcuIcon } from './mcu-icons';
import type { EnrichedItem } from '../data/types';

export function renderTitleCard(item: EnrichedItem): string {
  const p = getProgress(item.id);

  return `
    <article class="title-card" data-item-id="${item.id}">
      ${renderPoster(item)}
      <div class="card-main">
        <div>
          <span class="status-dot ${p.status}"></span>
          <span class="badge ${importanceClass(item.importance)}">${item.importance}</span>
          <h3>${item.title}</h3>
          <div class="original-title">${item.original}</div>
        </div>
        <div class="card-meta">
          ${statusLabel(p.status)}${p.watchedAt ? ` · ${formatDate(p.watchedAt)}` : ''}
        </div>
        <div class="card-actions">
          <button
            class="pixel-action-btn pixel-action-btn--dossier"
            data-action="open-detail"
            data-id="${item.id}"
            title="Abrir dossiê completo (história, conexões e links)"
          >
            ${renderMcuIcon('dossier', 14)}
            <span>Dossiê</span>
          </button>
          <button
            class="pixel-action-btn ${p.status === 'watched' ? 'active-watched' : ''}"
            data-action="quick-status"
            data-id="${item.id}"
            data-status="watched"
            aria-pressed="${p.status === 'watched'}"
            aria-label="Marcar ${escapeHtml(item.title)} como assistido"
            title="${p.status === 'watched' ? '⚡ Já assistido — clique para desmarcar' : '⚡ Marcar como assistido (+100 XP)'}"
          >
            ${renderMcuIcon('reactor', 14)}
            <span>Já assisti</span>
          </button>
          <button
            class="pixel-action-btn ${p.status === 'skipped' ? 'active-skipped' : ''}"
            data-action="quick-status"
            data-id="${item.id}"
            data-status="skipped"
            aria-pressed="${p.status === 'skipped'}"
            aria-label="Marcar que li o resumo de ${escapeHtml(item.title)}"
            title="${p.status === 'skipped' ? '👁️ Resumo lido — clique para desmarcar' : '👁️ Li o resumo (dispensa assistir)'}"
          >
            ${renderMcuIcon('eye', 14)}
            <span>Li o resumo</span>
          </button>
          <a
            href="${getDisneyPlusLink(item)}"
            target="_blank"
            rel="noopener noreferrer"
            class="pixel-action-btn pixel-action-btn--disney"
            title="Abrir ${escapeHtml(item.title)} no Disney+"
          >
            <span class="mcu-pixel-icon" aria-hidden="true">▶</span>
            <span>Assistir no Disney+</span>
          </a>
        </div>
      </div>
    </article>
  `;
}

export function renderMarathon(): string {
  let items = allItems.filter((item) => {
    const matchSearch =
      !ui.search ||
      `${item.title} ${item.original}`.toLowerCase().includes(ui.search.toLowerCase());
    const matchStatus = ui.status === 'all' || getProgress(item.id).status === ui.status;
    const matchImportance = ui.importance === 'all' || item.importance === ui.importance;
    const matchTrack = ui.track === 'all' || item.trackId === ui.track;
    return matchSearch && matchStatus && matchImportance && matchTrack;
  });

  if (ui.sort === 'release') {
    items.sort((a, b) => a.year - b.year || a.trackNumber.localeCompare(b.trackNumber));
  } else if (ui.sort === 'title') {
    items.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
  } else if (ui.sort === 'pending') {
    items = items.filter((item) => getProgress(item.id).status === 'pending');
  }

  const trackOptions = tracks
    .map(
      (t) =>
        `<option value="${t.id}" ${ui.track === t.id ? 'selected' : ''}>Trilha ${t.number} — ${t.name}</option>`
    )
    .join('');

  return `
    <div class="eyebrow">Catálogo operacional</div>
    <h1>Minha maratona</h1>
    <p class="lede">Filtre por prioridade, encontre um título e registre sua própria rota. Cada card abre um resumo completo para quando assistir não for a melhor opção.</p>

    <div class="toolbar">
      <div class="search-wrap">
        <span class="search-icon">⌕</span>
        <input class="field" data-filter="search" value="${escapeHtml(ui.search)}" placeholder="Pesquisar por nome..." aria-label="Pesquisar por nome">
      </div>
      <select data-filter="track" aria-label="Filtrar por trilha">
        <option value="all" ${ui.track === 'all' ? 'selected' : ''}>Todas as trilhas</option>
        ${trackOptions}
      </select>
      <select data-filter="status" aria-label="Filtrar por status">
        <option value="all" ${ui.status === 'all' ? 'selected' : ''}>Todos os status</option>
        <option value="pending" ${ui.status === 'pending' ? 'selected' : ''}>○ Pendentes (não assistidos)</option>
        <option value="watched" ${ui.status === 'watched' ? 'selected' : ''}>⚡ Já assistidos</option>
        <option value="skipped" ${ui.status === 'skipped' ? 'selected' : ''}>👁️ Li o resumo</option>
        <option value="partial" ${ui.status === 'partial' ? 'selected' : ''}>⏳ Vi uma parte</option>
      </select>
      <select data-filter="importance" aria-label="Filtrar por importância">
        <option value="all" ${ui.importance === 'all' ? 'selected' : ''}>Toda importância</option>
        <option value="ESSENCIAL" ${ui.importance === 'ESSENCIAL' ? 'selected' : ''}>Essenciais</option>
        <option value="COMPLEMENTAR" ${ui.importance === 'COMPLEMENTAR' ? 'selected' : ''}>Complementares</option>
        <option value="OPCIONAL" ${ui.importance === 'OPCIONAL' ? 'selected' : ''}>Opcionais</option>
      </select>
      <select data-filter="sort" aria-label="Ordenar resultados">
        <option value="release" ${ui.sort === 'release' ? 'selected' : ''}>Ordem de lançamento</option>
        <option value="title" ${ui.sort === 'title' ? 'selected' : ''}>Ordem alfabética</option>
        <option value="pending" ${ui.sort === 'pending' ? 'selected' : ''}>Somente pendentes</option>
      </select>
    </div>

    <div class="filter-summary">
      <span>${items.length} resultado${items.length === 1 ? '' : 's'} no catálogo curado</span>
      <div class="filter-pills">
        <span class="filter-pill">⚡ Já assistidos</span>
        <span class="filter-pill">👁️ Li o resumo</span>
        <span class="filter-pill">○ Pendente</span>
      </div>
    </div>

    ${
      items.length
        ? `<div class="title-grid">${items.map(renderTitleCard).join('')}</div>`
        : '<div class="empty">Nenhum dossiê encontrado com esses filtros.</div>'
    }
  `;
}

