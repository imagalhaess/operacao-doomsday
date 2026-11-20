import { ui } from '../state/ui';

interface NavItem {
  href: string;
  icon: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', icon: '◈', label: 'Dashboard' },
  { href: '/maratona', icon: '◫', label: 'Minha maratona' },
  { href: '/trilhas', icon: '⌁', label: 'Trilhas' },
  { href: '/wrapped', icon: '✦', label: 'Marvel Wrapped' },
  { href: '/guia', icon: '◎', label: 'Guia de conexões' },
  { href: '/historico', icon: '◷', label: 'Meu histórico' },
];

export function renderShell(content: string): string {
  const path = ui.route;

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
            <span class="brand-sub">MARVEL PREP / 2026</span>
          </span>
        </a>
        <div class="top-actions">
          <span class="mission-status"><span class="pulse"></span> SISTEMA OPERACIONAL</span>
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

