import { CHARACTERS, type MarvelCharacter } from '../data/characters';
import { getPixelSprite } from '../data/pixel-sprites';
import { coopState } from '../state/coop';
import { escapeHtml } from '../utils';

export function renderCharSelectModal(targetPlayer: '1' | '2'): string {
  const currentSelected = targetPlayer === '1' ? coopState.p1CharId : coopState.p2CharId;
  const title = targetPlayer === '1' ? 'Escolha Seu Personagem 8-Bit' : 'Escolha o Personagem do Parceiro';

  const villains = CHARACTERS.filter(
    (c) => c.faction === 'villain' || (!c.faction && c.id.includes('doom'))
  );
  const heroes = CHARACTERS.filter((c) => !villains.includes(c));

  const renderCard = (char: MarvelCharacter) => {
    const isSelected = char.id === currentSelected;
    return `
      <button
        type="button"
        class="char-card pixel-box ${isSelected ? 'selected' : ''}"
        aria-pressed="${isSelected}"
        data-action="select-character"
        data-player="${targetPlayer}"
        data-char-id="${char.id}"
        style="cursor: pointer;"
      >
        <span class="char-card-top">
          <span style="width: 38px; height: 38px; flex-shrink: 0; display: grid; place-items: center; background: #080b11; border-radius: 6px; border: 1px solid #334155; pointer-events: none;">
            ${getPixelSprite(char.id, 32)}
          </span>
          <span style="pointer-events: none; min-width: 0;">
            <strong class="font-pixel" style="display: block; overflow-wrap: anywhere; font-size: 10px; margin: 0 0 2px;">${char.name}</strong>
            <span style="font-size: 11px; color: var(--muted);">${char.alias}</span>
          </span>
        </span>
        <span style="color: #f4bb65; font-size: 10px; margin: 4px 0; pointer-events: none;">
          PODER: ${'★'.repeat(char.powerLevel)}
        </span>
        <span style="font-size: 11px; color: var(--soft); margin: 0; pointer-events: none;">"${escapeHtml(char.quote)}"</span>
      </button>
    `;
  };

  return `
    <div class="char-select-modal" data-action="backdrop-click">
      <div class="char-select-dialog pixel-box" role="dialog" aria-modal="true" aria-label="${title}">
        <div class="char-select-head">
          <div>
            <div class="eyebrow font-pixel">Superheroes & Hypervillains / 8-Bit Roster</div>
            <h2 class="font-pixel" style="font-size: 20px; margin: 6px 0;">${title}</h2>
          </div>
          <button class="pixel-btn" data-action="close-modal" type="button" title="Fechar (Esc)" style="padding: 4px 10px; font-size: 14px;">✕</button>
        </div>

        <div style="margin-bottom: 18px;">
          <h3 class="font-pixel" style="color: #72a6ff; font-size: 12px; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <span>🦸</span> SUPER-HERÓIS
          </h3>
          <div class="char-grid" style="margin-top: 8px;">
            ${heroes.map(renderCard).join('')}
          </div>
        </div>

        <div>
          <h3 class="font-pixel" style="color: #e5484d; font-size: 12px; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <span>🦹</span> HIPERVILÕES & ANTI-HERÓIS
          </h3>
          <div class="char-grid" style="margin-top: 8px;">
            ${villains.map(renderCard).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderCoopModal(): string {
  const isEnabled = coopState.enabled;
  const roomCode = coopState.roomId || '';

  return `
    <div class="char-select-modal" data-action="backdrop-click">
      <div class="char-select-dialog pixel-box">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
          <div>
            <div class="eyebrow font-pixel">Modo Multiverso Conectado</div>
            <h2 class="font-pixel" style="font-size: 20px; margin: 6px 0;">Maratona em Dupla</h2>
            <p class="lede" style="font-size: 13px;">Compartilhe a trilha com um amigo ou parceiro. Vocês verão os avatares um do outro avançando em tempo real.</p>
          </div>
          <button class="pixel-btn" data-action="close-modal" type="button" title="Fechar (Esc)" style="padding: 4px 10px; font-size: 14px;">✕</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- Criar Sala -->
          <div style="border: 1px solid var(--line); border-radius: 12px; padding: 20px; background: var(--surface);">
            <h3 class="font-pixel" style="font-size: 13px;">1. Criar Sala de Missão</h3>
            <p style="font-size: 12px; color: var(--muted); margin-bottom: 14px;">Gere um código de sala e compartilhe com seu parceiro para conectarem diretamente via P2P seguro.</p>
            <div style="display: flex; gap: 10px; align-items: center;">
              <button class="pixel-btn pixel-btn--primary" data-action="create-coop-room">Gerar Código de Sala</button>
              ${
                roomCode
                  ? `<div class="mono" style="background:#0b1018; padding: 10px 14px; border-radius: 8px; border: 2px dashed var(--gold); font-size: 16px; font-weight: 800; color: var(--gold);">CÓDIGO: ${roomCode}</div>`
                  : ''
              }
            </div>
          </div>

          <!-- Conectar em Sala Existente -->
          <div style="border: 1px solid var(--line); border-radius: 12px; padding: 20px; background: var(--surface);">
            <h3 class="font-pixel" style="font-size: 13px;">2. Entrar na Sala do Parceiro</h3>
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
              <button class="pixel-btn pixel-btn--success" data-action="join-coop-room">Conectar</button>
            </div>
          </div>

          <!-- Modo Local / Desconectar -->
          <div style="border: 1px solid var(--line); border-radius: 12px; padding: 16px 20px; background: var(--surface); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong class="font-pixel" style="font-size: 12px;">Maratona Local em Dupla</strong>
              <div style="font-size: 11px; color: var(--muted);">Acompanhe dois heróis no mesmo aparelho sem conexão externa.</div>
            </div>
            <button class="pixel-btn" data-action="toggle-local-coop">
              ${isEnabled ? 'Desativar Dupla' : 'Ativar Dupla Local'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
