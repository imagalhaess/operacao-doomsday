// ─── Domain Types ───────────────────────────────────────────

export interface TrackItem {
  id: string;
  title: string;
  original: string;
  year: number;
  type: string;
  importance: 'ESSENCIAL' | 'COMPLEMENTAR' | 'OPCIONAL';
}

export interface Track {
  id: string;
  number: string;
  name: string;
  period: string;
  description: string;
  items: TrackItem[];
  insight: string;
  next: string;
}

export interface EnrichedItem extends TrackItem {
  trackId: string;
  trackName: string;
  trackNumber: string;
}

// ─── Progress & State ───────────────────────────────────────

export type Status = 'watched' | 'skipped' | 'partial' | 'pending';

export interface Progress {
  status: Status;
  watchedAt: string;
  rating: number;
  notes: string;
}

export interface AppState {
  progress: Record<string, Progress>;
  lastBackup: string | null;
}

export interface UIState {
  route: string;
  search: string;
  status: string;
  importance: string;
  sort: string;
  track: string;
  selectedTrack: string;
  selectedId: string | null;
}

// ─── Content ────────────────────────────────────────────────

export interface Summary {
  context: string;
  characters: string;
  conflict: string;
  happens: string;
  ending: string;
  consequences: string;
  introduced: string;
  connections: string;
}

export interface VideoLink {
  label: string;
  url: string;
  why: string;
}

export type Concept = [title: string, description: string, related: string[]];

// ─── Backup ─────────────────────────────────────────────────

export interface BackupPayload {
  app: 'operacao-doomsday';
  version: number;
  exportedAt: string;
  progress: Record<string, Progress>;
}

// ─── Stats ──────────────────────────────────────────────────

export interface TrackStats {
  total: number;
  watched: number;
  skipped: number;
  pending: number;
  percent: number;
}

export interface GlobalStats extends TrackStats {
  partial: number;
  complete: number;
}

