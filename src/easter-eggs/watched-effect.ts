export function triggerWatchedEffect(targetEl: HTMLElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // 1. Arc Reactor Energy Pulse on the button
  const button = (targetEl.querySelector('[data-action="quick-status"][data-status="watched"]') || targetEl) as HTMLElement;
  button.classList.add('arc-active');
  setTimeout(() => button.classList.remove('arc-active'), 500);

  // 2. Tactical HUD scanline border sweep on the card
  const card = targetEl.closest('.title-card, .trail-node') as HTMLElement | null;
  if (card) {
    card.classList.add('hud-acquired');
    setTimeout(() => card.classList.remove('hud-acquired'), 650);
  }

  // 3. Crisp floating micro-badge '+ REGISTRADO'
  const rect = (button || targetEl).getBoundingClientRect();
  const badge = document.createElement('div');
  badge.className = 'hud-toast-badge';
  badge.textContent = '✓ ATUALIZADO';
  badge.style.cssText = `
    position: fixed;
    top: ${rect.top - 24}px;
    left: ${rect.left + rect.width / 2}px;
    transform: translateX(-50%);
    pointer-events: none;
    z-index: 1000;
  `;
  document.body.appendChild(badge);

  setTimeout(() => {
    badge.style.opacity = '0';
    badge.style.transform = 'translate(-50%, -10px)';
    badge.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    setTimeout(() => badge.remove(), 250);
  }, 500);
}
