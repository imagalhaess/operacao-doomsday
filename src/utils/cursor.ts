const CONTROLS = 'button, a[href], select, input[type="checkbox"], input[type="radio"], [role="button"], [data-action]:not([data-action="backdrop-click"])';

export function initMcuCursor(): void {
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const hide = () => {
    document.querySelector('.app-shell')?.removeAttribute('data-custom-cursor');
    const cursor = document.getElementById('mcu-cursor');
    if (cursor) cursor.hidden = true;
  };
  document.addEventListener('pointermove', (event) => {
    const target = event.target;
    const cursor = document.getElementById('mcu-cursor');
    const shell = target instanceof Element ? target.closest('.app-shell') : null;
    if (
      !finePointer.matches || event.pointerType === 'touch' || !shell ||
      !(cursor instanceof HTMLImageElement) || !(target instanceof Element) ||
      target.closest('input:not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"], :disabled, [aria-disabled="true"]')
    ) {
      hide();
      return;
    }
    const action = Boolean(target.closest(CONTROLS));
    const pixel = shell.classList.contains('theme-8bit');
    const asset = action ? 'repulsor-hand' : 'arc-pointer';
    const src = `/cursors/${asset}${pixel ? '' : '-classic'}.svg`;
    if (cursor.getAttribute('src') !== src) cursor.setAttribute('src', src);
    cursor.style.transform = `translate3d(${event.clientX - (action ? 14 : 2)}px, ${event.clientY - (action ? 3 : 1)}px, 0)`;
    cursor.hidden = false;
    shell.setAttribute('data-custom-cursor', '');
  });
  document.addEventListener('pointerleave', hide);
  document.addEventListener('pointerdown', (event) => { if (event.pointerType === 'touch') hide(); });
  window.addEventListener('blur', hide);
}
