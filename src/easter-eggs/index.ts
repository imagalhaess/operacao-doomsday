import { triggerWebShot } from './web-shot';
import { triggerHammerStrike } from './hammer-strike';
import { triggerThanosSnap } from './snap';
import { initKonamiCode } from './portal';
import { initDeadpoolIdle } from './deadpool';
import { getStats, isAllDone } from '../state/stats';

let snapTriggered = false;

export function checkMilestones(trackId?: string): void {
  const stats = getStats();

  // Check 50% milestone (Thanos Snap)
  if (stats.percent >= 50 && !snapTriggered) {
    const hasSeenSnap = localStorage.getItem('op-doomsday:snap-seen') === 'true';
    if (!hasSeenSnap) {
      snapTriggered = true;
      localStorage.setItem('op-doomsday:snap-seen', 'true');
      triggerThanosSnap();
    }
  }

  // Check Track Completion (Thor Hammer strike)
  if (trackId && isAllDone(trackId)) {
    const key = `op-doomsday:hammer-${trackId}`;
    const hasSeenHammer = localStorage.getItem(key) === 'true';
    if (!hasSeenHammer) {
      localStorage.setItem(key, 'true');
      triggerHammerStrike();
    }
  }
}

export function initEasterEggs(): void {
  initKonamiCode();
  initDeadpoolIdle();
}

export { triggerWebShot, triggerHammerStrike, triggerThanosSnap };

