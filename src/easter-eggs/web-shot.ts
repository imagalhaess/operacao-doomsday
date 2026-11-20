export function triggerWebShot(targetEl: HTMLElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const rect = targetEl.getBoundingClientRect();
  const webContainer = document.createElement('div');
  webContainer.className = 'spider-web-overlay';
  webContainer.style.cssText = `
    position: fixed;
    top: ${rect.top}px;
    left: ${rect.left}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    pointer-events: none;
    z-index: 100;
  `;

  webContainer.innerHTML = `
    <svg viewBox="0 0 100 100" width="100%" height="100%" style="overflow: visible;">
      <g stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.85" fill="none">
        <!-- Radial Web Strands -->
        <line x1="50" y1="50" x2="0" y2="0" class="web-strand strand-1" />
        <line x1="50" y1="50" x2="50" y2="0" class="web-strand strand-2" />
        <line x1="50" y1="50" x2="100" y2="0" class="web-strand strand-3" />
        <line x1="50" y1="50" x2="100" y2="50" class="web-strand strand-4" />
        <line x1="50" y1="50" x2="100" y2="100" class="web-strand strand-5" />
        <line x1="50" y1="50" x2="50" y2="100" class="web-strand strand-6" />
        <line x1="50" y1="50" x2="0" y2="100" class="web-strand strand-7" />
        <line x1="50" y1="50" x2="0" y2="50" class="web-strand strand-8" />
        <!-- Concentric Rings -->
        <circle cx="50" cy="50" r="16" class="web-ring ring-1" stroke-dasharray="3,2" />
        <circle cx="50" cy="50" r="32" class="web-ring ring-2" stroke-dasharray="4,2" />
        <circle cx="50" cy="50" r="48" class="web-ring ring-3" stroke-dasharray="5,3" />
      </g>
    </svg>
  `;

  document.body.appendChild(webContainer);

  const style = document.createElement('style');
  style.textContent = `
    .spider-web-overlay {
      animation: web-fade-in 0.15s ease-out forwards;
    }
    .web-strand {
      stroke-dasharray: 80;
      stroke-dashoffset: 80;
      animation: web-shoot 0.3s ease-out forwards;
    }
    .web-ring {
      opacity: 0;
      animation: ring-expand 0.25s 0.1s ease-out forwards;
    }
    @keyframes web-shoot {
      to { stroke-dashoffset: 0; }
    }
    @keyframes ring-expand {
      from { opacity: 0; transform: scale(0.5); transform-origin: 50% 50%; }
      to { opacity: 0.9; transform: scale(1); transform-origin: 50% 50%; }
    }
    @keyframes web-fade-in {
      0% { opacity: 0; transform: scale(0.85); }
      50% { opacity: 1; transform: scale(1.05); }
      100% { opacity: 0.9; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    webContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    webContainer.style.opacity = '0';
    webContainer.style.transform = 'scale(0.95)';
    setTimeout(() => {
      webContainer.remove();
      style.remove();
    }, 400);
  }, 1200);
}
