import { tracks, allItems } from '../data/tracks';
import { getProgress } from './store';
import type { GlobalStats, TrackStats, EnrichedItem } from '../data/types';

export function getStats(): GlobalStats {
  const values = allItems.map((item) => getProgress(item.id).status);
  const watched = values.filter((s) => s === 'watched').length;
  const skipped = values.filter((s) => s === 'skipped').length;
  const partial = values.filter((s) => s === 'partial').length;
  const pending = values.filter((s) => s === 'pending').length;
  const complete = watched + skipped;
  const total = values.length;
  const percent = total > 0 ? Math.round((complete / total) * 100) : 0;

  return { total, watched, skipped, partial, pending, complete, percent };
}

export function getTrackStats(trackId: string): TrackStats {
  const t = tracks.find((tr) => tr.id === trackId);
  if (!t) return { total: 0, watched: 0, skipped: 0, pending: 0, percent: 0 };

  const values = t.items.map((item) => getProgress(item.id).status);
  const watched = values.filter((s) => s === 'watched').length;
  const skipped = values.filter((s) => s === 'skipped').length;
  const pending = values.filter((s) => s === 'pending').length;
  const total = t.items.length;
  const percent = total > 0 ? Math.round(((watched + skipped) / total) * 100) : 0;

  return { total, watched, skipped, pending, percent };
}

export function isAllDone(trackId: string): boolean {
  const t = tracks.find((tr) => tr.id === trackId);
  if (!t) return false;
  return t.items.every((item) => getProgress(item.id).status !== 'pending');
}

export function getNextItem(): EnrichedItem {
  return (
    allItems.find((item) => getProgress(item.id).status === 'pending') ||
    allItems[allItems.length - 1]
  );
}

