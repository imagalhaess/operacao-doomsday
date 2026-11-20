/**
 * Handcrafted 8-Bit Pixel Art MCU Icons
 * Uses shape-rendering="crispEdges" on 16x16 pixel grids
 */

export function renderMcuIcon(
  type: 'reactor' | 'shield' | 'eye' | 'dossier' | 'close' | 'trophy' | 'sound-on' | 'sound-off',
  size = 16
): string {
  switch (type) {
    case 'shield':
      return `
        <svg class="mcu-pixel-icon" viewBox="0 0 16 16" width="${size}" height="${size}" shape-rendering="crispEdges" aria-hidden="true">
          <!-- Outer red ring -->
          <rect x="5" y="1" width="6" height="1" fill="#e5484d" />
          <rect x="3" y="2" width="10" height="1" fill="#e5484d" />
          <rect x="2" y="3" width="12" height="1" fill="#e5484d" />
          <rect x="1" y="5" width="14" height="6" fill="#e5484d" />
          <rect x="2" y="12" width="12" height="1" fill="#e5484d" />
          <rect x="3" y="13" width="10" height="1" fill="#e5484d" />
          <rect x="5" y="14" width="6" height="1" fill="#e5484d" />
          <!-- Silver ring -->
          <rect x="5" y="2" width="6" height="1" fill="#f1f5f9" />
          <rect x="3" y="3" width="10" height="1" fill="#f1f5f9" />
          <rect x="2" y="5" width="2" height="6" fill="#f1f5f9" />
          <rect x="12" y="5" width="2" height="6" fill="#f1f5f9" />
          <rect x="3" y="12" width="10" height="1" fill="#f1f5f9" />
          <rect x="5" y="13" width="6" height="1" fill="#f1f5f9" />
          <!-- Inner red ring -->
          <rect x="4" y="4" width="8" height="8" fill="#e5484d" />
          <!-- Blue center -->
          <rect x="5" y="5" width="6" height="6" fill="#1d4ed8" />
          <!-- Star -->
          <rect x="7" y="6" width="2" height="4" fill="#ffffff" />
          <rect x="6" y="7" width="4" height="2" fill="#ffffff" />
        </svg>
      `;

    case 'reactor':
      return `
        <svg class="mcu-pixel-icon" viewBox="0 0 16 16" width="${size}" height="${size}" shape-rendering="crispEdges" aria-hidden="true">
          <rect x="5" y="1" width="6" height="2" fill="#38bdf8" />
          <rect x="3" y="3" width="10" height="10" fill="#082f49" />
          <rect x="4" y="2" width="8" height="1" fill="#38bdf8" />
          <rect x="4" y="13" width="8" height="1" fill="#38bdf8" />
          <rect x="2" y="4" width="1" height="8" fill="#38bdf8" />
          <rect x="13" y="4" width="1" height="8" fill="#38bdf8" />
          <!-- Outer core -->
          <rect x="5" y="5" width="6" height="6" fill="#0284c7" />
          <!-- Inner core glow -->
          <rect x="6" y="6" width="4" height="4" fill="#7dd3fc" />
          <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
        </svg>
      `;

    case 'eye':
      return `
        <svg class="mcu-pixel-icon" viewBox="0 0 16 16" width="${size}" height="${size}" shape-rendering="crispEdges" aria-hidden="true">
          <!-- Gold Agamotto casing -->
          <rect x="4" y="2" width="8" height="2" fill="#b45309" />
          <rect x="2" y="4" width="12" height="2" fill="#d97706" />
          <rect x="1" y="6" width="14" height="4" fill="#f59e0b" />
          <rect x="2" y="10" width="12" height="2" fill="#d97706" />
          <rect x="4" y="12" width="8" height="2" fill="#b45309" />
          <!-- Eye socket slit -->
          <rect x="3" y="7" width="10" height="2" fill="#064e3b" />
          <!-- Time Stone green brilliance -->
          <rect x="6" y="5" width="4" height="6" fill="#10b981" />
          <rect x="7" y="6" width="2" height="4" fill="#6ee7b7" />
          <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
        </svg>
      `;

    case 'dossier':
      return `
        <svg class="mcu-pixel-icon" viewBox="0 0 16 16" width="${size}" height="${size}" shape-rendering="crispEdges" aria-hidden="true">
          <!-- Tab -->
          <rect x="2" y="2" width="5" height="2" fill="#b45309" />
          <!-- Folder body -->
          <rect x="2" y="4" width="12" height="10" fill="#d97706" />
          <!-- Paper sheet inside -->
          <rect x="3" y="5" width="10" height="8" fill="#fef3c7" />
          <!-- Text lines -->
          <rect x="5" y="7" width="6" height="1" fill="#78350f" />
          <rect x="5" y="9" width="4" height="1" fill="#78350f" />
          <!-- Red Confidential stamp -->
          <rect x="9" y="8" width="3" height="3" fill="#dc2626" />
        </svg>
      `;

    case 'close':
      return `
        <svg class="mcu-pixel-icon" viewBox="0 0 16 16" width="${size}" height="${size}" shape-rendering="crispEdges" aria-hidden="true">
          <rect x="3" y="3" width="2" height="2" fill="#e5484d" />
          <rect x="11" y="3" width="2" height="2" fill="#e5484d" />
          <rect x="5" y="5" width="2" height="2" fill="#e5484d" />
          <rect x="9" y="5" width="2" height="2" fill="#e5484d" />
          <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
          <rect x="5" y="9" width="2" height="2" fill="#e5484d" />
          <rect x="9" y="9" width="2" height="2" fill="#e5484d" />
          <rect x="3" y="11" width="2" height="2" fill="#e5484d" />
          <rect x="11" y="11" width="2" height="2" fill="#e5484d" />
        </svg>
      `;

    case 'trophy':
      return `
        <svg class="mcu-pixel-icon" viewBox="0 0 16 16" width="${size}" height="${size}" shape-rendering="crispEdges" aria-hidden="true">
          <rect x="4" y="2" width="8" height="6" fill="#fbbf24" />
          <rect x="2" y="3" width="2" height="3" fill="#f59e0b" />
          <rect x="12" y="3" width="2" height="3" fill="#f59e0b" />
          <rect x="6" y="8" width="4" height="2" fill="#d97706" />
          <rect x="7" y="10" width="2" height="2" fill="#b45309" />
          <rect x="5" y="12" width="6" height="2" fill="#78350f" />
        </svg>
      `;

    case 'sound-on':
      return `
        <svg class="mcu-pixel-icon" viewBox="0 0 16 16" width="${size}" height="${size}" shape-rendering="crispEdges" aria-hidden="true">
          <rect x="2" y="6" width="3" height="4" fill="#38bdf8" />
          <rect x="5" y="4" width="3" height="8" fill="#0284c7" />
          <rect x="10" y="5" width="1" height="6" fill="#38bdf8" />
          <rect x="12" y="3" width="1" height="10" fill="#7dd3fc" />
        </svg>
      `;

    case 'sound-off':
      return `
        <svg class="mcu-pixel-icon" viewBox="0 0 16 16" width="${size}" height="${size}" shape-rendering="crispEdges" aria-hidden="true">
          <rect x="2" y="6" width="3" height="4" fill="#64748b" />
          <rect x="5" y="4" width="3" height="8" fill="#475569" />
          <rect x="10" y="6" width="4" height="1" fill="#ef4444" />
          <rect x="10" y="9" width="4" height="1" fill="#ef4444" />
        </svg>
      `;
  }
}
