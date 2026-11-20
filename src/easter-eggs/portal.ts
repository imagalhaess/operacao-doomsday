const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

let currentIndex = 0;

export function initKonamiCode(): void {
  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === KONAMI_CODE[currentIndex].toLowerCase()) {
      currentIndex++;
      if (currentIndex === KONAMI_CODE.length) {
        currentIndex = 0;
        triggerMultiversePortal();
      }
    } else {
      currentIndex = 0;
    }
  });
}

function triggerMultiversePortal(): void {
  const portalModal = document.createElement('div');
  portalModal.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(8, 11, 17, 0.92);
    backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: portal-fade 0.5s ease forwards;
  `;

  portalModal.innerHTML = `
    <div class="portal-ring" style="
      width: 180px;
      height: 180px;
      border-radius: 50%;
      border: 4px dashed #f4bb65;
      box-shadow: 0 0 40px rgba(244, 187, 101, 0.6), inset 0 0 40px rgba(229, 72, 77, 0.5);
      animation: spin-portal 8s linear infinite;
      margin-bottom: 24px;
      display: grid;
      place-items: center;
    ">
      <span style="font-size: 40px;">🌀</span>
    </div>
    <div class="eyebrow" style="color: #f4bb65; letter-spacing: 0.2em;">ARQUIVO CONFIDENCIAL / MULTIVERSO</div>
    <h2 style="color: #f5f7fb; font-size: clamp(22px, 3.5vw, 32px); text-align: center; margin: 12px 0; max-width: 600px;">
      "New mask, same task."
    </h2>
    <p style="color: #8f9cad; font-family: 'DM Mono', monospace; font-size: 13px; text-align: center;">
      — Robert Downey Jr. como Victor von Doom na San Diego Comic-Con
    </p>
    <button class="ghost-button" style="margin-top: 24px;" id="close-portal-btn">Fechar portal</button>
  `;

  document.body.appendChild(portalModal);

  document.getElementById('close-portal-btn')?.addEventListener('click', () => {
    portalModal.style.transition = 'opacity 0.3s ease';
    portalModal.style.opacity = '0';
    setTimeout(() => portalModal.remove(), 300);
  });
}
