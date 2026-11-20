export interface MarvelCharacter {
  id: string;
  name: string;
  alias: string;
  badge: string; // Emoji / Icon symbol
  color: string;
  accent: string;
  quote: string;
  avatarSvg: string;
}

export const CHARACTERS: MarvelCharacter[] = [
  {
    id: 'iron-man',
    name: 'Tony Stark',
    alias: 'Homem de Ferro',
    badge: '⚡',
    color: '#e5484d',
    accent: '#72a6ff',
    quote: 'Eu sou o Homem de Ferro.',
    avatarSvg: `
      <svg viewBox="0 0 40 40" class="char-avatar-svg">
        <circle cx="20" cy="20" r="18" fill="#1b2637" stroke="#e5484d" stroke-width="2"/>
        <circle cx="20" cy="20" r="12" fill="none" stroke="#72a6ff" stroke-width="1.8" stroke-dasharray="3,2"/>
        <polygon points="20,12 26,24 14,24" fill="#72a6ff" opacity="0.85"/>
        <circle cx="20" cy="20" r="3" fill="#ffffff"/>
      </svg>
    `
  },
  {
    id: 'captain-america',
    name: 'Steve Rogers',
    alias: 'Capitão América',
    badge: '🛡️',
    color: '#72a6ff',
    accent: '#e5484d',
    quote: 'Eu posso fazer isso o dia todo.',
    avatarSvg: `
      <svg viewBox="0 0 40 40" class="char-avatar-svg">
        <circle cx="20" cy="20" r="18" fill="#1b2637" stroke="#72a6ff" stroke-width="2"/>
        <circle cx="20" cy="20" r="14" fill="none" stroke="#e5484d" stroke-width="2"/>
        <circle cx="20" cy="20" r="10" fill="none" stroke="#f5f7fb" stroke-width="2"/>
        <circle cx="20" cy="20" r="6" fill="#1b2637"/>
        <polygon points="20,15 21.5,18.5 25,18.5 22.2,20.8 23.2,24 20,22 16.8,24 17.8,20.8 15,18.5 18.5,18.5" fill="#f5f7fb"/>
      </svg>
    `
  },
  {
    id: 'thor',
    name: 'Thor Odinson',
    alias: 'Deus do Trovão',
    badge: '🔨',
    color: '#f4bb65',
    accent: '#72a6ff',
    quote: 'Tragam-me o Thanos!',
    avatarSvg: `
      <svg viewBox="0 0 40 40" class="char-avatar-svg">
        <circle cx="20" cy="20" r="18" fill="#1b2637" stroke="#f4bb65" stroke-width="2"/>
        <rect x="13" y="14" width="14" height="9" rx="1.5" fill="#72a6ff" opacity="0.8"/>
        <line x1="20" y1="23" x2="20" y2="30" stroke="#f4bb65" stroke-width="3" stroke-linecap="round"/>
        <circle cx="20" cy="18" r="2" fill="#ffffff"/>
      </svg>
    `
  },
  {
    id: 'spider-man',
    name: 'Peter Parker',
    alias: 'Homem-Aranha',
    badge: '🕷️',
    color: '#e5484d',
    accent: '#72a6ff',
    quote: 'Com grandes poderes vêm grandes responsabilidades.',
    avatarSvg: `
      <svg viewBox="0 0 40 40" class="char-avatar-svg">
        <circle cx="20" cy="20" r="18" fill="#1b2637" stroke="#e5484d" stroke-width="2"/>
        <ellipse cx="20" cy="20" rx="5" ry="8" fill="#e5484d"/>
        <circle cx="17.5" cy="18" r="2.5" fill="#ffffff"/>
        <circle cx="22.5" cy="18" r="2.5" fill="#ffffff"/>
      </svg>
    `
  },
  {
    id: 'scarlet-witch',
    name: 'Wanda Maximoff',
    alias: 'Feiticeira Escarlate',
    badge: '✨',
    color: '#ff6b70',
    accent: '#c084fc',
    quote: 'Você não faz ideia do que eu sou capaz.',
    avatarSvg: `
      <svg viewBox="0 0 40 40" class="char-avatar-svg">
        <circle cx="20" cy="20" r="18" fill="#1b2637" stroke="#ff6b70" stroke-width="2"/>
        <path d="M12,16 Q20,10 28,16 L25,26 Q20,28 15,26 Z" fill="none" stroke="#ff6b70" stroke-width="2"/>
        <circle cx="20" cy="20" r="3.5" fill="#c084fc"/>
      </svg>
    `
  },
  {
    id: 'loki',
    name: 'Loki Laufeyson',
    alias: 'Deus da Trapaça',
    badge: '👑',
    color: '#52d19c',
    accent: '#f4bb65',
    quote: 'Propósito glorioso.',
    avatarSvg: `
      <svg viewBox="0 0 40 40" class="char-avatar-svg">
        <circle cx="20" cy="20" r="18" fill="#1b2637" stroke="#52d19c" stroke-width="2"/>
        <path d="M13,24 Q11,12 16,15 Q18,22 20,24 Q22,22 24,15 Q29,12 27,24 Z" fill="#f4bb65" opacity="0.9"/>
        <circle cx="20" cy="23" r="2.5" fill="#52d19c"/>
      </svg>
    `
  },
  {
    id: 'deadpool',
    name: 'Wade Wilson',
    alias: 'Deadpool',
    badge: '⚔️',
    color: '#e5484d',
    accent: '#f5f7fb',
    quote: 'Hora de fazer umas chimichangas.',
    avatarSvg: `
      <svg viewBox="0 0 40 40" class="char-avatar-svg">
        <circle cx="20" cy="20" r="18" fill="#e5484d" stroke="#080b11" stroke-width="2"/>
        <ellipse cx="14" cy="20" rx="4" ry="7" fill="#080b11"/>
        <ellipse cx="26" cy="20" rx="4" ry="7" fill="#080b11"/>
        <circle cx="14" cy="20" r="1.8" fill="#ffffff"/>
        <circle cx="26" cy="20" r="1.8" fill="#ffffff"/>
      </svg>
    `
  },
  {
    id: 'wolverine',
    name: 'Logan',
    alias: 'Wolverine',
    badge: '🐾',
    color: '#f4bb65',
    accent: '#72a6ff',
    quote: 'Eu sou o melhor no que faço.',
    avatarSvg: `
      <svg viewBox="0 0 40 40" class="char-avatar-svg">
        <circle cx="20" cy="20" r="18" fill="#1b2637" stroke="#f4bb65" stroke-width="2"/>
        <path d="M12,12 Q14,22 10,28 M20,10 Q21,22 19,29 M28,12 Q26,22 28,28" stroke="#f4bb65" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 'doctor-doom',
    name: 'Victor von Doom',
    alias: 'Doutor Destino',
    badge: '🦾',
    color: '#52d19c',
    accent: '#c6cfdb',
    quote: 'Destino não obedece a ninguém.',
    avatarSvg: `
      <svg viewBox="0 0 40 40" class="char-avatar-svg">
        <circle cx="20" cy="20" r="18" fill="#1b2637" stroke="#52d19c" stroke-width="2"/>
        <path d="M13,14 Q20,10 27,14 L25,25 Q20,29 15,25 Z" fill="#c6cfdb" stroke="#080b11" stroke-width="1.5"/>
        <line x1="16" y1="18" x2="18" y2="18" stroke="#52d19c" stroke-width="2"/>
        <line x1="22" y1="18" x2="24" y2="18" stroke="#52d19c" stroke-width="2"/>
      </svg>
    `
  }
];

export function getCharacter(id: string): MarvelCharacter {
  return CHARACTERS.find((c) => c.id === id) || CHARACTERS[0];
}
