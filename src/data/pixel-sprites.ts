// 8-Bit Superheroes & Hypervillains Pixel Sprites
// Inspired by John Sideris' iconic retro pop-culture 8-bit aesthetic
// Rendered on a 20x20 crisp pixel grid with shape-rendering="crispEdges"

export function getPixelSprite(charId: string, size: number = 32): string {
  switch (charId) {
    case 'iron-man':
      return `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" class="pixel-sprite anim-float" shape-rendering="crispEdges">
          <!-- Helmet -->
          <rect x="6" y="2" width="8" height="6" fill="#e53e3e" />
          <rect x="7" y="3" width="6" height="4" fill="#ecc94b" />
          <rect x="7" y="4" width="2" height="1" fill="#63b3ed" class="pixel-glow" />
          <rect x="11" y="4" width="2" height="1" fill="#63b3ed" class="pixel-glow" />
          <!-- Torso -->
          <rect x="5" y="8" width="10" height="6" fill="#e53e3e" />
          <rect x="6" y="9" width="2" height="4" fill="#ecc94b" />
          <rect x="12" y="9" width="2" height="4" fill="#ecc94b" />
          <rect x="9" y="9" width="2" height="2" fill="#63b3ed" class="pixel-glow" />
          <!-- Repulsor hands -->
          <rect x="4" y="11" width="1" height="2" fill="#ecc94b" />
          <rect x="15" y="11" width="1" height="2" fill="#ecc94b" />
          <!-- Legs & Boots -->
          <rect x="6" y="14" width="3" height="3" fill="#ecc94b" />
          <rect x="11" y="14" width="3" height="3" fill="#ecc94b" />
          <rect x="6" y="17" width="3" height="2" fill="#e53e3e" />
          <rect x="11" y="17" width="3" height="2" fill="#e53e3e" />
          <!-- Jetpack flames -->
          <rect x="6" y="19" width="3" height="1" fill="#63b3ed" class="pixel-flame" />
          <rect x="11" y="19" width="3" height="1" fill="#63b3ed" class="pixel-flame" />
        </svg>
      `;

    case 'captain-america':
      return `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Helmet & Wings -->
          <rect x="6" y="2" width="8" height="6" fill="#2b6cb0" />
          <rect x="5" y="2" width="1" height="2" fill="#ffffff" />
          <rect x="14" y="2" width="1" height="2" fill="#ffffff" />
          <rect x="9" y="3" width="2" height="1" fill="#ffffff" />
          <rect x="7" y="5" width="6" height="3" fill="#fbd38d" />
          <!-- Torso & Stripes -->
          <rect x="5" y="8" width="10" height="3" fill="#2b6cb0" />
          <rect x="9" y="8" width="2" height="2" fill="#ffffff" />
          <rect x="5" y="11" width="10" height="3" fill="#e53e3e" />
          <rect x="7" y="11" width="2" height="3" fill="#ffffff" />
          <rect x="11" y="11" width="2" height="3" fill="#ffffff" />
          <!-- Vibranium Shield on Arm -->
          <rect x="1" y="7" width="4" height="7" fill="#e53e3e" />
          <rect x="2" y="8" width="2" height="5" fill="#ffffff" />
          <rect x="2" y="9" width="2" height="3" fill="#2b6cb0" />
          <rect x="2" y="10" width="1" height="1" fill="#ffffff" />
          <!-- Legs & Red Boots -->
          <rect x="6" y="14" width="3" height="3" fill="#2b6cb0" />
          <rect x="11" y="14" width="3" height="3" fill="#2b6cb0" />
          <rect x="6" y="17" width="3" height="3" fill="#c53030" />
          <rect x="11" y="17" width="3" height="3" fill="#c53030" />
        </svg>
      `;

    case 'thor':
      return `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Winged Helmet & Blonde Hair -->
          <rect x="6" y="2" width="8" height="3" fill="#a0aec0" />
          <rect x="4" y="1" width="2" height="3" fill="#ffffff" />
          <rect x="14" y="1" width="2" height="3" fill="#ffffff" />
          <rect x="5" y="4" width="2" height="4" fill="#ecc94b" />
          <rect x="13" y="4" width="2" height="4" fill="#ecc94b" />
          <rect x="7" y="5" width="6" height="3" fill="#fbd38d" />
          <!-- Red Cape -->
          <rect x="3" y="8" width="14" height="9" fill="#e53e3e" />
          <!-- Armor Plates -->
          <rect x="6" y="8" width="8" height="6" fill="#2d3748" />
          <rect x="7" y="9" width="2" height="2" fill="#cbd5e0" />
          <rect x="11" y="9" width="2" height="2" fill="#cbd5e0" />
          <rect x="7" y="12" width="2" height="2" fill="#cbd5e0" />
          <rect x="11" y="12" width="2" height="2" fill="#cbd5e0" />
          <!-- Mjolnir -->
          <rect x="15" y="8" width="4" height="3" fill="#cbd5e0" class="pixel-spark" />
          <rect x="16" y="11" width="2" height="3" fill="#744210" />
          <!-- Legs -->
          <rect x="6" y="14" width="3" height="5" fill="#1a202c" />
          <rect x="11" y="14" width="3" height="5" fill="#1a202c" />
        </svg>
      `;

    case 'spider-man':
      return `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Mask -->
          <rect x="6" y="2" width="8" height="6" fill="#e53e3e" />
          <rect x="7" y="4" width="2" height="2" fill="#ffffff" />
          <rect x="11" y="4" width="2" height="2" fill="#ffffff" />
          <rect x="6" y="5" width="1" height="1" fill="#1a202c" />
          <rect x="13" y="5" width="1" height="1" fill="#1a202c" />
          <!-- Torso -->
          <rect x="5" y="8" width="10" height="6" fill="#2b6cb0" />
          <rect x="7" y="8" width="6" height="5" fill="#e53e3e" />
          <rect x="9" y="9" width="2" height="3" fill="#1a202c" />
          <!-- Legs & Boots -->
          <rect x="6" y="14" width="3" height="3" fill="#2b6cb0" />
          <rect x="11" y="14" width="3" height="3" fill="#2b6cb0" />
          <rect x="6" y="17" width="3" height="3" fill="#e53e3e" />
          <rect x="11" y="17" width="3" height="3" fill="#e53e3e" />
        </svg>
      `;

    case 'wolverine':
      return `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Black Mask Wings & Yellow Cowl -->
          <rect x="4" y="1" width="3" height="6" fill="#1a202c" />
          <rect x="13" y="1" width="3" height="6" fill="#1a202c" />
          <rect x="7" y="2" width="6" height="5" fill="#ecc94b" />
          <rect x="7" y="4" width="2" height="1" fill="#ffffff" />
          <rect x="11" y="4" width="2" height="1" fill="#ffffff" />
          <rect x="8" y="6" width="4" height="2" fill="#fbd38d" />
          <!-- Yellow/Blue Suit -->
          <rect x="5" y="8" width="10" height="6" fill="#ecc94b" />
          <rect x="5" y="8" width="2" height="6" fill="#2b6cb0" />
          <rect x="13" y="8" width="2" height="6" fill="#2b6cb0" />
          <!-- Claws -->
          <rect x="2" y="10" width="3" height="1" fill="#cbd5e0" class="pixel-spark" />
          <rect x="15" y="10" width="3" height="1" fill="#cbd5e0" class="pixel-spark" />
          <!-- Legs -->
          <rect x="6" y="14" width="3" height="5" fill="#2b6cb0" />
          <rect x="11" y="14" width="3" height="5" fill="#2b6cb0" />
        </svg>
      `;

    case 'hulk':
      return `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Big Green Head & Black Hair -->
          <rect x="5" y="1" width="10" height="3" fill="#1a202c" />
          <rect x="5" y="4" width="10" height="4" fill="#38a169" />
          <rect x="7" y="5" width="2" height="1" fill="#ffffff" />
          <rect x="11" y="5" width="2" height="1" fill="#ffffff" />
          <!-- Massive Green Torso -->
          <rect x="3" y="8" width="14" height="6" fill="#38a169" />
          <rect x="1" y="8" width="2" height="6" fill="#2f855a" />
          <rect x="17" y="8" width="2" height="6" fill="#2f855a" />
          <!-- Purple Pants -->
          <rect x="5" y="14" width="10" height="4" fill="#6b46c1" />
          <rect x="5" y="18" width="4" height="2" fill="#38a169" />
          <rect x="11" y="18" width="4" height="2" fill="#38a169" />
        </svg>
      `;

    // ─── Hipervilões ──────────────────────────────────────────
    case 'doctor-doom':
      return `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Green Hood -->
          <rect x="5" y="1" width="10" height="4" fill="#22543d" />
          <rect x="4" y="3" width="2" height="6" fill="#22543d" />
          <rect x="14" y="3" width="2" height="6" fill="#22543d" />
          <!-- Chrome Mask -->
          <rect x="6" y="4" width="8" height="5" fill="#a0aec0" />
          <rect x="7" y="5" width="2" height="1" fill="#48bb78" class="pixel-glow" />
          <rect x="11" y="5" width="2" height="1" fill="#48bb78" class="pixel-glow" />
          <!-- Green Cloak with Gold Clasp -->
          <rect x="3" y="9" width="14" height="10" fill="#22543d" />
          <rect x="8" y="9" width="4" height="7" fill="#718096" />
          <rect x="7" y="9" width="2" height="2" fill="#ecc94b" />
          <rect x="11" y="9" width="2" height="2" fill="#ecc94b" />
          <!-- Iron Boots -->
          <rect x="6" y="16" width="3" height="4" fill="#4a5568" />
          <rect x="11" y="16" width="3" height="4" fill="#4a5568" />
        </svg>
      `;

    case 'thanos':
      return `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Purple Head & Gold Helmet -->
          <rect x="5" y="1" width="10" height="3" fill="#d69e2e" />
          <rect x="6" y="4" width="8" height="5" fill="#805ad5" />
          <rect x="7" y="5" width="2" height="1" fill="#ecc94b" />
          <rect x="11" y="5" width="2" height="1" fill="#ecc94b" />
          <!-- Gold Armor -->
          <rect x="4" y="9" width="12" height="6" fill="#d69e2e" />
          <rect x="7" y="10" width="6" height="5" fill="#2d3748" />
          <!-- Infinity Gauntlet (Left Arm) -->
          <rect x="1" y="9" width="4" height="6" fill="#ecc94b" />
          <!-- 6 Infinity Stones glowing -->
          <rect x="1" y="9" width="1" height="1" fill="#e53e3e" class="pixel-spark" />
          <rect x="2" y="9" width="1" height="1" fill="#3182ce" class="pixel-spark" />
          <rect x="3" y="9" width="1" height="1" fill="#805ad5" class="pixel-spark" />
          <rect x="2" y="11" width="2" height="2" fill="#ecc94b" class="pixel-glow" />
          <!-- Legs -->
          <rect x="6" y="15" width="3" height="5" fill="#2d3748" />
          <rect x="11" y="15" width="3" height="5" fill="#2d3748" />
          <rect x="6" y="18" width="3" height="2" fill="#d69e2e" />
          <rect x="11" y="18" width="3" height="2" fill="#d69e2e" />
        </svg>
      `;

    case 'loki':
      return `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Curved Gold Horns -->
          <rect x="4" y="0" width="2" height="4" fill="#ecc94b" />
          <rect x="14" y="0" width="2" height="4" fill="#ecc94b" />
          <rect x="6" y="2" width="8" height="2" fill="#ecc94b" />
          <!-- Head -->
          <rect x="6" y="4" width="8" height="4" fill="#fbd38d" />
          <rect x="5" y="4" width="1" height="5" fill="#1a202c" />
          <rect x="14" y="4" width="1" height="5" fill="#1a202c" />
          <!-- Green Robe & Gold Belt -->
          <rect x="5" y="8" width="10" height="7" fill="#276749" />
          <rect x="8" y="9" width="4" height="5" fill="#744210" />
          <rect x="7" y="12" width="6" height="1" fill="#ecc94b" />
          <!-- Yellow Cape -->
          <rect x="3" y="9" width="2" height="9" fill="#ecc94b" />
          <rect x="15" y="9" width="2" height="9" fill="#ecc94b" />
          <!-- Legs -->
          <rect x="6" y="15" width="3" height="5" fill="#1a202c" />
          <rect x="11" y="15" width="3" height="5" fill="#1a202c" />
        </svg>
      `;

    case 'deadpool':
      return `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Crossed Katanas behind -->
          <rect x="3" y="2" width="2" height="5" fill="#cbd5e0" />
          <rect x="15" y="2" width="2" height="5" fill="#cbd5e0" />
          <!-- Mask -->
          <rect x="6" y="2" width="8" height="6" fill="#e53e3e" />
          <rect x="6" y="3" width="3" height="4" fill="#1a202c" />
          <rect x="11" y="3" width="3" height="4" fill="#1a202c" />
          <rect x="7" y="4" width="1" height="1" fill="#ffffff" />
          <rect x="12" y="4" width="1" height="1" fill="#ffffff" />
          <!-- Torso & Belt -->
          <rect x="5" y="8" width="10" height="6" fill="#e53e3e" />
          <rect x="9" y="8" width="2" height="5" fill="#1a202c" />
          <rect x="5" y="13" width="10" height="1" fill="#1a202c" />
          <!-- Legs -->
          <rect x="6" y="14" width="3" height="6" fill="#1a202c" />
          <rect x="11" y="14" width="3" height="6" fill="#1a202c" />
        </svg>
      `;

    case 'scarlet-witch':
      return `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" class="pixel-sprite anim-bounce" shape-rendering="crispEdges">
          <!-- Scarlet Tiara -->
          <rect x="5" y="1" width="2" height="4" fill="#9b2c2c" />
          <rect x="13" y="1" width="2" height="4" fill="#9b2c2c" />
          <rect x="7" y="2" width="6" height="2" fill="#9b2c2c" />
          <!-- Face & Brown Hair -->
          <rect x="4" y="4" width="2" height="5" fill="#744210" />
          <rect x="14" y="4" width="2" height="5" fill="#744210" />
          <rect x="6" y="4" width="8" height="4" fill="#fbd38d" />
          <!-- Red Coat -->
          <rect x="5" y="8" width="10" height="7" fill="#e53e3e" />
          <rect x="8" y="8" width="4" height="6" fill="#1a202c" />
          <!-- Floating Chaos Magic -->
          <rect x="2" y="11" width="2" height="2" fill="#d53f8c" class="pixel-spark" />
          <rect x="16" y="11" width="2" height="2" fill="#d53f8c" class="pixel-spark" />
          <!-- Legs -->
          <rect x="6" y="15" width="3" height="5" fill="#1a202c" />
          <rect x="11" y="15" width="3" height="5" fill="#1a202c" />
        </svg>
      `;

    case 'magneto':
      return `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" class="pixel-sprite anim-float" shape-rendering="crispEdges">
          <!-- Crimson Helmet -->
          <rect x="6" y="1" width="8" height="7" fill="#9b2c2c" />
          <rect x="7" y="4" width="6" height="3" fill="#553c9a" />
          <rect x="9" y="5" width="2" height="1" fill="#fbd38d" />
          <!-- Purple Cape -->
          <rect x="3" y="8" width="14" height="10" fill="#553c9a" />
          <!-- Red Body -->
          <rect x="6" y="8" width="8" height="6" fill="#9b2c2c" />
          <rect x="7" y="13" width="6" height="1" fill="#ecc94b" />
          <!-- Legs -->
          <rect x="6" y="14" width="3" height="6" fill="#553c9a" />
          <rect x="11" y="14" width="3" height="6" fill="#553c9a" />
        </svg>
      `;

    default:
      return `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" class="pixel-sprite" shape-rendering="crispEdges">
          <rect x="6" y="2" width="8" height="6" fill="#718096" />
          <rect x="5" y="8" width="10" height="6" fill="#4a5568" />
          <rect x="6" y="14" width="3" height="5" fill="#2d3748" />
          <rect x="11" y="14" width="3" height="5" fill="#2d3748" />
        </svg>
      `;
  }
}
