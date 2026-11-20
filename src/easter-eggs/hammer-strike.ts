export function triggerHammerStrike(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed;
    inset: 0;
    background: radial-gradient(circle, rgba(160, 220, 255, 0.45) 0%, rgba(229, 72, 77, 0.15) 50%, transparent 80%);
    pointer-events: none;
    z-index: 999;
    opacity: 0;
    transition: opacity 0.08s ease-in;
  `;
  document.body.appendChild(flash);

  const appEl = document.getElementById('app');
  if (appEl) {
    appEl.style.transition = 'transform 0.06s ease';
    // Gentle screen shake sequence
    const shakes = [
      'translate(3px, -2px)',
      'translate(-3px, 2px)',
      'translate(2px, 1px)',
      'translate(-1px, -1px)',
      'translate(0, 0)'
    ];

    flash.style.opacity = '1';

    let i = 0;
    const interval = setInterval(() => {
      if (i < shakes.length) {
        appEl.style.transform = shakes[i];
        i++;
      } else {
        clearInterval(interval);
        appEl.style.transform = '';
      }
    }, 50);

    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 200);
    }, 280);
  }
}
