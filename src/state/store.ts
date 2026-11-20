import type { AppState, Progress, BackupPayload } from '../data/types';

const STORAGE_KEY = 'operacao-doomsday:v1';

// ─── Internal state ─────────────────────────────────────────

function loadFromStorage(): AppState {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    return {
      progress: (saved.progress as Record<string, Progress>) ?? {},
      lastBackup: (saved.lastBackup as string) ?? null,
    };
  } catch {
    return { progress: {}, lastBackup: null };
  }
}

let state: AppState = loadFromStorage();

// ─── Public API ─────────────────────────────────────────────

export function getState(): AppState {
  return state;
}

export function saveState(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getProgress(id: string): Progress {
  return (
    state.progress[id] ?? {
      status: 'pending' as const,
      watchedAt: '',
      rating: 0,
      notes: '',
    }
  );
}

export function updateProgress(id: string, patch: Partial<Progress>): void {
  state.progress[id] = { ...getProgress(id), ...patch };
  saveState();
}

export function resetProgress(): void {
  state.progress = {};
  saveState();
}

// ─── Backup ─────────────────────────────────────────────────

export function createBackupBlob(): Blob {
  const payload: BackupPayload = {
    app: 'operacao-doomsday',
    version: 1,
    exportedAt: new Date().toISOString(),
    progress: state.progress,
  };
  return new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
}

export function restoreFromBackup(json: string): boolean {
  try {
    const payload = JSON.parse(json) as Partial<BackupPayload>;
    if (
      !payload ||
      payload.app !== 'operacao-doomsday' ||
      typeof payload.progress !== 'object'
    ) {
      return false;
    }
    state.progress = payload.progress!;
    saveState();
    return true;
  } catch {
    return false;
  }
}

