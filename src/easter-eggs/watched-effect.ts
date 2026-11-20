import { playCoinSound } from '../utils/audio';

export function triggerWatchedEffect(targetEl: HTMLElement): void {
  // 1. Play retro 8-bit coin/powerup audio
  playCoinSound();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // 2. Arc Reactor Energy Pulse on the button
  const button = (targetEl.querySelector('[data-action="quick-status"][data-status="watched"]') || targetEl) as HTMLElement;
  button.classList.add('arc-active');
  setTimeout(() => button.classList.remove('arc-active'), 500);

  // 3. Tactical HUD scanline border sweep on the card
  const card = targetEl.closest('.title-card, .trail-node') as HTMLElement | null;
  if (card) {
    card.classList.add('hud-acquired');
    setTimeout(() => card.classList.remove('hud-acquired'), 650);
  }

  // 4. Retro 8-bit +100 XP floating particle
  const rect = (button || targetEl).getBoundingClientRect();
  const xpBadge = document.createElement('div');
  xpBadge.className = 'pixel-xp-particle';
  xpBadge.textContent = '+100 XP';
  xpBadge.style.left = `${rect.left + rect.width / 2}px`;
  xpBadge.style.top = `${rect.top - 16}px`;

  document.body.appendChild(xpBadge);
  setTimeout(() => xpBadge.remove(), 800);
}
