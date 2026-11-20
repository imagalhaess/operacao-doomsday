// Curated animated thematic emblems for each Marvel title along the narrative trail

type IconType =
  | 'arc-reactor'
  | 'shield'
  | 'hammer'
  | 'gamma'
  | 'avengers'
  | 'orb'
  | 'ant'
  | 'eye'
  | 'spider'
  | 'panther'
  | 'gauntlet'
  | 'quantum'
  | 'hex'
  | 'tva'
  | 'mutant'
  | 'claws'
  | 'fantastic'
  | 'doom'
  | 'radar';

const ITEM_TO_ICON: Record<string, IconType> = {
  // Iron Man
  'iron-man': 'arc-reactor',
  'iron-man-2': 'arc-reactor',
  'iron-man-3': 'arc-reactor',
  'ironheart': 'arc-reactor',

  // Cap
  'captain-america-first': 'shield',
  'winter-soldier': 'shield',
  'civil-war': 'shield',
  'falcon-winter': 'shield',
  'brave-new-world': 'shield',

  // Thor
  'thor': 'hammer',
  'thor-dark-world': 'hammer',
  'thor-ragnarok': 'hammer',
  'thor-love-thunder': 'hammer',

  // Hulk
  'incredible-hulk': 'gamma',

  // Avengers team
  'avengers': 'avengers',
  'age-of-ultron': 'avengers',
  'infinity-war': 'gauntlet',
  'endgame': 'quantum',
  'avengers-encore': 'avengers',
  'thunderbolts': 'shield',

  // Cosmic & Guardians
  'guardians': 'orb',
  'guardians-2': 'orb',
  'guardians-3': 'orb',
  'captain-marvel': 'orb',
  'marvels': 'orb',
  'eternals': 'orb',

  // Ant-Man
  'ant-man': 'ant',
  'ant-man-wasp': 'ant',
  'quantumania': 'ant',

  // Strange & Mystic
  'doctor-strange': 'eye',
  'multiverse-madness': 'eye',
  'agatha': 'hex',
  'wandavision': 'hex',
  'visionquest': 'hex',

  // Spidey
  'spider-homecoming': 'spider',
  'spider-far-from-home': 'spider',
  'no-way-home': 'spider',
  'raimi-spider': 'spider',
  'raimi-spider-2': 'spider',
  'raimi-spider-3': 'spider',
  'amazing-spider': 'spider',
  'amazing-spider-2': 'spider',

  // Wakanda
  'black-panther': 'panther',
  'wakanda-forever': 'panther',
  'eyes-of-wakanda': 'panther',

  // Shang-Chi, Echo, Demolidor
  'shang-chi': 'orb',
  'daredevil-1': 'radar',
  'daredevil-2': 'radar',
  'echo': 'radar',
  'punisher-one-last-kill': 'claws',
  'hawkeye': 'radar',
  'moon-knight': 'eye',
  'secret-invasion': 'eye',
  'what-if-1-3': 'quantum',
  'wonder-man': 'radar',
  'ms-marvel': 'orb',

  // Loki & TVA
  'loki-1': 'tva',
  'loki-2': 'tva',

  // Mutants & Fox
  'x-men': 'mutant',
  'x2': 'mutant',
  'x3': 'mutant',
  'first-class': 'mutant',
  'days-future-past': 'mutant',
  'apocalypse': 'mutant',
  'dark-phoenix': 'mutant',
  'new-mutants': 'mutant',
  'x-origins-wolverine': 'claws',
  'wolverine-immortal': 'claws',
  'logan': 'claws',
  'deadpool': 'claws',
  'deadpool-2': 'claws',
  'deadpool-wolverine': 'claws',

  // Fantastic Four & Doom
  'fantastic-four-2005': 'fantastic',
  'fantastic-four-rise': 'fantastic',
  'fantastic-four-2015': 'fantastic',
  'fantastic-four': 'fantastic',
  'doomsday': 'doom'
};

export function getTrailIcon(itemId: string): string {
  const type = ITEM_TO_ICON[itemId] || 'radar';

  switch (type) {
    case 'arc-reactor':
      return `
        <svg class="trail-icon icon--arc" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(114,166,255,0.4)" stroke-width="1.5" />
          <circle class="anim-spin" cx="18" cy="18" r="11" fill="none" stroke="#72a6ff" stroke-width="2" stroke-dasharray="4,3" />
          <polygon class="anim-pulse" points="18,10 24,22 12,22" fill="none" stroke="#52d19c" stroke-width="1.8" />
          <circle cx="18" cy="18" r="3.5" fill="#52d19c" />
        </svg>
      `;

    case 'shield':
      return `
        <svg class="trail-icon icon--shield" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#e5484d" stroke-width="2" />
          <circle cx="18" cy="18" r="11.5" fill="none" stroke="rgba(245,247,251,0.6)" stroke-width="2" />
          <circle cx="18" cy="18" r="8" fill="none" stroke="#e5484d" stroke-width="2" />
          <circle cx="18" cy="18" r="5" fill="#1b2637" />
          <path class="anim-pulse" d="M18,14 L19.2,17.2 L22.5,17.2 L19.8,19.2 L20.8,22.2 L18,20.2 L15.2,22.2 L16.2,19.2 L13.5,17.2 L16.8,17.2 Z" fill="#f5f7fb" />
        </svg>
      `;

    case 'hammer':
      return `
        <svg class="trail-icon icon--hammer" viewBox="0 0 36 36">
          <rect x="10" y="10" width="16" height="10" rx="1.5" fill="none" stroke="#72a6ff" stroke-width="1.8" />
          <line x1="18" y1="20" x2="18" y2="28" stroke="#f4bb65" stroke-width="2.5" stroke-linecap="round" />
          <path class="anim-spark" d="M12,15 L14,12 L16,16 L18,13 L20,17 L22,14" fill="none" stroke="#52d19c" stroke-width="1.2" />
        </svg>
      `;

    case 'gamma':
      return `
        <svg class="trail-icon icon--gamma" viewBox="0 0 36 36">
          <circle class="anim-pulse" cx="18" cy="18" r="14" fill="none" stroke="#52d19c" stroke-width="1.5" stroke-dasharray="3,2" />
          <circle cx="18" cy="18" r="5" fill="#52d19c" />
          <path d="M18,6 L18,13 M8,24 L14,20 M28,24 L22,20" stroke="#52d19c" stroke-width="2.2" stroke-linecap="round" />
        </svg>
      `;

    case 'avengers':
      return `
        <svg class="trail-icon icon--avengers" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(244,187,101,0.4)" stroke-width="1.5" />
          <path class="anim-pulse" d="M14,26 L18,9 L22,26 M15.5,20 L20.5,20" fill="none" stroke="#f4bb65" stroke-width="2.5" stroke-linecap="round" />
          <line x1="12" y1="20" x2="25" y2="17" stroke="#e5484d" stroke-width="2" stroke-linecap="round" />
        </svg>
      `;

    case 'gauntlet':
      return `
        <svg class="trail-icon icon--gauntlet" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#f4bb65" stroke-width="1.5" />
          <circle class="anim-pulse" cx="18" cy="18" r="3.5" fill="#f4bb65" />
          <circle class="anim-spark" cx="13" cy="12" r="2" fill="#72a6ff" />
          <circle class="anim-spark" cx="23" cy="12" r="2" fill="#e5484d" />
          <circle class="anim-spark" cx="10" cy="18" r="2" fill="#a78bfa" />
          <circle class="anim-spark" cx="26" cy="18" r="2" fill="#fb923c" />
          <circle class="anim-spark" cx="18" cy="25" r="2" fill="#52d19c" />
        </svg>
      `;

    case 'eye':
      return `
        <svg class="trail-icon icon--eye" viewBox="0 0 36 36">
          <path d="M6,18 C10,11 26,11 30,18 C26,25 10,25 6,18 Z" fill="none" stroke="#52d19c" stroke-width="1.8" />
          <circle class="anim-spin" cx="18" cy="18" r="5.5" fill="none" stroke="#52d19c" stroke-width="1.5" stroke-dasharray="2,2" />
          <circle class="anim-pulse" cx="18" cy="18" r="2.5" fill="#52d19c" />
        </svg>
      `;

    case 'spider':
      return `
        <svg class="trail-icon icon--spider" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#e5484d" stroke-width="1.5" />
          <ellipse class="anim-pulse" cx="18" cy="18" rx="4" ry="7" fill="#e5484d" />
          <path d="M15,14 Q9,10 7,14 M21,14 Q27,10 29,14 M15,22 Q9,26 7,22 M21,22 Q27,26 29,22" fill="none" stroke="#e5484d" stroke-width="1.6" stroke-linecap="round" />
        </svg>
      `;

    case 'panther':
      return `
        <svg class="trail-icon icon--panther" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#c084fc" stroke-width="1.5" />
          <path class="anim-pulse" d="M12,10 L14,16 L18,22 L22,16 L24,10 M18,22 L18,28" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;

    case 'tva':
      return `
        <svg class="trail-icon icon--tva" viewBox="0 0 36 36">
          <rect class="anim-pulse" x="11" y="8" width="14" height="20" rx="2" fill="none" stroke="#fb923c" stroke-width="2" />
          <line x1="18" y1="8" x2="18" y2="28" stroke="#fb923c" stroke-width="1.2" stroke-dasharray="2,2" />
          <circle cx="21" cy="18" r="1.5" fill="#fb923c" />
        </svg>
      `;

    case 'mutant':
      return `
        <svg class="trail-icon icon--mutant" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#72a6ff" stroke-width="2" />
          <path class="anim-pulse" d="M11,11 L25,25 M25,11 L11,25" stroke="#72a6ff" stroke-width="3" stroke-linecap="round" />
        </svg>
      `;

    case 'claws':
      return `
        <svg class="trail-icon icon--claws" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#ff6b70" stroke-width="1.5" />
          <path class="anim-pulse" d="M12,8 Q14,18 10,28 M18,7 Q20,18 17,29 M24,8 Q26,18 24,28" fill="none" stroke="#ff6b70" stroke-width="2.2" stroke-linecap="round" />
        </svg>
      `;

    case 'fantastic':
      return `
        <svg class="trail-icon icon--fantastic" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#72a6ff" stroke-width="2" />
          <path class="anim-pulse" d="M21,11 L14,20 L24,20 M21,11 L21,26" fill="none" stroke="#72a6ff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;

    case 'doom':
      return `
        <svg class="trail-icon icon--doom" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#52d19c" stroke-width="1.8" />
          <path d="M11,13 Q18,8 25,13 L24,23 Q18,27 12,23 Z" fill="none" stroke="#c6cfdb" stroke-width="2" />
          <line class="anim-pulse" x1="13" y1="17" x2="16" y2="17" stroke="#52d19c" stroke-width="2.5" stroke-linecap="round" />
          <line class="anim-pulse" x1="20" y1="17" x2="23" y2="17" stroke="#52d19c" stroke-width="2.5" stroke-linecap="round" />
          <path d="M15,22 Q18,24 21,22" stroke="#52d19c" stroke-width="1.5" fill="none" />
        </svg>
      `;

    case 'quantum':
    case 'orb':
    case 'hex':
    case 'ant':
    case 'radar':
    default:
      return `
        <svg class="trail-icon icon--radar" viewBox="0 0 36 36">
          <circle class="anim-spin" cx="18" cy="18" r="14" fill="none" stroke="#f4bb65" stroke-width="1.2" stroke-dasharray="4,3" />
          <circle class="anim-pulse" cx="18" cy="18" r="4" fill="#f4bb65" />
          <line x1="18" y1="4" x2="18" y2="32" stroke="rgba(244,187,101,0.3)" stroke-width="1" />
          <line x1="4" y1="18" x2="32" y2="18" stroke="rgba(244,187,101,0.3)" stroke-width="1" />
        </svg>
      `;
  }
}

