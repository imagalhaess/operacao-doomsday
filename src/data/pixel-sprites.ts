// Crisp 8-Bit Pixel Art Sprites for Marvel Characters
// Designed on a 16x16 pixel grid with shape-rendering="crispEdges"

export function getPixelSprite(charId: string, size: number = 32): string {
  switch (charId) {
    case 'iron-man':
      return `
        <svg viewBox="0 0 16 16" width="${size}" height="${size}" class="pixel-sprite anim-float" shape-rendering="crispEdges">
          <!-- Helmet -->
          <rect x="5" y="1" width="6" height="5" fill="#e5484d" />
          <rect x="6" y="2" width="4" height="3" fill="#f4bb65" />
          <rect x="6" y="3" width="1" height="1" fill="#72a6ff" />
          <rect x="9" y="3" width="1" height="1" fill="#72a6ff" />
          <!-- Torso -->
          <rect x="4" y="6" width="8" height="5" fill="#e5484d" />
          <rect x="7" y="7" width="2" height="2" fill="#72a6ff" class="pixel-glow" />
          <rect x="5" y="7" width="1" height="3" fill="#f4bb65" />
          <rect x="10" y="7" width="1" height="3" fill="#f4bb65" />
          <!-- Legs -->
          <rect x="5" y="11" width="2" height="3" fill="#f4bb65" />
          <rect x="9" y="11" width="2" height="3" fill="#f4bb65" />
          <rect x="5" y="14" width="2" height="2" fill="#e5484d" />
          <rect x="9" y="14" width="2" height="2" fill="#e5484d" />
          <!-- Thruster Fire -->
          <rect x="5" y="15" width="2" height="1" fill="#72a6ff" class="pixel-flame" />
          <rect x="9" y="15" width="2" height="1" fill="#72a6ff" class="pixel-flame" />
        </svg>
      `;

    case 'captain-america':
      return `
        <svg viewBox="0 0 16 16" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Helmet -->
          <rect x="5" y="1" width="6" height="5" fill="#3b82f6" />
          <rect x="7" y="2" width="2" height="1" fill="#ffffff" />
          <rect x="6" y="4" width="4" height="2" fill="#fbcfe8" />
          <!-- Torso & Star -->
          <rect x="4" y="6" width="8" height="3" fill="#3b82f6" />
          <rect x="7" y="7" width="2" height="1" fill="#ffffff" />
          <rect x="4" y="9" width="8" height="2" fill="#ef4444" />
          <rect x="6" y="9" width="1" height="2" fill="#ffffff" />
          <rect x="9" y="9" width="1" height="2" fill="#ffffff" />
          <!-- Shield on back/arm -->
          <rect x="2" y="6" width="2" height="5" fill="#ef4444" />
          <rect x="2" y="7" width="2" height="3" fill="#ffffff" />
          <rect x="2" y="8" width="1" height="1" fill="#3b82f6" />
          <!-- Legs -->
          <rect x="5" y="11" width="2" height="3" fill="#3b82f6" />
          <rect x="9" y="11" width="2" height="3" fill="#3b82f6" />
          <rect x="5" y="14" width="2" height="2" fill="#991b1b" />
          <rect x="9" y="14" width="2" height="2" fill="#991b1b" />
        </svg>
      `;

    case 'thor':
      return `
        <svg viewBox="0 0 16 16" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Hair & Helmet -->
          <rect x="4" y="1" width="8" height="3" fill="#fde047" />
          <rect x="5" y="2" width="6" height="2" fill="#94a3b8" />
          <rect x="3" y="1" width="2" height="2" fill="#94a3b8" />
          <rect x="11" y="1" width="2" height="2" fill="#94a3b8" />
          <rect x="6" y="4" width="4" height="2" fill="#fbcfe8" />
          <!-- Torso & Cape -->
          <rect x="3" y="6" width="10" height="5" fill="#ef4444" />
          <rect x="5" y="6" width="6" height="5" fill="#334155" />
          <rect x="6" y="7" width="1" height="1" fill="#94a3b8" />
          <rect x="9" y="7" width="1" height="1" fill="#94a3b8" />
          <!-- Mjolnir in hand -->
          <rect x="12" y="7" width="3" height="2" fill="#94a3b8" class="pixel-spark" />
          <rect x="13" y="9" width="1" height="3" fill="#78350f" />
          <!-- Legs -->
          <rect x="5" y="11" width="2" height="4" fill="#1e293b" />
          <rect x="9" y="11" width="2" height="4" fill="#1e293b" />
        </svg>
      `;

    case 'spider-man':
      return `
        <svg viewBox="0 0 16 16" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Mask -->
          <rect x="5" y="1" width="6" height="5" fill="#ef4444" />
          <rect x="6" y="3" width="2" height="2" fill="#ffffff" />
          <rect x="9" y="3" width="2" height="2" fill="#ffffff" />
          <!-- Suit -->
          <rect x="4" y="6" width="8" height="5" fill="#3b82f6" />
          <rect x="6" y="6" width="4" height="4" fill="#ef4444" />
          <!-- Legs -->
          <rect x="5" y="11" width="2" height="3" fill="#3b82f6" />
          <rect x="9" y="11" width="2" height="3" fill="#3b82f6" />
          <rect x="5" y="14" width="2" height="2" fill="#ef4444" />
          <rect x="9" y="14" width="2" height="2" fill="#ef4444" />
        </svg>
      `;

    case 'loki':
      return `
        <svg viewBox="0 0 16 16" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Horns -->
          <rect x="4" y="0" width="1" height="3" fill="#eab308" />
          <rect x="11" y="0" width="1" height="3" fill="#eab308" />
          <rect x="5" y="2" width="6" height="2" fill="#eab308" />
          <rect x="6" y="4" width="4" height="2" fill="#fbcfe8" />
          <!-- Robe / Armor -->
          <rect x="4" y="6" width="8" height="6" fill="#15803d" />
          <rect x="6" y="6" width="4" height="3" fill="#854d0e" />
          <!-- Legs -->
          <rect x="5" y="12" width="2" height="3" fill="#1e293b" />
          <rect x="9" y="12" width="2" height="3" fill="#1e293b" />
        </svg>
      `;

    case 'deadpool':
      return `
        <svg viewBox="0 0 16 16" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Swords behind -->
          <rect x="2" y="2" width="1" height="4" fill="#94a3b8" />
          <rect x="13" y="2" width="1" height="4" fill="#94a3b8" />
          <!-- Mask -->
          <rect x="5" y="1" width="6" height="5" fill="#dc2626" />
          <rect x="5" y="2" width="2" height="3" fill="#09090b" />
          <rect x="9" y="2" width="2" height="3" fill="#09090b" />
          <rect x="6" y="3" width="1" height="1" fill="#ffffff" />
          <rect x="9" y="3" width="1" height="1" fill="#ffffff" />
          <!-- Suit -->
          <rect x="4" y="6" width="8" height="5" fill="#dc2626" />
          <rect x="7" y="6" width="2" height="4" fill="#09090b" />
          <!-- Legs -->
          <rect x="5" y="11" width="2" height="4" fill="#09090b" />
          <rect x="9" y="11" width="2" height="4" fill="#09090b" />
        </svg>
      `;

    case 'wolverine':
      return `
        <svg viewBox="0 0 16 16" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Mask Fins -->
          <rect x="3" y="1" width="2" height="4" fill="#09090b" />
          <rect x="11" y="1" width="2" height="4" fill="#09090b" />
          <rect x="5" y="1" width="6" height="4" fill="#eab308" />
          <rect x="6" y="3" width="1" height="1" fill="#ffffff" />
          <rect x="9" y="3" width="1" height="1" fill="#ffffff" />
          <rect x="6" y="5" width="4" height="1" fill="#fbcfe8" />
          <!-- Yellow suit -->
          <rect x="4" y="6" width="8" height="5" fill="#eab308" />
          <rect x="4" y="6" width="1" height="5" fill="#2563eb" />
          <rect x="11" y="6" width="1" height="5" fill="#2563eb" />
          <!-- Claws -->
          <rect x="2" y="9" width="2" height="1" fill="#cbd5e1" class="pixel-spark" />
          <rect x="12" y="9" width="2" height="1" fill="#cbd5e1" class="pixel-spark" />
          <!-- Legs -->
          <rect x="5" y="11" width="2" height="4" fill="#2563eb" />
          <rect x="9" y="11" width="2" height="4" fill="#2563eb" />
        </svg>
      `;

    case 'doctor-doom':
    default:
      return `
        <svg viewBox="0 0 16 16" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Green Hood -->
          <rect x="4" y="0" width="8" height="3" fill="#166534" />
          <rect x="4" y="3" width="1" height="5" fill="#166534" />
          <rect x="11" y="3" width="1" height="5" fill="#166534" />
          <!-- Iron Mask -->
          <rect x="5" y="3" width="6" height="4" fill="#94a3b8" />
          <rect x="6" y="4" width="1" height="1" fill="#22c55e" class="pixel-glow" />
          <rect x="9" y="4" width="1" height="1" fill="#22c55e" class="pixel-glow" />
          <!-- Green Cloak & Plate -->
          <rect x="3" y="7" width="10" height="5" fill="#166534" />
          <rect x="6" y="7" width="4" height="3" fill="#94a3b8" />
          <rect x="7" y="7" width="2" height="1" fill="#eab308" />
          <!-- Legs -->
          <rect x="5" y="12" width="2" height="3" fill="#64748b" />
          <rect x="9" y="12" width="2" height="3" fill="#64748b" />
        </svg>
      `;
  }
}
