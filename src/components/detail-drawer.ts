import { getProgress } from '../state/store';
import { summaryFor } from '../data/summaries';
import { videoLinks, officialLinks, officialChannel } from '../data/links';
import { importanceClass, escapeHtml } from '../utils';
import type { EnrichedItem, VideoLink } from '../data/types';

function sourceFor(item: EnrichedItem): string {
  return (
    officialLinks[item.id] ||
    (item.type === 'Série'
      ? 'https://www.marvel.com/tv-shows'
      : 'https://www.marvel.com/movies')
  );
}

function videosFor(item: EnrichedItem): VideoLink[] {
  return (
    videoLinks[item.id] || [
      {
        label: 'Canal oficial da Marvel',
        url: officialChannel,
        why: 'Use a busca oficial para encontrar trailers e materiais do título sem depender de fontes não verificadas.'
      }
    ]
  );
}

export function renderDetailDrawer(item: EnrichedItem): string {
  const p = getProgress(item.id);
  const s = summaryFor(item);
  const videos = videosFor(item);

  const statusButtons = [
    ['watched', '⚡ Já assisti', 'Marcar que você assistiu à produção por completo (clique novamente para desmarcar)'],
    ['skipped', '👁️ Já sei a história', 'Você já conhece a trama por resumo ou wiki (clique novamente para desmarcar)'],
    ['partial', '⏳ Vi uma parte', 'Começou a assistir mas ainda não concluiu'],
    ['pending', '○ Não assisti (pendente)', 'Ainda não assistiu nem conhece a história']
  ] as const;

  return `
    <div class="drawer-backdrop" data-action="backdrop-click">
      <aside class="drawer" role="dialog" aria-modal="true" aria-label="Dossiê de ${escapeHtml(item.title)}">
        <div class="drawer-head">
          <div>
            <div class="eyebrow">Dossiê ${item.trackNumber} / ${item.year}</div>
            <h2>${item.title}</h2>
            <div class="original-title">
              ${item.original} · ${item.type} · <span class="badge ${importanceClass(item.importance)}">${item.importance}</span>
            </div>
          </div>
          <button class="icon-button" data-action="close-detail" aria-label="Fechar dossiê" title="Fechar (Esc)">✕</button>
        </div>

        <div class="drawer-section">
          <h3>Status da missão</h3>
          <div class="status-actions">
            ${statusButtons
              .map(
                ([value, label, hint]) => `
              <button
                class="status-action ${p.status === value ? 'active' : ''}"
                data-action="status"
                data-id="${item.id}"
                data-status="${value}"
                title="${p.status === value ? 'Clique novamente para desmarcar e voltar para pendente' : hint}"
              >${label}</button>
            `
              )
              .join('')}
          </div>
          <label class="mono" style="display:block; margin-top:16px; color:var(--muted)">
            DATA EM QUE ASSISTIU
            <input class="field" style="margin-top:7px" type="date" data-date-for="${item.id}" value="${p.watchedAt || ''}">
          </label>
        </div>

        <div class="drawer-section">
          <h3>Resumo para caso não queira assistir</h3>
          <div class="summary-block">
            <p><strong>Contexto inicial.</strong> ${s.context}</p>
            <p><strong>Personagens importantes.</strong> ${s.characters}</p>
            <p><strong>Conflito principal.</strong> ${s.conflict}</p>
            <p><strong>O que efetivamente acontece.</strong> ${s.happens}</p>
            <p><strong>Como termina.</strong> ${s.ending}</p>
            <p><strong>Consequências para o universo.</strong> ${s.consequences}</p>
            <p><strong>Personagens e conceitos introduzidos.</strong> ${s.introduced}</p>
            <p><strong>Conexões com outros títulos.</strong> ${s.connections}</p>
          </div>
        </div>

        <div class="drawer-section">
          <h3>O que você precisa lembrar</h3>
          <ul class="reminder-list">
            <li>${s.consequences}</li>
            <li>${s.connections}</li>
            <li>Classificação editorial da operação: <strong>${item.importance.toLowerCase()}</strong>.</li>
          </ul>
        </div>

        <div class="drawer-section">
          <h3>Avaliação pessoal</h3>
          <div class="star-row" aria-label="Avaliar de 1 a 5 estrelas">
            ${[1, 2, 3, 4, 5]
              .map(
                (n) => `
              <button
                class="star ${n <= p.rating ? 'active' : ''}"
                data-action="rating"
                data-id="${item.id}"
                data-rating="${n}"
                aria-label="${n} estrelas"
              >★</button>
            `
              )
              .join('')}
          </div>
          <textarea data-notes-for="${item.id}" placeholder="Observações pessoais, conexões ou dúvidas...">${escapeHtml(p.notes || '')}</textarea>
          <div class="detail-footer">
            <button class="primary-button" data-action="save-notes" data-id="${item.id}">Salvar observações</button>
          </div>
        </div>

        <div class="drawer-section">
          <h3>Conteúdo visual complementar</h3>
          ${videos
            .map(
              (v) => `
            <a class="video-link" href="${v.url}" target="_blank" rel="noreferrer">
              <span>
                <strong>${v.label}</strong><br>
                <span>${v.why}</span>
              </span>
              <span>↗</span>
            </a>
          `
            )
            .join('')}
          <a class="source-link" href="${sourceFor(item)}" target="_blank" rel="noreferrer">Abrir fonte oficial do título/curadoria ↗</a>
        </div>
      </aside>
    </div>
  `;
}

