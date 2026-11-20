export type CharacterFaction = 'hero' | 'villain';

export interface MarvelCharacter {
  id: string;
  name: string;
  alias: string;
  faction: CharacterFaction;
  badge: string;
  color: string;
  accent: string;
  quote: string;
  powerLevel: number; // 1 to 5
}

export const CHARACTERS: MarvelCharacter[] = [
  // ─── Super-Heróis ───────────────────────────────────────────
  {
    id: 'iron-man',
    name: 'Tony Stark',
    alias: 'Homem de Ferro',
    faction: 'hero',
    badge: '⚡',
    color: '#e5484d',
    accent: '#72a6ff',
    quote: 'Eu sou o Homem de Ferro.',
    powerLevel: 5
  },
  {
    id: 'captain-america',
    name: 'Steve Rogers',
    alias: 'Capitão América',
    faction: 'hero',
    badge: '🛡️',
    color: '#72a6ff',
    accent: '#e5484d',
    quote: 'Eu posso fazer isso o dia todo.',
    powerLevel: 4
  },
  {
    id: 'thor',
    name: 'Thor Odinson',
    alias: 'Deus do Trovão',
    faction: 'hero',
    badge: '🔨',
    color: '#f4bb65',
    accent: '#72a6ff',
    quote: 'Tragam-me o Thanos!',
    powerLevel: 5
  },
  {
    id: 'spider-man',
    name: 'Peter Parker',
    alias: 'Homem-Aranha',
    faction: 'hero',
    badge: '🕷️',
    color: '#e5484d',
    accent: '#72a6ff',
    quote: 'Com grandes poderes vêm grandes responsabilidades.',
    powerLevel: 4
  },
  {
    id: 'wolverine',
    name: 'Logan',
    alias: 'Wolverine',
    faction: 'hero',
    badge: '🐾',
    color: '#f4bb65',
    accent: '#72a6ff',
    quote: 'Eu sou o melhor no que faço.',
    powerLevel: 4
  },
  {
    id: 'hulk',
    name: 'Bruce Banner',
    alias: 'O Incrível Hulk',
    faction: 'hero',
    badge: '☢️',
    color: '#52d19c',
    accent: '#a855f7',
    quote: 'Hulk esmaga!',
    powerLevel: 5
  },

  // ─── Hipervilões & Anti-Heróis ──────────────────────────────
  {
    id: 'doctor-doom',
    name: 'Victor von Doom',
    alias: 'Doutor Destino',
    faction: 'villain',
    badge: '🦾',
    color: '#52d19c',
    accent: '#c6cfdb',
    quote: 'Destino não obedece a ninguém.',
    powerLevel: 5
  },
  {
    id: 'thanos',
    name: 'Thanos',
    alias: 'O Titã Louco',
    faction: 'villain',
    badge: '🫰',
    color: '#c084fc',
    accent: '#f4bb65',
    quote: 'Eu sou inevitável.',
    powerLevel: 5
  },
  {
    id: 'loki',
    name: 'Loki Laufeyson',
    alias: 'Deus da Trapaça',
    faction: 'villain',
    badge: '👑',
    color: '#52d19c',
    accent: '#f4bb65',
    quote: 'Propósito glorioso.',
    powerLevel: 4
  },
  {
    id: 'deadpool',
    name: 'Wade Wilson',
    alias: 'Deadpool',
    faction: 'villain',
    badge: '⚔️',
    color: '#e5484d',
    accent: '#f5f7fb',
    quote: 'Hora de fazer umas chimichangas.',
    powerLevel: 4
  },
  {
    id: 'scarlet-witch',
    name: 'Wanda Maximoff',
    alias: 'Feiticeira Escarlate',
    faction: 'villain',
    badge: '✨',
    color: '#ff6b70',
    accent: '#c084fc',
    quote: 'Você não faz ideia do que eu sou capaz.',
    powerLevel: 5
  },
  {
    id: 'magneto',
    name: 'Erik Lehnsherr',
    alias: 'Magneto',
    faction: 'villain',
    badge: '🧲',
    color: '#e5484d',
    accent: '#c084fc',
    quote: 'A paz nunca foi uma opção.',
    powerLevel: 5
  }
];

export function getCharacter(id: string): MarvelCharacter {
  return CHARACTERS.find((c) => c.id === id) || CHARACTERS[0];
}
