import { allItems, tracks } from '../data/tracks';
import { getProgress } from '../state/store';
import { ui } from '../state/ui';
import { statusLabel, importanceClass, escapeHtml, formatDate } from '../utils';
import { renderPoster } from './poster';
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
          <button class="small-button" data-action="open-detail" data-id="${item.id}">Abrir dossiê</button>
          <button
            class="small-button ${p.status === 'watched' ? 'selected' : ''}"
            data-action="quick-status"
            data-id="${item.id}"
            data-status="watched"
            aria-label="Marcar ${escapeHtml(item.title)} como assistido"
            title="Marcar como assistido"
          >✓</button>
          <button
            class="small-button ${p.status === 'skipped' ? 'selected' : ''}"
            data-action="quick-status"
            data-id="${item.id}"
            data-status="skipped"
            aria-label="Marcar ${escapeHtml(item.title)} como conhecido por resumo"
            title="Conhecido por resumo"
          >R</button>
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
        <option value="pending" ${ui.status === 'pending' ? 'selected' : ''}>Pendentes</option>
        <option value="watched" ${ui.status === 'watched' ? 'selected' : ''}>Assistidos</option>
        <option value="skipped" ${ui.status === 'skipped' ? 'selected' : ''}>Por resumo</option>
        <option value="partial" ${ui.status === 'partial' ? 'selected' : ''}>Parciais</option>
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
        <span class="filter-pill">✓ assistido</span>
        <span class="filter-pill">R por resumo</span>
        <span class="filter-pill">○ pendente</span>
      </div>
    </div>

    ${
      items.length
        ? `<div class="title-grid">${items.map(renderTitleCard).join('')}</div>`
        : '<div class="empty">Nenhum dossiê encontrado com esses filtros.</div>'
    }
  `;
}

