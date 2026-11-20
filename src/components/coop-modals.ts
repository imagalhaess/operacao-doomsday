import { CHARACTERS } from '../data/characters';
import { coopState } from '../state/coop';
import { escapeHtml } from '../utils';

export function renderCharSelectModal(targetPlayer: '1' | '2'): string {
  const currentSelected = targetPlayer === '1' ? coopState.p1CharId : coopState.p2CharId;
  const title = targetPlayer === '1' ? 'Escolha Seu Herói da Trilha' : 'Escolha o Herói do Seu Parceiro';

  const cardsHtml = CHARACTERS.map((char) => {
    const isSelected = char.id === currentSelected;
    return `
      <div
        class="char-card ${isSelected ? 'selected' : ''}"
        data-action="select-character"
        data-player="${targetPlayer}"
        data-char-id="${char.id}"
      >
        <div class="char-card-top">
          <div style="width: 32px; height: 32px;">${char.avatarSvg}</div>
          <div>
            <h4>${char.name}</h4>
            <span>${char.alias}</span>
          </div>
        </div>
        <p>"${escapeHtml(char.quote)}"</p>
      </div>
    `;
  }).join('');

  return `
    <div class="char-select-modal" data-action="close-modal">
      <div class="char-select-dialog" onclick="event.stopPropagation()">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div class="eyebrow">Roster Operacional</div>
            <h2>${title}</h2>
          </div>
          <button class="icon-button" data-action="close-modal">×</button>
        </div>

        <div class="char-grid">
          ${cardsHtml}
        </div>
      </div>
    </div>
  `;
}

export function renderCoopModal(): string {
  const isEnabled = coopState.enabled;
  const roomCode = coopState.roomId || '';

  return `
    <div class="char-select-modal" data-action="close-modal">
      <div class="char-select-dialog" onclick="event.stopPropagation()">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
          <div>
            <div class="eyebrow">Modo Multiverso Conectado</div>
            <h2>Maratona em Dupla</h2>
            <p class="lede" style="font-size: 13px;">Compartilhe a trilha com um amigo ou parceiro. Vocês verão os avatares um do outro avançando em tempo real.</p>
          </div>
          <button class="icon-button" data-action="close-modal">×</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- Criar Sala -->
          <div style="border: 1px solid var(--line); border-radius: 16px; padding: 20px; background: var(--surface);">
            <h3>1. Criar Sala de Missão</h3>
            <p style="font-size: 12px; color: var(--muted); margin-bottom: 14px;">Gere um código de sala e compartilhe com seu parceiro para conectarem diretamente via P2P seguro.</p>
            <div style="display: flex; gap: 10px; align-items: center;">
              <button class="primary-button" data-action="create-coop-room">Gerar Código de Sala</button>
              ${
                roomCode
                  ? `<div class="mono" style="background:#0b1018; padding: 10px 14px; border-radius: 10px; border: 1px dashed var(--gold); font-size: 16px; font-weight: 800; color: var(--gold);">CÓDIGO: ${roomCode}</div>`
                  : ''
              }
            </div>
          </div>

          <!-- Conectar em Sala Existente -->
          <div style="border: 1px solid var(--line); border-radius: 16px; padding: 20px; background: var(--surface);">
            <h3>2. Entrar na Sala do Parceiro</h3>
            <p style="font-size: 12px; color: var(--muted); margin-bottom: 14px;">Se seu amigo já criou uma sala, digite o código de 6 dígitos dele abaixo:</p>
            <div style="display: flex; gap: 10px; align-items: center; max-width: 400px;">
              <input
                class="field"
                type="text"
                maxlength="6"
                id="join-room-input"
                placeholder="Ex: AB3X9Z"
                style="text-transform: uppercase; font-family: 'DM Mono', monospace; font-size: 14px; letter-spacing: 0.15em;"
              />
              <button class="primary-button" data-action="join-coop-room">Conectar</button>
            </div>
          </div>

          <!-- Modo Local / Desconectar -->
          <div style="border: 1px solid var(--line); border-radius: 16px; padding: 16px 20px; background: var(--surface); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong>Maratona Local em Dupla</strong>
              <div style="font-size: 11px; color: var(--muted);">Acompanhe dois heróis no mesmo aparelho sem conexão externa.</div>
            </div>
            <button class="ghost-button" data-action="toggle-local-coop">
              ${isEnabled ? 'Desativar Dupla' : 'Ativar Dupla Local'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
