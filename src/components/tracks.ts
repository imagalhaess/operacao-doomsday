import { tracks } from '../data/tracks';
import { getProgress } from '../state/store';
import { getTrackStats } from '../state/stats';
import {
  coopState,
  getP1Character,
  getP2Character,
  getPlayerPosition
} from '../state/coop';
import { getTrailIcon } from './trail-icons';
import { importanceClass, escapeHtml } from '../utils';
import type { Track } from '../data/types';

export function renderTracksPage(): string {
  const p1 = getP1Character();
  const p2 = getP2Character();

  const p1Pos = getPlayerPosition();
  const p2Pos = getPlayerPosition(coopState.p2Progress);

  const diffTitles = p1Pos.index - p2Pos.index;
  let syncStatusText = 'Modo Solo ativo';
  if (coopState.enabled) {
    if (coopState.p2Connected) {
      if (diffTitles === 0) {
        syncStatusText = 'Vocês estão assistindo juntos no mesmo ponto!';
      } else if (diffTitles > 0) {
        syncStatusText = `${p1.name} está ${diffTitles} título${diffTitles > 1 ? 's' : ''} à frente de ${p2.name}`;
      } else {
        syncStatusText = `${p2.name} está ${Math.abs(diffTitles)} título${Math.abs(diffTitles) > 1 ? 's' : ''} à frente de ${p1.name}`;
      }
    } else {
      syncStatusText = coopState.roomId
        ? `Aguardando parceiro na Sala: ${coopState.roomId}`
        : 'Maratona em Dupla habilitada (offline/local)';
    }
  }

  const coopBannerHtml = `
    <div class="coop-banner">
      <div class="coop-players">
        <!-- Player 1 -->
        <div class="player-card">
          <div class="player-avatar-wrap" data-action="open-char-select" data-player="1" title="Clique para trocar de herói">
            ${p1.avatarSvg}
          </div>
          <div class="player-info">
            <strong>${p1.name} <span class="badge ${importanceClass('ESSENCIAL')}">${p1.badge}</span></strong>
            <span>Posição: ${escapeHtml(p1Pos.item.title)}</span>
          </div>
        </div>

        ${
          coopState.enabled
            ? `
          <div class="coop-vs">⚡ VS ⚡</div>
          <!-- Player 2 -->
          <div class="player-card">
            <div class="player-avatar-wrap p2" data-action="open-char-select" data-player="2" title="Clique para trocar de parceiro">
              ${p2.avatarSvg}
            </div>
            <div class="player-info">
              <strong>${p2.name} <span class="badge ${importanceClass('COMPLEMENTAR')}">${p2.badge}</span></strong>
              <span>Posição: ${escapeHtml(p2Pos.item.title)}</span>
            </div>
          </div>
        `
            : ''
        }
      </div>

      <div class="coop-actions">
        <span class="mono muted" style="font-size: 11px;">${syncStatusText}</span>
        <button class="ghost-button" data-action="open-char-select" data-player="1">Trocar Herói</button>
        <button class="primary-button" data-action="open-coop-modal">
          ${coopState.enabled ? '👥 Painel da Dupla' : '👥 Jogar em Dupla'}
        </button>
      </div>
    </div>
  `;

  // Render narrative tracks along the trail
  const trailHtml = tracks
    .map((track) => renderTrackSection(track, p1Pos.item.id, p2Pos.item.id, p1.badge, p2.badge))
    .join('');

  return `
    <div class="trail-container">
      <div class="trail-header">
        <div class="eyebrow">Caminho da Missão / Trilha Viva</div>
        <h1>A Trilha Marvel</h1>
        <p class="lede">Percorra o multiverso com seu herói escolhido. Cada título concluído acende o circuito da jornada rumo ao Juízo Final.</p>
      </div>

      ${coopBannerHtml}

      <div class="trail-roadmap">
        ${trailHtml}
      </div>
    </div>
  `;
}

function renderTrackSection(
  track: Track,
  p1CurrentId: string,
  p2CurrentId: string,
  p1Badge: string,
  p2Badge: string
): string {
  const stats = getTrackStats(track.id);

  const nodesHtml = track.items
    .map((item) => {
      const p = getProgress(item.id);
      const isP1Here = item.id === p1CurrentId;
      const isP2Here = coopState.enabled && item.id === p2CurrentId;

      return `
        <article class="trail-node ${p.status}" data-item-id="${item.id}">
          <!-- Player Tokens if standing on this node -->
          ${
            isP1Here || isP2Here
              ? `
            <div class="player-token-anchor">
              ${isP1Here ? `<div class="player-token p1" title="Seu herói está aqui">${p1Badge}</div>` : ''}
              ${isP2Here ? `<div class="player-token p2" title="Seu parceiro está aqui">${p2Badge}</div>` : ''}
            </div>
          `
              : ''
          }

          <!-- Thematic Animated Movie Emblem -->
          <div class="trail-station" title="${item.title}">
            ${getTrailIcon(item.id)}
            ${p.status === 'watched' ? '<span class="trail-station-check">✓</span>' : ''}
          </div>

          <!-- Movie Info -->
          <div class="trail-node-info">
            <h4>${item.title}</h4>
            <div class="meta">
              <span>${item.year}</span> · 
              <span>${item.type}</span> · 
              <span class="badge ${importanceClass(item.importance)}">${item.importance}</span>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="card-actions">
            <button class="small-button" data-action="open-detail" data-id="${item.id}">Dossiê</button>
            <button
              class="small-button ${p.status === 'watched' ? 'selected' : ''}"
              data-action="quick-status"
              data-id="${item.id}"
              data-status="watched"
              aria-label="Marcar ${escapeHtml(item.title)} como assistido"
              title="${p.status === 'watched' ? 'Clique para desmarcar' : 'Marcar como assistido'}"
            >✓</button>
            <button
              class="small-button ${p.status === 'skipped' ? 'selected' : ''}"
              data-action="quick-status"
              data-id="${item.id}"
              data-status="skipped"
              aria-label="Marcar ${escapeHtml(item.title)} como conhecido por resumo"
              title="${p.status === 'skipped' ? 'Clique para desmarcar' : 'Conhecido por resumo'}"
            >R</button>
          </div>
        </article>
      `;
    })
    .join('');

  return `
    <section class="trail-track-section">
      <div class="trail-track-badge">
        <span>TRILHA ${track.number}</span> — <span>${track.name}</span> (${track.period}) · ${stats.watched}/${stats.total} CONCLUÍDOS
      </div>
      <div class="trail-nodes-wrapper">
        ${nodesHtml}
      </div>
    </section>
  `;
}
