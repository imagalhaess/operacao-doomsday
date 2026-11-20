import { ui } from '../state/ui';
import { getStats } from '../state/stats';
import { isSoundEnabled } from '../utils/audio';
import { getP1Character } from '../state/coop';
import { getPixelSprite } from '../data/pixel-sprites';
import { renderMcuIcon } from './mcu-icons';

interface NavItem {
  href: string;
  icon: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', icon: '◈', label: 'Dashboard' },
  { href: '/maratona', icon: '◫', label: 'Minha maratona' },
  { href: '/trilhas', icon: '⌁', label: 'Trilhas (8-Bit)' },
  { href: '/wrapped', icon: '✦', label: 'Marvel Wrapped' },
  { href: '/guia', icon: '◎', label: 'Guia de conexões' },
  { href: '/historico', icon: '◷', label: 'Meu histórico' },
];

export function renderShell(content: string): string {
  const path = ui.route;
  const isTrail = path === '/trilhas';
  const stats = getStats();
  const level = Math.floor(stats.watched / 5) + 1;
  const xpInLevel = (stats.watched % 5) * 20; // 0 to 100%
  const soundOn = isSoundEnabled();
  const p1 = getP1Character();
  const soundButton = `
    <button
      class="${isTrail ? 'sound-toggle-btn' : 'pixel-action-btn'}"
      data-action="toggle-sound"
      aria-pressed="${soundOn}"
      aria-label="${soundOn ? 'Desativar som' : 'Ativar som'}"
      title="${soundOn ? 'Desativar efeitos de hover, clique e conquistas' : 'Ativar efeitos de hover, clique e conquistas'}"
    >
      ${isTrail ? renderMcuIcon(soundOn ? 'sound-on' : 'sound-off', 14) : ''}
      <span>${soundOn ? 'Som ligado' : 'Ativar som'}</span>
    </button>
  `;

  const navHtml = NAV_ITEMS.map(
    ({ href, icon, label }) => `
      <button class="nav-link ${path === href ? 'active' : ''}" data-action="navigate" data-path="${href}">
        <span class="nav-icon">${icon}</span>${label}
      </button>
    `
  ).join('');

  return `
    <div class="app-shell ${isTrail ? 'theme-8bit' : 'theme-classic'}">
      <header class="topbar">
        <a class="brand" href="#/">
          <img class="brand-mark" src="${isTrail ? '/icon-8bit.svg' : '/icon.svg'}" width="40" height="40" alt="">
          <span>
            <span class="brand-name">OPERAÇÃO DOOMSDAY</span>
            <span class="brand-sub">${isTrail ? 'MARVEL 8-BIT QUEST' : 'CENTRAL DA MARATONA'} / 2026</span>
          </span>
        </a>

        ${isTrail ? `
        <div class="pixel-hud-bar">
          <button
            class="hud-hero-btn"
            data-action="open-char-select"
            data-player="1"
            title="Herói atual: ${p1.name} (${p1.alias}) — Clique para trocar"
          >
            ${getPixelSprite(p1.id, 20)}
            <span class="hud-hero-name font-pixel">${p1.name}</span>
          </button>
          <div class="hud-item" title="Seu Nível de Conclusão Marvel">
            <span class="hud-tag">LVL ${level < 10 ? '0' + level : level}</span>
            <div class="hud-xp-track" title="${xpInLevel}% para o próximo nível">
              <div class="hud-xp-fill" style="width: ${xpInLevel}%;"></div>
            </div>
          </div>
          <div class="hud-item" title="Missões Concluídas">
            <span>⭐</span>
            <span style="color:#f4bb65; font-weight:700;">${stats.watched}</span>
          </div>
          ${soundButton}
        </div>
        ` : ''}

        <div class="top-actions">
          ${!isTrail ? soundButton : ''}
          <div class="backup-controls" role="group" aria-label="Guardar e recuperar seu progresso" aria-describedby="backup-help">
            <div class="backup-buttons">
              <button class="pixel-action-btn" data-action="export" title="Baixar um arquivo com seus títulos assistidos, notas e avaliações">Salvar progresso</button>
              <button class="pixel-action-btn" data-action="import" title="Abrir um arquivo salvo anteriormente; substitui o progresso atual">Restaurar progresso</button>
            </div>
            <span class="backup-help" id="backup-help">Salvar baixa um arquivo. Restaurar abre esse arquivo e substitui o progresso atual.</span>
          </div>
        </div>
      </header>
      <div class="layout">
        <aside class="sidebar">
          <div class="nav-label">Central de comando</div>
          <nav class="nav" aria-label="Navegação principal">
            ${navHtml}
          </nav>
          <div class="sidebar-note">
            <strong>NOTA DA OPERAÇÃO</strong>
            O progresso fica salvo neste navegador com criptografia local. Exporte um backup antes de trocar de aparelho.
          </div>
        </aside>
        <main class="main">
          <div class="content page-enter">
            ${content}
          </div>
        </main>
      </div>
      <div id="overlay"></div>
      <div id="toast-region" aria-live="polite"></div>
      <div id="easter-egg-layer"></div>
      <div class="mcu-cursor-layer" aria-hidden="true">
        <img class="mcu-cursor" id="mcu-cursor" src="/cursors/arc-pointer${isTrail ? '' : '-classic'}.svg" width="32" height="32" alt="" hidden>
      </div>
    </div>
  `;
}
