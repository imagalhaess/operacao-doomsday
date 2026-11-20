import type { VideoLink } from './types';

export const officialLinks: Record<string, string> = {
  doomsday: 'https://www.marvel.com/articles/movies/avengers-doomsday-teaser-trailer',
  'avengers-encore': 'https://www.marvel.com/articles/movies/avengers-doomsday-what-to-watch-guide-movies-shows-disney-plus',
  'wonder-man': 'https://www.marvel.com/tv-shows/wonder-man/1',
  'daredevil-2': 'https://www.marvel.com/tv-shows/daredevil-born-again/2',
  timeline: 'https://www.marvel.com/articles/movies/mcu-timeline-order-disney-plus'
};

export const officialChannel = 'https://www.youtube.com/channel/UCvC4D8onUfXzvjTOM-dBfEA';

export const videoLinks: Record<string, VideoLink[]> = {
  doomsday: [
    {
      label: 'Trailer oficial de Avengers: Doomsday',
      url: 'https://www.youtube.com/watch?v=irVNGjRFZGk',
      why: 'Primeiro contato visual com o conflito e os personagens anunciados.'
    },
    {
      label: 'Special Look oficial',
      url: 'https://www.youtube.com/watch?v=X1aFkAkFASk',
      why: 'Complementa o trailer com novas imagens sem recorrer a canais não verificados.'
    }
  ]
};
