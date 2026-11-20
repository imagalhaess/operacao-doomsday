import './styles/main.css';
import './styles/easter-eggs.css';

import { ui } from './state/ui';
import {
  getProgress,
  updateProgress,
  resetProgress,
  createBackupBlob,
  restoreFromBackup
} from './state/store';
import { itemById } from './data/tracks';
import { routeFromHash, navigate } from './router';
import { TODAY } from './utils';

import { renderShell } from './components/shell';
import { renderDashboard } from './components/dashboard';
import { renderMarathon } from './components/marathon';
import { renderTracksPage } from './components/tracks';
import { renderWrappedPage } from './components/wrapped';
import { renderGuidePage } from './components/guide';
import { renderHistoryPage } from './components/history';
import { renderDetailDrawer } from './components/detail-drawer';
import { showToast } from './components/toast';

import { initEasterEggs, triggerWebShot, checkMilestones } from './easter-eggs';

// ─── Page Resolver ──────────────────────────────────────────

function currentPage(): string {
  if (ui.route === '/maratona') return renderMarathon();
  if (ui.route === '/trilhas') return renderTracksPage();
  if (ui.route === '/wrapped') return renderWrappedPage();
  if (ui.route === '/guia') return renderGuidePage();
  if (ui.route === '/historico') return renderHistoryPage();
  return renderDashboard();
}

// ─── Main Render ────────────────────────────────────────────

export function render(): void {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  appEl.innerHTML = renderShell(currentPage());

  const overlay = document.getElementById('overlay');
  if (overlay) {
    if (ui.selectedId && itemById[ui.selectedId]) {
      overlay.innerHTML = renderDetailDrawer(itemById[ui.selectedId]);
    } else {
      overlay.innerHTML = '';
    }
  }
}

// ─── Backup Helpers ─────────────────────────────────────────

function exportBackup(): void {
  const blob = createBackupBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `operacao-doomsday-backup-${TODAY}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast('Backup exportado com sucesso.', 'success');
}

function importBackup(file: File): void {
  const reader = new FileReader();
  reader.onload = () => {
    const success = restoreFromBackup(reader.result as string);
    if (success) {
      showToast('Backup importado com sucesso.', 'success');
      render();
    } else {
      showToast('Arquivo de backup inválido.', 'warn');
    }
  };
  reader.readAsText(file);
}

// ─── Global Event Listeners ─────────────────────────────────

window.addEventListener('hashchange', () => {
  ui.route = routeFromHash();
  ui.selectedId = null;
  render();
});

document.addEventListener('input', (event) => {
  const target = event.target as HTMLInputElement;
  const filter = target.dataset.filter;
  if (!filter) return;

  if (filter === 'search' || filter === 'guide-search') {
    ui.search = target.value;
    render();
    const currentInput = document.querySelector(
      `[data-filter="${filter}"]`
    ) as HTMLInputElement | null;
    if (currentInput) {
      currentInput.focus();
      currentInput.setSelectionRange(
        currentInput.value.length,
        currentInput.value.length
      );
    }
  }
});

document.addEventListener('change', (event) => {
  const target = event.target as HTMLSelectElement | HTMLInputElement;
  const filter = target.dataset.filter;

  if (
    filter === 'status' ||
    filter === 'importance' ||
    filter === 'sort' ||
    filter === 'track'
  ) {
    ui[filter] = target.value;
  }

  if (filter === 'wrappedTrack') {
    ui.selectedTrack = target.value;
  }

  if (target.dataset.dateFor) {
    updateProgress(target.dataset.dateFor, { watchedAt: target.value });
    showToast('Data atualizada.', 'info');
    return;
  }

  render();
});

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const el = target.closest('[data-action]') as HTMLElement | null;
  if (!el) return;

  const action = el.dataset.action;

  if (action === 'navigate') {
    navigate(el.dataset.path || '/');
    return;
  }

  if (action === 'export') {
    exportBackup();
    return;
  }

  if (action === 'import') {
    document.getElementById('backup-input')?.click();
    return;
  }

  if (action === 'open-detail') {
    ui.selectedId = el.dataset.id || null;
    render();
    return;
  }

  if (action === 'close-detail') {
    if (target.closest('.drawer')) return;
    ui.selectedId = null;
    render();
    return;
  }

  if (action === 'open-track') {
    ui.search = '';
    ui.status = 'all';
    ui.importance = 'all';
    ui.sort = 'release';
    ui.track = el.dataset.track || 'all';
    navigate('/maratona');
    return;
  }

  if (action === 'quick-status' || action === 'status') {
    const id = el.dataset.id!;
    const status = el.dataset.status as any;
    const current = getProgress(id);

    updateProgress(id, {
      status,
      watchedAt:
        status === 'watched' ? current.watchedAt || TODAY : current.watchedAt
    });

    if (status === 'watched') {
      const card = el.closest('.title-card') as HTMLElement | null;
      if (card) triggerWebShot(card);
      showToast('Marcado como assistido.', 'success');
    } else if (status === 'skipped') {
      showToast('Conhecido por resumo.', 'warn');
    } else {
      showToast('Status atualizado.', 'info');
    }

    const item = itemById[id];
    checkMilestones(item?.trackId);

    render();
    return;
  }

  if (action === 'rating') {
    updateProgress(el.dataset.id!, { rating: Number(el.dataset.rating) });
    render();
    return;
  }

  if (action === 'save-notes') {
    const id = el.dataset.id!;
    const textarea = document.querySelector(
      `[data-notes-for="${id}"]`
    ) as HTMLTextAreaElement | null;
    updateProgress(id, { notes: textarea?.value || '' });
    showToast('Observações salvas.', 'success');
    render();
    return;
  }

  if (action === 'reset') {
    if (confirm('Limpar todo o progresso salvo neste navegador?')) {
      resetProgress();
      showToast('Progresso limpo.', 'warn');
      render();
    }
    return;
  }
});

// Backup file listener
document.getElementById('backup-input')?.addEventListener('change', (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) importBackup(file);
  (event.target as HTMLInputElement).value = '';
});

// ─── Initialization ─────────────────────────────────────────

if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

initEasterEggs();
render();
