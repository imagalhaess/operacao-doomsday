import type { Track, TrackItem, EnrichedItem } from './types';

const row = (
  id: string,
  title: string,
  original: string,
  year: number,
  type: string,
  importance: 'ESSENCIAL' | 'COMPLEMENTAR' | 'OPCIONAL' = 'COMPLEMENTAR'
): TrackItem => ({ id, title, original, year, type, importance });

const track = (
  id: string,
  number: string,
  name: string,
  period: string,
  description: string,
  items: TrackItem[],
  insight: string,
  next: string
): Track => ({ id, number, name, period, description, items, insight, next });

export const tracks: Track[] = [
  track(
    't1',
    '01',
    'A FORMAÇÃO DO MCU',
    '2008 — 2012',
    'Os reatores, deuses e supersoldados que formaram a primeira equipe.',
    [
      row('iron-man', 'Homem de Ferro', 'Iron Man', 2008, 'Filme', 'ESSENCIAL'),
      row('incredible-hulk', 'O Incrível Hulk', 'The Incredible Hulk', 2008, 'Filme', 'COMPLEMENTAR'),
      row('iron-man-2', 'Homem de Ferro 2', 'Iron Man 2', 2010, 'Filme', 'COMPLEMENTAR'),
      row('thor', 'Thor', 'Thor', 2011, 'Filme', 'ESSENCIAL'),
      row('captain-america-first', 'Capitão América: O Primeiro Vingador', 'Captain America: The First Avenger', 2011, 'Filme', 'ESSENCIAL'),
      row('avengers', 'Os Vingadores', 'The Avengers', 2012, 'Filme', 'ESSENCIAL')
    ],
    'Tony Stark, Steve Rogers e Thor são os eixos que tornam a reunião possível.',
    'O mundo se expande para além de Nova York e começa a testar as fraturas da equipe.'
  ),
  track(
    't2',
    '02',
    'O MUNDO SE EXPANDE',
    '2013 — 2015',
    'Novas equipes, ameaças cósmicas e a tecnologia que muda de mãos.',
    [
      row('iron-man-3', 'Homem de Ferro 3', 'Iron Man 3', 2013, 'Filme', 'COMPLEMENTAR'),
      row('thor-dark-world', 'Thor: O Mundo Sombrio', 'Thor: The Dark World', 2013, 'Filme', 'COMPLEMENTAR'),
      row('winter-soldier', 'Capitão América: O Soldado Invernal', 'Captain America: The Winter Soldier', 2014, 'Filme', 'ESSENCIAL'),
      row('guardians', 'Guardiões da Galáxia', 'Guardians of the Galaxy', 2014, 'Filme', 'ESSENCIAL'),
      row('age-of-ultron', 'Vingadores: Era de Ultron', 'Avengers: Age of Ultron', 2015, 'Filme', 'ESSENCIAL'),
      row('ant-man', 'Homem-Formiga', 'Ant-Man', 2015, 'Filme', 'COMPLEMENTAR')
    ],
    'A queda da S.H.I.E.L.D. e a entrada dos Guardiões abrem duas frentes narrativas para a Guerra Infinita.',
    'A Guerra Civil transforma aliados em lados opostos.'
  ),
  track(
    't3',
    '03',
    'GUERRA CIVIL E GUERRA INFINITA',
    '2016 — 2019',
    'A divisão dos Vingadores encontra o poder das Joias e o custo do estalo.',
    [
      row('civil-war', 'Capitão América: Guerra Civil', 'Captain America: Civil War', 2016, 'Filme', 'ESSENCIAL'),
      row('doctor-strange', 'Doutor Estranho', 'Doctor Strange', 2016, 'Filme', 'ESSENCIAL'),
      row('guardians-2', 'Guardiões da Galáxia Vol. 2', 'Guardians of the Galaxy Vol. 2', 2017, 'Filme', 'COMPLEMENTAR'),
      row('spider-homecoming', 'Homem-Aranha: De Volta ao Lar', 'Spider-Man: Homecoming', 2017, 'Filme', 'COMPLEMENTAR'),
      row('thor-ragnarok', 'Thor: Ragnarok', 'Thor: Ragnarok', 2017, 'Filme', 'ESSENCIAL'),
      row('black-panther', 'Pantera Negra', 'Black Panther', 2018, 'Filme', 'ESSENCIAL'),
      row('infinity-war', 'Vingadores: Guerra Infinita', 'Avengers: Infinity War', 2018, 'Filme', 'ESSENCIAL'),
      row('ant-man-wasp', 'Homem-Formiga e a Vespa', 'Ant-Man and the Wasp', 2018, 'Filme', 'COMPLEMENTAR'),
      row('captain-marvel', 'Capitã Marvel', 'Captain Marvel', 2019, 'Filme', 'ESSENCIAL'),
      row('endgame', 'Vingadores: Ultimato', 'Avengers: Endgame', 2019, 'Filme', 'ESSENCIAL'),
      row('spider-far-from-home', 'Homem-Aranha: Longe de Casa', 'Spider-Man: Far From Home', 2019, 'Filme', 'COMPLEMENTAR')
    ],
    'Thanos, as Joias, o estalo e o legado de Tony Stark passam a organizar a memória do universo.',
    'O pós-vida dos heróis encontra um multiverso cada vez mais explícito.'
  ),
  track(
    't4',
    '04',
    'O MULTIVERSO',
    '2021 — 2023',
    'Variantes, linhas do tempo e novos legados depois do Blip.',
    [
      row('black-widow', 'Viúva Negra', 'Black Widow', 2021, 'Filme', 'COMPLEMENTAR'),
      row('shang-chi', 'Shang-Chi e a Lenda dos Dez Anéis', 'Shang-Chi and the Legend of the Ten Rings', 2021, 'Filme', 'COMPLEMENTAR'),
      row('eternals', 'Eternos', 'Eternals', 2021, 'Filme', 'OPCIONAL'),
      row('no-way-home', 'Homem-Aranha: Sem Volta para Casa', 'Spider-Man: No Way Home', 2021, 'Filme', 'ESSENCIAL'),
      row('multiverse-madness', 'Doutor Estranho no Multiverso da Loucura', 'Doctor Strange in the Multiverse of Madness', 2022, 'Filme', 'ESSENCIAL'),
      row('thor-love-thunder', 'Thor: Amor e Trovão', 'Thor: Love and Thunder', 2022, 'Filme', 'COMPLEMENTAR'),
      row('wakanda-forever', 'Pantera Negra: Wakanda Para Sempre', 'Black Panther: Wakanda Forever', 2022, 'Filme', 'ESSENCIAL'),
      row('quantumania', 'Homem-Formiga e a Vespa: Quantumania', 'Ant-Man and the Wasp: Quantumania', 2023, 'Filme', 'ESSENCIAL'),
      row('guardians-3', 'Guardiões da Galáxia Vol. 3', 'Guardians of the Galaxy Vol. 3', 2023, 'Filme', 'COMPLEMENTAR'),
      row('marvels', 'As Marvels', 'The Marvels', 2023, 'Filme', 'COMPLEMENTAR')
    ],
    'O multiverso deixa de ser uma hipótese e vira uma estrutura dramática com consequências.',
    'A colisão passa a envolver equipes, legados e realidades inteiras.'
  ),
  track(
    't5',
    '05',
    'A COLISÃO DE UNIVERSOS',
    '2024 — 2026',
    'O novo núcleo de heróis e os títulos oficialmente colocados no caminho de Doomsday.',
    [
      row('deadpool-wolverine', 'Deadpool & Wolverine', 'Deadpool & Wolverine', 2024, 'Filme', 'ESSENCIAL'),
      row('brave-new-world', 'Capitão América: Admirável Mundo Novo', 'Captain America: Brave New World', 2025, 'Filme', 'ESSENCIAL'),
      row('thunderbolts', 'Thunderbolts*', 'Thunderbolts*', 2025, 'Filme', 'ESSENCIAL'),
      row('fantastic-four', 'Quarteto Fantástico: Primeiros Passos', 'The Fantastic Four: First Steps', 2025, 'Filme', 'ESSENCIAL'),
      row('eyes-of-wakanda', 'Eyes of Wakanda', 'Eyes of Wakanda', 2025, 'Série', 'COMPLEMENTAR'),
      row('punisher-one-last-kill', 'The Punisher: One Last Kill', 'The Punisher: One Last Kill', 2026, 'Especial', 'COMPLEMENTAR'),
      row('avengers-encore', 'Avengers: Endgame Encore', 'Avengers: Endgame Encore', 2026, 'Especial', 'COMPLEMENTAR'),
      row('doomsday', 'Avengers: Doomsday', 'Avengers: Doomsday', 2026, 'Filme', 'ESSENCIAL')
    ],
    'As páginas oficiais já conectam X-Men, Wakanda, Quarteto Fantástico, Victor von Doom e o retorno de rostos conhecidos.',
    'A próxima etapa é acompanhar o que o próprio filme confirma — não o que rumores prometem.'
  ),
  track(
    't6',
    '06',
    'OS X-MEN DA FOX',
    '2000 — 2020',
    'A linhagem mutante que prepara o terreno para encontros entre universos.',
    [
      row('x-men', 'X-Men: O Filme', 'X-Men', 2000, 'Filme', 'ESSENCIAL'),
      row('x2', 'X-Men 2', 'X2: X-Men United', 2003, 'Filme', 'ESSENCIAL'),
      row('x3', 'X-Men: O Confronto Final', 'X-Men: The Last Stand', 2006, 'Filme', 'COMPLEMENTAR'),
      row('x-origins-wolverine', 'X-Men Origens: Wolverine', 'X-Men Origins: Wolverine', 2009, 'Filme', 'OPCIONAL'),
      row('first-class', 'X-Men: Primeira Classe', 'X-Men: First Class', 2011, 'Filme', 'ESSENCIAL'),
      row('wolverine-immortal', 'Wolverine: Imortal', 'The Wolverine', 2013, 'Filme', 'COMPLEMENTAR'),
      row('days-future-past', 'X-Men: Dias de um Futuro Esquecido', 'X-Men: Days of Future Past', 2014, 'Filme', 'ESSENCIAL'),
      row('deadpool', 'Deadpool', 'Deadpool', 2016, 'Filme', 'COMPLEMENTAR'),
      row('apocalypse', 'X-Men: Apocalipse', 'X-Men: Apocalypse', 2016, 'Filme', 'COMPLEMENTAR'),
      row('logan', 'Logan', 'Logan', 2017, 'Filme', 'ESSENCIAL'),
      row('deadpool-2', 'Deadpool 2', 'Deadpool 2', 2018, 'Filme', 'COMPLEMENTAR'),
      row('dark-phoenix', 'X-Men: Fênix Negra', 'Dark Phoenix', 2019, 'Filme', 'OPCIONAL'),
      row('new-mutants', 'Os Novos Mutantes', 'The New Mutants', 2020, 'Filme', 'OPCIONAL')
    ],
    'O essencial aqui é reconhecer rostos, relações e versões de mutantes que podem atravessar realidades.',
    'O arquivo mutante complementa as escolhas de elenco anunciadas oficialmente.'
  ),
  track(
    't7',
    '07',
    'OUTROS HOMENS-ARANHA E QUARTETO FANTÁSTICO',
    '2002 — 2015',
    'As versões anteriores de Peter Parker e da Primeira Família.',
    [
      row('raimi-spider', 'Homem-Aranha', 'Spider-Man', 2002, 'Filme', 'COMPLEMENTAR'),
      row('raimi-spider-2', 'Homem-Aranha 2', 'Spider-Man 2', 2004, 'Filme', 'COMPLEMENTAR'),
      row('raimi-spider-3', 'Homem-Aranha 3', 'Spider-Man 3', 2007, 'Filme', 'OPCIONAL'),
      row('amazing-spider', 'O Espetacular Homem-Aranha', 'The Amazing Spider-Man', 2012, 'Filme', 'COMPLEMENTAR'),
      row('amazing-spider-2', 'O Espetacular Homem-Aranha 2', 'The Amazing Spider-Man 2', 2014, 'Filme', 'COMPLEMENTAR'),
      row('fantastic-four-2005', 'Quarteto Fantástico', 'Fantastic Four', 2005, 'Filme', 'COMPLEMENTAR'),
      row('fantastic-four-rise', 'Quarteto Fantástico e o Surfista Prateado', 'Fantastic Four: Rise of the Silver Surfer', 2007, 'Filme', 'COMPLEMENTAR'),
      row('fantastic-four-2015', 'Quarteto Fantástico', 'Fantastic Four', 2015, 'Filme', 'OPCIONAL')
    ],
    'Variantes do Homem-Aranha e do Quarteto ajudam a ler o peso emocional de encontros entre versões.',
    'As conexões de variantes ganham sentido quando você reconhece os rostos anteriores.'
  ),
  track(
    't8',
    '08',
    'SÉRIES COMPLEMENTARES',
    '2021 — 2026',
    'As séries que explicam as regras do tempo, o legado e a expansão da TV para o MCU.',
    [
      row('wandavision', 'WandaVision', 'WandaVision', 2021, 'Série', 'ESSENCIAL'),
      row('falcon-winter', 'Falcão e o Soldado Invernal', 'The Falcon and the Winter Soldier', 2021, 'Série', 'COMPLEMENTAR'),
      row('loki-1', 'Loki — Temporada 1', 'Loki — Season 1', 2021, 'Série', 'ESSENCIAL'),
      row('hawkeye', 'Gavião Arqueiro', 'Hawkeye', 2021, 'Série', 'COMPLEMENTAR'),
      row('moon-knight', 'Cavaleiro da Lua', 'Moon Knight', 2022, 'Série', 'OPCIONAL'),
      row('ms-marvel', 'Ms. Marvel', 'Ms. Marvel', 2022, 'Série', 'COMPLEMENTAR'),
      row('loki-2', 'Loki — Temporada 2', 'Loki — Season 2', 2023, 'Série', 'ESSENCIAL'),
      row('secret-invasion', 'Invasão Secreta', 'Secret Invasion', 2023, 'Série', 'COMPLEMENTAR'),
      row('echo', 'Eco', 'Echo', 2024, 'Série', 'COMPLEMENTAR'),
      row('agatha', 'Agatha Desde Sempre', 'Agatha All Along', 2024, 'Série', 'COMPLEMENTAR'),
      row('daredevil-1', 'Demolidor: Renascido — Temporada 1', 'Daredevil: Born Again — Season 1', 2025, 'Série', 'COMPLEMENTAR'),
      row('ironheart', 'Coração de Ferro', 'Ironheart', 2025, 'Série', 'COMPLEMENTAR'),
      row('what-if-1-3', 'What If…? — Temporadas 1 a 3', 'What If…? — Seasons 1–3', 2021, 'Série', 'COMPLEMENTAR'),
      row('wonder-man', 'Wonder Man', 'Wonder Man — Season 1', 2026, 'Série', 'COMPLEMENTAR'),
      row('daredevil-2', 'Demolidor: Renascido — Temporada 2', 'Daredevil: Born Again — Season 2', 2026, 'Série', 'COMPLEMENTAR'),
      row('visionquest', 'VisionQuest', 'VisionQuest — Season 1', 2026, 'Série', 'COMPLEMENTAR')
    ],
    'Loki estabelece as regras de variantes e linhas do tempo; WandaVision e VisionQuest ampliam o legado de Wanda e Vision.',
    'Com o catálogo concluído, o foco passa a ser a experiência de Doomsday nos cinemas.'
  )
];

export const allItems: EnrichedItem[] = tracks.flatMap((t) =>
  t.items.map((item) => ({
    ...item,
    trackId: t.id,
    trackName: t.name,
    trackNumber: t.number,
  }))
);

export const itemById: Record<string, EnrichedItem> = Object.fromEntries(
  allItems.map((item) => [item.id, item])
);
