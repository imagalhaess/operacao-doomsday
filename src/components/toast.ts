import { escapeHtml } from '../utils';
import { isSoundEnabled } from '../utils/audio';

export type ToastType = 'success' | 'info' | 'warn';

let dismissMilestone: (() => void) | undefined;

export function showMilestone(title: string, message: string): void {
  dismissMilestone?.();

  const notice = document.createElement('section');
  notice.id = 'milestone-celebration';
  notice.className = 'milestone-celebration';
  notice.setAttribute('role', 'status');
  notice.setAttribute('aria-live', 'polite');
  notice.setAttribute('aria-atomic', 'true');
  notice.innerHTML = `
    <h2 class="milestone-title">${escapeHtml(title)}</h2>
    <p class="milestone-message">${escapeHtml(message)}</p>
    <p class="milestone-sound">${isSoundEnabled()
      ? 'Conquista registrada. Continue sua jornada!'
      : 'Som desativado. Ative no cabeçalho para ouvir os efeitos.'}</p>
  `;

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'milestone-close';
  closeButton.setAttribute('aria-label', 'Fechar comemoração');
  closeButton.textContent = '×';
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') dismiss();
  };
  const dismiss = () => {
    clearTimeout(timer);
    document.removeEventListener('keydown', onKeyDown);
    notice.remove();
    if (dismissMilestone === dismiss) dismissMilestone = undefined;
  };
  const timer = setTimeout(dismiss, 7000);
  dismissMilestone = dismiss;
  closeButton.addEventListener('click', dismiss);
  notice.appendChild(closeButton);
  document.addEventListener('keydown', onKeyDown);
  document.body.appendChild(notice);
}

export function showToast(message: string, type: ToastType = 'info'): void {
  const region = document.getElementById('toast-region');
  if (!region) return;

  const icons: Record<ToastType, string> = {
    success: '✓',
    info: '◈',
    warn: '⚡'
  };

  const toastEl = document.createElement('div');
  toastEl.className = `toast toast--${type}`;
  toastEl.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${escapeHtml(message)}</span>`;

  region.appendChild(toastEl);

  setTimeout(() => {
    toastEl.style.animation = 'toast-out 0.2s ease forwards';
    setTimeout(() => {
      toastEl.remove();
    }, 200);
  }, 2600);
}

