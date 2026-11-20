const DEADPOOL_QUOTES = [
  'Ei! Tá encarando a tela há quase um minuto... Já dava pra ter assistido uma cena pós-créditos!',
  'Dica profissional: se for pular os filmes do Thor antigos, lê o resumo aqui. Ninguém vai te julgar.',
  'Victor von Doom tá chegando e você ainda tá na Trilha 1? Acelera esse play aí, campeão!',
  'Quebrou a 4ª parede aqui rapidinho só pra lembrar: exporta seu backup antes de limpar os cookies!'
];

let idleTimer: ReturnType<typeof setTimeout> | null = null;
let bubbleEl: HTMLElement | null = null;

export function initDeadpoolIdle(): void {
  const resetTimer = () => {
    if (idleTimer) clearTimeout(idleTimer);
    if (bubbleEl) {
      bubbleEl.remove();
      bubbleEl = null;
    }
    // 60 seconds of idle
    idleTimer = setTimeout(showDeadpoolBubble, 60_000);
  };

  ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'].forEach((event) => {
    window.addEventListener(event, resetTimer, { passive: true });
  });

  resetTimer();
}

function showDeadpoolBubble(): void {
  if (bubbleEl) return;
  const quote = DEADPOOL_QUOTES[Math.floor(Math.random() * DEADPOOL_QUOTES.length)];

  bubbleEl = document.createElement('aside');
  bubbleEl.setAttribute('role', 'status');
  bubbleEl.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    max-width: 340px;
    background: #e5484d;
    color: #ffffff;
    border-radius: 16px;
    padding: 16px 18px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 0 2px #080b11;
    z-index: 100;
    font-size: 13px;
    line-height: 1.5;
    animation: dp-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  `;

  bubbleEl.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
      <strong style="font-family:'DM Mono', monospace; font-size:11px; letter-spacing:0.1em; color:#f4bb65;">
        ⚔️ DEADPOOL INTERVÉM
      </strong>
      <button style="border:0; background:transparent; color:#fff; cursor:pointer; font-size:14px; padding:0;" id="close-dp-btn">×</button>
    </div>
    <p style="margin:0;">${quote}</p>
  `;

  document.body.appendChild(bubbleEl);

  document.getElementById('close-dp-btn')?.addEventListener('click', () => {
    bubbleEl?.remove();
    bubbleEl = null;
  });
}

