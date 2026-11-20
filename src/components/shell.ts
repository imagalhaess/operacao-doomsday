import { ui } from '../state/ui';
import { getStats } from '../state/stats';
import { isSoundEnabled } from '../utils/audio';

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
  const stats = getStats();
  const level = Math.floor(stats.watched / 5) + 1;
  const xpInLevel = (stats.watched % 5) * 20; // 0 to 100%
  const soundOn = isSoundEnabled();

  const navHtml = NAV_ITEMS.map(
    ({ href, icon, label }) => `
      <button class="nav-link ${path === href ? 'active' : ''}" data-action="navigate" data-path="${href}">
        <span class="nav-icon">${icon}</span>${label}
      </button>
    `
  ).join('');

  return `
    <div class="app-shell">
      <header class="topbar">
        <a class="brand" href="#/">
          <span class="brand-mark" aria-hidden="true"></span>
          <span>
            <span class="brand-name">OPERAÇÃO DOOMSDAY</span>
            <span class="brand-sub">MARVEL 8-BIT QUEST / 2026</span>
          </span>
        </a>

        <!-- Retro 8-Bit Arcade HUD -->
        <div class="pixel-hud-bar">
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
          <button class="sound-toggle-btn" data-action="toggle-sound" title="Alternar efeitos de áudio 8-bit">
            ${soundOn ? '🔊 CHIPTUNE' : '🔇 MUTE'}
          </button>
        </div>

        <div class="top-actions">
          <button class="ghost-button" data-action="import">Importar</button>
          <button class="ghost-button" data-action="export">Exportar backup</button>
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
    </div>
  `;
}
