import { escapeHtml } from '../utils';

export type ToastType = 'success' | 'info' | 'warn';

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
