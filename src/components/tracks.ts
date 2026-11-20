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
import { getPixelSprite } from '../data/pixel-sprites';
import { renderMcuIcon } from './mcu-icons';
import { renderWatchNow } from './watch-now';
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
        syncStatusText = 'Vocês estão lado a lado no mesmo ponto da trilha!';
      } else if (diffTitles > 0) {
        syncStatusText = `${p1.name} está ${diffTitles} título${diffTitles > 1 ? 's' : ''} à frente de ${p2.name}`;
      } else {
        syncStatusText = `${p2.name} está ${Math.abs(diffTitles)} título${Math.abs(diffTitles) > 1 ? 's' : ''} à frente de ${p1.name}`;
      }
    } else {
      syncStatusText = coopState.roomId
        ? `Aguardando parceiro na Sala: ${coopState.roomId}`
        : 'Maratona em Dupla habilitada (modo local)';
    }
  }

  const coopBannerHtml = `
    <div class="coop-banner pixel-box">
      <div class="coop-players">
        <!-- Player 1 -->
        <div class="player-card">
          <div class="player-avatar-wrap" data-action="open-char-select" data-player="1" title="Clique para trocar de herói">
            ${getPixelSprite(p1.id, 32)}
          </div>
          <div class="player-info">
            <strong class="font-pixel">${p1.name} <span class="badge ${importanceClass('ESSENCIAL')}">${p1.badge}</span></strong>
            <span>Posição: ${escapeHtml(p1Pos.item.title)}</span>
          </div>
        </div>

        ${
          coopState.enabled
            ? `
          <div class="coop-vs font-pixel" style="color: #f4bb65;">⚔️ VS ⚔️</div>
          <!-- Player 2 -->
          <div class="player-card">
            <div class="player-avatar-wrap p2" data-action="open-char-select" data-player="2" title="Clique para trocar de parceiro">
              ${getPixelSprite(p2.id, 32)}
            </div>
            <div class="player-info">
              <strong class="font-pixel">${p2.name} <span class="badge ${importanceClass('COMPLEMENTAR')}">${p2.badge}</span></strong>
              <span>Posição: ${escapeHtml(p2Pos.item.title)}</span>
            </div>
          </div>
        `
            : ''
        }
      </div>

      <div class="coop-actions">
        <span class="mono muted font-pixel" style="font-size: 10px;">${syncStatusText}</span>
        <button class="pixel-btn" data-action="open-char-select" data-player="1">Trocar Herói</button>
        <button class="pixel-btn pixel-btn--primary" data-action="open-coop-modal">
          ${coopState.enabled ? '👥 Sala da Dupla' : '👥 Jogar em Dupla'}
        </button>
      </div>
    </div>
  `;

  // Render narrative tracks along the trail
  const trailHtml = tracks
    .map((track) => renderTrackSection(track, p1Pos.item.id, p2Pos.item.id, p1.id, p1.name, p2.id, p2.name))
    .join('');

  return `
    <div class="trail-container">
      <div class="trail-header">
        <div class="eyebrow font-pixel">Caminho da Missão / Trilha 8-Bit</div>
        <h1 class="font-pixel" style="letter-spacing: -0.02em;">A Trilha Marvel</h1>
        <p class="lede">Percorra o multiverso com seu herói pixelado em formato RPG retrô. Cada produção concluída acende o circuito da jornada rumo ao Juízo Final.</p>
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
  p1CharId: string,
  p1Name: string,
  p2CharId: string,
  p2Name: string
): string {
  const stats = getTrackStats(track.id);

  const nodesHtml = track.items
    .map((item) => {
      const p = getProgress(item.id);
      const isP1Here = item.id === p1CurrentId;
      const isP2Here = coopState.enabled && item.id === p2CurrentId;

      return `
        <article class="trail-node ${p.status}" data-item-id="${item.id}">
          <!-- 8-Bit Walking Sprites along the path -->
          ${
            isP1Here || isP2Here
              ? `
            <div class="pixel-walker-tag">
              ${
                isP1Here
                  ? `
                <div style="display: flex; align-items: center; gap: 4px;" title="${p1Name} está aqui!">
                  ${getPixelSprite(p1CharId, 32)}
                  <span class="char-name-bubble">[ ${p1Name} ]</span>
                </div>
              `
                  : ''
              }
              ${
                isP2Here
                  ? `
                <div style="display: flex; align-items: center; gap: 4px;" title="${p2Name} está aqui!">
                  ${getPixelSprite(p2CharId, 32)}
                  <span class="char-name-bubble" style="color: #72a6ff;">[ ${p2Name} ]</span>
                </div>
              `
                  : ''
              }
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
            ${renderWatchNow(item)}
          </div>
        </article>
      `;
    })
    .join('');

  return `
    <section class="trail-track-section">
      <div class="trail-track-badge font-pixel">
        <span>TRILHA ${track.number}</span> — <span>${track.name}</span> (${track.period}) · ${stats.watched + stats.skipped}/${stats.total} CONCLUÍDOS
      </div>
      <div class="trail-nodes-wrapper">
        ${nodesHtml}
      </div>
    </section>
  `;
}
