export function triggerThanosSnap(onComplete?: () => void): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    onComplete?.();
    return;
  }

  const snapBanner = document.createElement('div');
  snapBanner.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(8, 11, 17, 0.88);
    backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #f4bb65;
    font-family: 'DM Mono', monospace;
    text-align: center;
    padding: 24px;
    animation: snap-fade-in 0.4s ease forwards;
  `;

  snapBanner.innerHTML = `
    <div style="font-size: 56px; margin-bottom: 12px; filter: drop-shadow(0 0 20px rgba(244,187,101,0.6));">🫰</div>
    <div style="font-size: 11px; letter-spacing: 0.2em; color: #ff6b70; text-transform: uppercase;">Marco Operacional: 50% Concluído</div>
    <h2 style="font-size: clamp(24px, 4vw, 36px); color: #f5f7fb; margin: 12px 0 8px; font-weight: 800;">"Perfeitamente equilibrado."</h2>
    <p style="color: #c6cfdb; max-width: 500px; font-size: 14px; line-height: 1.6; font-family: Inter, sans-serif;">
      Você atingiu a metade exata do percurso rumo a <em>Avengers: Doomsday</em>. Metade da missão foi cumprida com precisão cirúrgica.
    </p>
    <button class="primary-button" style="margin-top: 24px; font-family: 'DM Mono', monospace;" id="dismiss-snap-btn">
      AVANÇAR PARA A SEGUNDA METADE →
    </button>
  `;

  document.body.appendChild(snapBanner);

  document.getElementById('dismiss-snap-btn')?.addEventListener('click', () => {
    snapBanner.style.animation = 'snap-fade-out 0.3s ease forwards';
    setTimeout(() => {
      snapBanner.remove();
      onComplete?.();
    }, 300);
  });
}

