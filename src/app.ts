import './styles/main.css';
import './styles/easter-eggs.css';
import './styles/trail.css';

import { ui } from './state/ui';
import {
  getProgress,
  updateProgress,
  resetProgress,
  createBackupBlob,
  restoreFromBackup
} from './state/store';
import {
  coopState,
  setP1Character,
  setP2Character,
  setCoopEnabled,
  createCoopRoom,
  joinCoopRoom,
  broadcastSync,
  setOnSyncCallback,
  generateRoomCode
} from './state/coop';
import { itemById } from './data/tracks';
import { routeFromHash, navigate } from './router';
import { TODAY } from './utils';
import type { Status } from './data/types';

import { renderShell } from './components/shell';
import { renderDashboard } from './components/dashboard';
import { renderMarathon } from './components/marathon';
import { renderTracksPage } from './components/tracks';
import { renderWrappedPage } from './components/wrapped';
import { renderGuidePage } from './components/guide';
import { renderHistoryPage } from './components/history';
import { renderDetailDrawer } from './components/detail-drawer';
import { renderCharSelectModal, renderCoopModal } from './components/coop-modals';
import { showToast } from './components/toast';

import { initEasterEggs, checkMilestones } from './easter-eggs';
import { triggerWatchedEffect } from './easter-eggs/watched-effect';

// ─── Modal State ────────────────────────────────────────────

let activeModal: 'char-select-1' | 'char-select-2' | 'coop' | null = null;

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
    if (activeModal === 'char-select-1') {
      overlay.innerHTML = renderCharSelectModal('1');
    } else if (activeModal === 'char-select-2') {
      overlay.innerHTML = renderCharSelectModal('2');
    } else if (activeModal === 'coop') {
      overlay.innerHTML = renderCoopModal();
    } else if (ui.selectedId && itemById[ui.selectedId]) {
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
      broadcastSync();
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
  activeModal = null;
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
    broadcastSync();
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

  if (action === 'close-detail' || action === 'close-modal') {
    if (target.closest('.drawer') || target.closest('.char-select-dialog')) return;
    ui.selectedId = null;
    activeModal = null;
    render();
    return;
  }

  if (action === 'open-char-select') {
    const player = el.dataset.player === '2' ? 'char-select-2' : 'char-select-1';
    activeModal = player;
    render();
    return;
  }

  if (action === 'select-character') {
    const player = el.dataset.player;
    const charId = el.dataset.charId!;
    if (player === '2') {
      setP2Character(charId);
      showToast('Parceiro atualizado.', 'info');
    } else {
      setP1Character(charId);
      showToast('Herói selecionado!', 'success');
    }
    activeModal = null;
    render();
    return;
  }

  if (action === 'open-coop-modal') {
    activeModal = 'coop';
    render();
    return;
  }

  if (action === 'create-coop-room') {
    const code = generateRoomCode();
    createCoopRoom(code, (createdCode) => {
      showToast(`Sala ${createdCode} criada! Aguardando parceiro...`, 'success');
      render();
    });
    return;
  }

  if (action === 'join-coop-room') {
    const input = document.getElementById('join-room-input') as HTMLInputElement | null;
    const code = (input?.value || '').trim();
    if (code.length < 4) {
      showToast('Digite um código de sala válido.', 'warn');
      return;
    }
    showToast(`Conectando à sala ${code}...`, 'info');
    joinCoopRoom(
      code,
      () => {
        showToast('Conectado com sucesso ao seu parceiro!', 'success');
        activeModal = null;
        render();
      },
      () => {
        showToast('Não foi possível conectar a essa sala. Verifique o código.', 'warn');
      }
    );
    return;
  }

  if (action === 'toggle-local-coop') {
    setCoopEnabled(!coopState.enabled);
    showToast(coopState.enabled ? 'Modo Dupla ativado!' : 'Modo Solo ativado.', 'info');
    activeModal = null;
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

  // ─── Status Toggle (with Undo support) ────────────────────
  if (action === 'quick-status' || action === 'status') {
    const id = el.dataset.id!;
    const requestedStatus = el.dataset.status as Status;
    const current = getProgress(id);

    // TOGGLE: If already has this status, revert back to 'pending'!
    const newStatus: Status = current.status === requestedStatus ? 'pending' : requestedStatus;

    updateProgress(id, {
      status: newStatus,
      watchedAt:
        newStatus === 'watched' ? (current.watchedAt || TODAY) : newStatus === 'pending' ? '' : current.watchedAt
    });

    broadcastSync();

    if (newStatus === 'watched') {
      const card = el.closest('.title-card, .trail-node') as HTMLElement | null;
      if (card) triggerWatchedEffect(card);
      showToast('Marcado como assistido.', 'success');
    } else if (newStatus === 'skipped') {
      showToast('Conhecido por resumo.', 'warn');
    } else if (newStatus === 'pending') {
      showToast('Desmarcado (pendente).', 'info');
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
    broadcastSync();
    render();
    return;
  }

  if (action === 'save-notes') {
    const id = el.dataset.id!;
    const textarea = document.querySelector(
      `[data-notes-for="${id}"]`
    ) as HTMLTextAreaElement | null;
    updateProgress(id, { notes: textarea?.value || '' });
    broadcastSync();
    showToast('Observações salvas.', 'success');
    render();
    return;
  }

  if (action === 'reset') {
    if (confirm('Limpar todo o progresso salvo neste navegador?')) {
      resetProgress();
      broadcastSync();
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

setOnSyncCallback(() => {
  showToast('Sincronizado com seu parceiro em tempo real!', 'info');
  render();
});

if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

initEasterEggs();
render();
