import { triggerWebShot } from './web-shot';
import { triggerHammerStrike } from './hammer-strike';
import { triggerThanosSnap } from './snap';
import { initKonamiCode } from './portal';
import { initDeadpoolIdle } from './deadpool';
import { getPlayerLevel, getStats, isAllDone } from '../state/stats';
import { tracks } from '../data/tracks';
import { showMilestone } from '../components/toast';
import { playLevelUpSound } from '../utils/audio';

let snapTriggered = false;

export function checkMilestones(previousLevel: number, trackId?: string, wasTrackComplete = false): void {
  const stats = getStats();
  const level = getPlayerLevel(stats.watched);
  const leveledUp = level > previousLevel;
  const completedTrack = !wasTrackComplete && trackId && isAllDone(trackId)
    ? tracks.find((track) => track.id === trackId)
    : undefined;

  if (leveledUp || completedTrack) {
    playLevelUpSound();
    showMilestone(
      completedTrack ? `Trilha ${completedTrack.number} concluída!` : 'Você subiu de nível!',
      completedTrack
        ? `${completedTrack.name}${leveledUp ? ` · Nível ${level} desbloqueado!` : ''}`
        : `Nível ${level} desbloqueado. Mais uma missão concluída!`
    );
  }

  // Check 50% milestone (Thanos Snap)
  if (stats.percent >= 50 && !snapTriggered) {
    const hasSeenSnap = localStorage.getItem('op-doomsday:snap-seen') === 'true';
    if (!hasSeenSnap) {
      snapTriggered = true;
      localStorage.setItem('op-doomsday:snap-seen', 'true');
      triggerThanosSnap();
    }
  }
}

export function initEasterEggs(): void {
  initKonamiCode();
  initDeadpoolIdle();
}

export { triggerWebShot, triggerHammerStrike, triggerThanosSnap };

