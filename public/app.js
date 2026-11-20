const STORAGE_KEY = 'operacao-doomsday:v1';
const TODAY = new Date().toISOString().slice(0, 10);

const row = (id, title, original, year, type, importance = 'COMPLEMENTAR') => ({ id, title, original, year, type, importance });
const track = (id, number, name, period, description, items, insight, next) => ({ id, number, name, period, description, items, insight, next });

const tracks = [
  track('t1', '01', 'A FORMAÇÃO DO MCU', '2008 — 2012', 'Os reatores, deuses e supersoldados que formaram a primeira equipe.', [
    row('iron-man', 'Homem de Ferro', 'Iron Man', 2008, 'Filme', 'ESSENCIAL'), row('incredible-hulk', 'O Incrível Hulk', 'The Incredible Hulk', 2008, 'Filme', 'COMPLEMENTAR'), row('iron-man-2', 'Homem de Ferro 2', 'Iron Man 2', 2010, 'Filme', 'COMPLEMENTAR'), row('thor', 'Thor', 'Thor', 2011, 'Filme', 'ESSENCIAL'), row('captain-america-first', 'Capitão América: O Primeiro Vingador', 'Captain America: The First Avenger', 2011, 'Filme', 'ESSENCIAL'), row('avengers', 'Os Vingadores', 'The Avengers', 2012, 'Filme', 'ESSENCIAL')
  ], 'Tony Stark, Steve Rogers e Thor são os eixos que tornam a reunião possível.', 'O mundo se expande para além de Nova York e começa a testar as fraturas da equipe.'),
  track('t2', '02', 'O MUNDO SE EXPANDE', '2013 — 2015', 'Novas equipes, ameaças cósmicas e a tecnologia que muda de mãos.', [
    row('iron-man-3', 'Homem de Ferro 3', 'Iron Man 3', 2013, 'Filme', 'COMPLEMENTAR'), row('thor-dark-world', 'Thor: O Mundo Sombrio', 'Thor: The Dark World', 2013, 'Filme', 'COMPLEMENTAR'), row('winter-soldier', 'Capitão América: O Soldado Invernal', 'Captain America: The Winter Soldier', 2014, 'Filme', 'ESSENCIAL'), row('guardians', 'Guardiões da Galáxia', 'Guardians of the Galaxy', 2014, 'Filme', 'ESSENCIAL'), row('age-of-ultron', 'Vingadores: Era de Ultron', 'Avengers: Age of Ultron', 2015, 'Filme', 'ESSENCIAL'), row('ant-man', 'Homem-Formiga', 'Ant-Man', 2015, 'Filme', 'COMPLEMENTAR')
  ], 'A queda da S.H.I.E.L.D. e a entrada dos Guardiões abrem duas frentes narrativas para a Guerra Infinita.', 'A Guerra Civil transforma aliados em lados opostos.'),
  track('t3', '03', 'GUERRA CIVIL E GUERRA INFINITA', '2016 — 2019', 'A divisão dos Vingadores encontra o poder das Joias e o custo do estalo.', [
    row('civil-war', 'Capitão América: Guerra Civil', 'Captain America: Civil War', 2016, 'Filme', 'ESSENCIAL'), row('doctor-strange', 'Doutor Estranho', 'Doctor Strange', 2016, 'Filme', 'ESSENCIAL'), row('guardians-2', 'Guardiões da Galáxia Vol. 2', 'Guardians of the Galaxy Vol. 2', 2017, 'Filme', 'COMPLEMENTAR'), row('spider-homecoming', 'Homem-Aranha: De Volta ao Lar', 'Spider-Man: Homecoming', 2017, 'Filme', 'COMPLEMENTAR'), row('thor-ragnarok', 'Thor: Ragnarok', 'Thor: Ragnarok', 2017, 'Filme', 'ESSENCIAL'), row('black-panther', 'Pantera Negra', 'Black Panther', 2018, 'Filme', 'ESSENCIAL'), row('infinity-war', 'Vingadores: Guerra Infinita', 'Avengers: Infinity War', 2018, 'Filme', 'ESSENCIAL'), row('ant-man-wasp', 'Homem-Formiga e a Vespa', 'Ant-Man and the Wasp', 2018, 'Filme', 'COMPLEMENTAR'), row('captain-marvel', 'Capitã Marvel', 'Captain Marvel', 2019, 'Filme', 'ESSENCIAL'), row('endgame', 'Vingadores: Ultimato', 'Avengers: Endgame', 2019, 'Filme', 'ESSENCIAL'), row('spider-far-from-home', 'Homem-Aranha: Longe de Casa', 'Spider-Man: Far From Home', 2019, 'Filme', 'COMPLEMENTAR')
  ], 'Thanos, as Joias, o estalo e o legado de Tony Stark passam a organizar a memória do universo.', 'O pós-vida dos heróis encontra um multiverso cada vez mais explícito.'),
  track('t4', '04', 'O MULTIVERSO', '2021 — 2023', 'Variantes, linhas do tempo e novos legados depois do Blip.', [
    row('black-widow', 'Viúva Negra', 'Black Widow', 2021, 'Filme', 'COMPLEMENTAR'), row('shang-chi', 'Shang-Chi e a Lenda dos Dez Anéis', 'Shang-Chi and the Legend of the Ten Rings', 2021, 'Filme', 'COMPLEMENTAR'), row('eternals', 'Eternos', 'Eternals', 2021, 'Filme', 'OPCIONAL'), row('no-way-home', 'Homem-Aranha: Sem Volta para Casa', 'Spider-Man: No Way Home', 2021, 'Filme', 'ESSENCIAL'), row('multiverse-madness', 'Doutor Estranho no Multiverso da Loucura', 'Doctor Strange in the Multiverse of Madness', 2022, 'Filme', 'ESSENCIAL'), row('thor-love-thunder', 'Thor: Amor e Trovão', 'Thor: Love and Thunder', 2022, 'Filme', 'COMPLEMENTAR'), row('wakanda-forever', 'Pantera Negra: Wakanda Para Sempre', 'Black Panther: Wakanda Forever', 2022, 'Filme', 'ESSENCIAL'), row('quantumania', 'Homem-Formiga e a Vespa: Quantumania', 'Ant-Man and the Wasp: Quantumania', 2023, 'Filme', 'ESSENCIAL'), row('guardians-3', 'Guardiões da Galáxia Vol. 3', 'Guardians of the Galaxy Vol. 3', 2023, 'Filme', 'COMPLEMENTAR'), row('marvels', 'As Marvels', 'The Marvels', 2023, 'Filme', 'COMPLEMENTAR')
  ], 'O multiverso deixa de ser uma hipótese e vira uma estrutura dramática com consequências.', 'A colisão passa a envolver equipes, legados e realidades inteiras.'),
  track('t5', '05', 'A COLISÃO DE UNIVERSOS', '2024 — 2026', 'O novo núcleo de heróis e os títulos oficialmente colocados no caminho de Doomsday.', [
    row('deadpool-wolverine', 'Deadpool & Wolverine', 'Deadpool & Wolverine', 2024, 'Filme', 'ESSENCIAL'), row('brave-new-world', 'Capitão América: Admirável Mundo Novo', 'Captain America: Brave New World', 2025, 'Filme', 'ESSENCIAL'), row('thunderbolts', 'Thunderbolts*', 'Thunderbolts*', 2025, 'Filme', 'ESSENCIAL'), row('fantastic-four', 'Quarteto Fantástico: Primeiros Passos', 'The Fantastic Four: First Steps', 2025, 'Filme', 'ESSENCIAL'), row('eyes-of-wakanda', 'Eyes of Wakanda', 'Eyes of Wakanda', 2025, 'Série', 'COMPLEMENTAR'), row('punisher-one-last-kill', 'The Punisher: One Last Kill', 'The Punisher: One Last Kill', 2026, 'Especial', 'COMPLEMENTAR'), row('avengers-encore', 'Avengers: Endgame Encore', 'Avengers: Endgame Encore', 2026, 'Especial', 'COMPLEMENTAR'), row('doomsday', 'Avengers: Doomsday', 'Avengers: Doomsday', 2026, 'Filme', 'ESSENCIAL')
  ], 'As páginas oficiais já conectam X-Men, Wakanda, Quarteto Fantástico, Victor von Doom e o retorno de rostos conhecidos.', 'A próxima etapa é acompanhar o que o próprio filme confirma — não o que rumores prometem.'),
  track('t6', '06', 'OS X-MEN DA FOX', '2000 — 2020', 'A linhagem mutante que prepara o terreno para encontros entre universos.', [
    row('x-men', 'X-Men: O Filme', 'X-Men', 2000, 'Filme', 'ESSENCIAL'), row('x2', 'X-Men 2', 'X2: X-Men United', 2003, 'Filme', 'ESSENCIAL'), row('x3', 'X-Men: O Confronto Final', 'X-Men: The Last Stand', 2006, 'Filme', 'COMPLEMENTAR'), row('x-origins-wolverine', 'X-Men Origens: Wolverine', 'X-Men Origins: Wolverine', 2009, 'Filme', 'OPCIONAL'), row('first-class', 'X-Men: Primeira Classe', 'X-Men: First Class', 2011, 'Filme', 'ESSENCIAL'), row('wolverine-immortal', 'Wolverine: Imortal', 'The Wolverine', 2013, 'Filme', 'COMPLEMENTAR'), row('days-future-past', 'X-Men: Dias de um Futuro Esquecido', 'X-Men: Days of Future Past', 2014, 'Filme', 'ESSENCIAL'), row('deadpool', 'Deadpool', 'Deadpool', 2016, 'Filme', 'COMPLEMENTAR'), row('apocalypse', 'X-Men: Apocalipse', 'X-Men: Apocalypse', 2016, 'Filme', 'COMPLEMENTAR'), row('logan', 'Logan', 'Logan', 2017, 'Filme', 'ESSENCIAL'), row('deadpool-2', 'Deadpool 2', 'Deadpool 2', 2018, 'Filme', 'COMPLEMENTAR'), row('dark-phoenix', 'X-Men: Fênix Negra', 'Dark Phoenix', 2019, 'Filme', 'OPCIONAL'), row('new-mutants', 'Os Novos Mutantes', 'The New Mutants', 2020, 'Filme', 'OPCIONAL')
  ], 'O essencial aqui é reconhecer rostos, relações e versões de mutantes que podem atravessar realidades.', 'O arquivo mutante complementa as escolhas de elenco anunciadas oficialmente.'),
  track('t7', '07', 'OUTROS HOMENS-ARANHA E QUARTETO FANTÁSTICO', '2002 — 2015', 'As versões anteriores de Peter Parker e da Primeira Família.', [
    row('raimi-spider', 'Homem-Aranha', 'Spider-Man', 2002, 'Filme', 'COMPLEMENTAR'), row('raimi-spider-2', 'Homem-Aranha 2', 'Spider-Man 2', 2004, 'Filme', 'COMPLEMENTAR'), row('raimi-spider-3', 'Homem-Aranha 3', 'Spider-Man 3', 2007, 'Filme', 'OPCIONAL'), row('amazing-spider', 'O Espetacular Homem-Aranha', 'The Amazing Spider-Man', 2012, 'Filme', 'COMPLEMENTAR'), row('amazing-spider-2', 'O Espetacular Homem-Aranha 2', 'The Amazing Spider-Man 2', 2014, 'Filme', 'COMPLEMENTAR'), row('fantastic-four-2005', 'Quarteto Fantástico', 'Fantastic Four', 2005, 'Filme', 'COMPLEMENTAR'), row('fantastic-four-rise', 'Quarteto Fantástico e o Surfista Prateado', 'Fantastic Four: Rise of the Silver Surfer', 2007, 'Filme', 'COMPLEMENTAR'), row('fantastic-four-2015', 'Quarteto Fantástico', 'Fantastic Four', 2015, 'Filme', 'OPCIONAL')
  ], 'Variantes do Homem-Aranha e do Quarteto ajudam a ler o peso emocional de encontros entre versões.', 'As conexões de variantes ganham sentido quando você reconhece os rostos anteriores.'),
  track('t8', '08', 'SÉRIES COMPLEMENTARES', '2021 — 2026', 'As séries que explicam as regras do tempo, o legado e a expansão da TV para o MCU.', [
    row('wandavision', 'WandaVision', 'WandaVision', 2021, 'Série', 'ESSENCIAL'), row('falcon-winter', 'Falcão e o Soldado Invernal', 'The Falcon and the Winter Soldier', 2021, 'Série', 'COMPLEMENTAR'), row('loki-1', 'Loki — Temporada 1', 'Loki — Season 1', 2021, 'Série', 'ESSENCIAL'), row('hawkeye', 'Gavião Arqueiro', 'Hawkeye', 2021, 'Série', 'COMPLEMENTAR'), row('moon-knight', 'Cavaleiro da Lua', 'Moon Knight', 2022, 'Série', 'OPCIONAL'), row('ms-marvel', 'Ms. Marvel', 'Ms. Marvel', 2022, 'Série', 'COMPLEMENTAR'), row('loki-2', 'Loki — Temporada 2', 'Loki — Season 2', 2023, 'Série', 'ESSENCIAL'), row('secret-invasion', 'Invasão Secreta', 'Secret Invasion', 2023, 'Série', 'COMPLEMENTAR'), row('echo', 'Eco', 'Echo', 2024, 'Série', 'COMPLEMENTAR'), row('agatha', 'Agatha Desde Sempre', 'Agatha All Along', 2024, 'Série', 'COMPLEMENTAR'), row('daredevil-1', 'Demolidor: Renascido — Temporada 1', 'Daredevil: Born Again — Season 1', 2025, 'Série', 'COMPLEMENTAR'), row('ironheart', 'Coração de Ferro', 'Ironheart', 2025, 'Série', 'COMPLEMENTAR'), row('what-if-1-3', 'What If…? — Temporadas 1 a 3', 'What If…? — Seasons 1–3', 2021, 'Série', 'COMPLEMENTAR'), row('wonder-man', 'Wonder Man', 'Wonder Man — Season 1', 2026, 'Série', 'COMPLEMENTAR'), row('daredevil-2', 'Demolidor: Renascido — Temporada 2', 'Daredevil: Born Again — Season 2', 2026, 'Série', 'COMPLEMENTAR'), row('visionquest', 'VisionQuest', 'VisionQuest — Season 1', 2026, 'Série', 'COMPLEMENTAR')
  ], 'Loki estabelece as regras de variantes e linhas do tempo; WandaVision e VisionQuest ampliam o legado de Wanda e Vision.', 'Com o catálogo concluído, o foco passa a ser a experiência de Doomsday nos cinemas.')
];

const allItems = tracks.flatMap(t => t.items.map(item => ({ ...item, trackId: t.id, trackName: t.name, trackNumber: t.number })));
const itemById = Object.fromEntries(allItems.map(item => [item.id, item]));

const officialLinks = {
  doomsday: 'https://www.marvel.com/articles/movies/avengers-doomsday-teaser-trailer',
  'avengers-encore': 'https://www.marvel.com/articles/movies/avengers-doomsday-what-to-watch-guide-movies-shows-disney-plus',
  'wonder-man': 'https://www.marvel.com/tv-shows/wonder-man/1',
  'daredevil-2': 'https://www.marvel.com/tv-shows/daredevil-born-again/2',
  timeline: 'https://www.marvel.com/articles/movies/mcu-timeline-order-disney-plus'
};
const officialChannel = 'https://www.youtube.com/channel/UCvC4D8onUfXzvjTOM-dBfEA';
const videoLinks = {
  doomsday: [
    { label: 'Trailer oficial de Avengers: Doomsday', url: 'https://www.youtube.com/watch?v=irVNGjRFZGk', why: 'Primeiro contato visual com o conflito e os personagens anunciados.' },
    { label: 'Special Look oficial', url: 'https://www.youtube.com/watch?v=X1aFkAkFASk', why: 'Complementa o trailer com novas imagens sem recorrer a canais não verificados.' }
  ]
};

const summaries = {
  'iron-man': {
    context: 'Tony Stark é um fabricante de armas brilhante, rico e isolado que trata tecnologia como extensão do próprio ego.',
    characters: 'Tony Stark, Pepper Potts, James Rhodes, Obadiah Stane e Yinsen.',
    conflict: 'Depois de ser capturado por uma célula terrorista e ferido por uma arma produzida pela própria empresa, Tony precisa sobreviver sem continuar alimentando o ciclo de destruição.',
    happens: 'Com um reator improvisado no peito, ele constrói uma armadura para escapar. De volta aos Estados Unidos, encerra a divisão de armas da Stark Industries, aperfeiçoa a armadura e enfrenta Stane, que tenta tomar a tecnologia para si.',
    ending: 'Tony derrota Stane e decide abandonar a fachada de empresário distante. Em vez de negar sua identidade, encerra com a frase pública: “Eu sou o Homem de Ferro”.',
    consequences: 'O reator e a armadura tornam Tony uma peça central da futura iniciativa Vingadores. A cena pós-créditos apresenta Nick Fury e a ideia de um universo maior.',
    introduced: 'Tony Stark como herói tecnológico, Pepper como parceira estratégica e o vínculo entre a Stark Industries e a segurança mundial.',
    connections: 'O reator, a S.H.I.E.L.D. e a iniciativa Vingadores voltam em quase todas as trilhas seguintes.'
  },
  'captain-america-first': {
    context: 'Durante a Segunda Guerra Mundial, Steve Rogers quer servir, mas é fisicamente frágil e rejeitado pelo exército.',
    characters: 'Steve Rogers, Peggy Carter, Bucky Barnes, Howard Stark, Red Skull e a organização HYDRA.',
    conflict: 'O soro do supersoldado cria um símbolo americano, enquanto Red Skull usa o Tesseract para transformar a guerra em um projeto de poder.',
    happens: 'Steve recebe o soro, torna-se o Capitão América e atravessa a guerra como propaganda e como combatente. Ele perde Bucky durante uma missão, enfrenta Red Skull e recupera o Tesseract, que desaparece no oceano com o avião de Steve.',
    ending: 'Steve acorda décadas depois em uma sala da S.H.I.E.L.D. e descobre que o tempo passou sem ele. Nick Fury oferece o contexto do mundo moderno.',
    consequences: 'O Tesseract entra na história das Joias do Infinito; Bucky e HYDRA continuam vivos como fantasmas políticos e pessoais.',
    introduced: 'A lógica dos supersoldados, Peggy Carter, Bucky Barnes, HYDRA e o Tesseract como objeto cósmico.',
    connections: 'A identidade de Bucky é indispensável para O Soldado Invernal e Guerra Civil.'
  },
  avengers: {
    context: 'O Tesseract abre uma passagem para uma invasão e Nick Fury força heróis incompatíveis a trabalharem juntos.',
    characters: 'Tony Stark, Steve Rogers, Thor, Bruce Banner, Natasha Romanoff, Clint Barton, Loki e Nick Fury.',
    conflict: 'Loki conduz o exército Chitauri para conquistar a Terra e usa a desconfiança entre os heróis contra eles.',
    happens: 'Após uma reunião tensa, a equipe se forma em Nova York. Bruce controla o Hulk em vez de fugir dele, Thor abandona a disputa individual com Loki e os Vingadores fecham o portal depois que Tony leva o míssil nuclear para o espaço.',
    ending: 'Loki é capturado e o grupo vira uma força pública. A cena pós-créditos mostra Thanos, revelando que a invasão era só uma etapa.',
    consequences: 'Nasce a identidade coletiva dos Vingadores, o Tesseract é levado para Asgard e Thanos passa a ser o horizonte da saga.',
    introduced: 'A equipe dos Vingadores como unidade e a ameaça Chitauri.',
    connections: 'A batalha de Nova York motiva Homem de Ferro 3, Homem-Aranha: De Volta ao Lar e vários conflitos políticos.'
  },
  'winter-soldier': {
    context: 'Steve Rogers tenta viver no presente trabalhando para a S.H.I.E.L.D., mas não confia totalmente no mundo que herdou.',
    characters: 'Steve Rogers, Natasha Romanoff, Sam Wilson, Nick Fury, Alexander Pierce e Bucky Barnes.',
    conflict: 'A própria S.H.I.E.L.D. foi infiltrada pela HYDRA, que pretende usar os Helicarriers para eliminar ameaças antes que elas existam.',
    happens: 'Steve e Natasha descobrem a infiltração, fogem com Sam e expõem os arquivos da organização. O assassino chamado Soldado Invernal é revelado como Bucky, mantido vivo e controlado pela HYDRA.',
    ending: 'Os Helicarriers são destruídos e a S.H.I.E.L.D. colapsa. Steve decide procurar Bucky, que recupera uma memória dele em meio ao caos.',
    consequences: 'A confiança em instituições cai, a equipe se fragmenta e Bucky deixa de ser apenas uma arma para se tornar uma pessoa a ser resgatada.',
    introduced: 'Sam Wilson como Falcão e a trama contemporânea da infiltração da HYDRA.',
    connections: 'A queda da S.H.I.E.L.D. prepara Guerra Civil e a nova função de Sam.'
  },
  'civil-war': {
    context: 'Depois de várias catástrofes, governos querem registrar e limitar a atuação dos heróis.',
    characters: 'Steve Rogers, Tony Stark, Bucky Barnes, Sam Wilson, Natasha, Wanda Maximoff, T’Challa e Peter Parker.',
    conflict: 'Os Acordos de Sokovia dividem os Vingadores; ao mesmo tempo, Bucky é acusado de um atentado que ele não cometeu.',
    happens: 'Tony apoia a supervisão estatal e Steve protege Bucky. Zemo manipula os dois lados e revela que Bucky foi usado para matar Howard e Maria Stark.',
    ending: 'A equipe se desfaz numa luta no complexo da Sibéria. Steve abandona o escudo e depois envia uma saída para Tony, mas a confiança entre eles não é restaurada.',
    consequences: 'Wakanda entra na disputa, Peter Parker é recrutado por Tony e os Vingadores chegam divididos à Guerra Infinita.',
    introduced: 'T’Challa/Pantera Negra, Peter Parker/Homem-Aranha do MCU e Zemo como estrategista.',
    connections: 'Sem essa fratura, o início de Guerra Infinita e o percurso de Bucky não fazem sentido.'
  },
  'infinity-war': {
    context: 'Thanos procura as seis Joias do Infinito para impor sua ideia de equilíbrio ao universo.',
    characters: 'Thanos, os Vingadores, Guardiões da Galáxia, Doutor Estranho, Wanda e Visão.',
    conflict: 'Os heróis precisam proteger Visão e a Joia da Mente enquanto Thanos reúne as outras cinco.',
    happens: 'Thanos toma a Joia do Espaço, derrota Thor, ganha a Joia da Realidade e sacrifica Gamora pela Joia da Alma. Em Wakanda, Wanda destrói a Joia da Mente, mas Thanos usa a Joia do Tempo para desfazer o sacrifício.',
    ending: 'Thanos estala os dedos. Metade da vida desaparece, incluindo Peter Parker, T’Challa, Sam, Bucky e quase todos os Guardiões. Nick Fury chama Carol Danvers antes de desaparecer.',
    consequences: 'O Blip vira o evento central do universo. Thanos vence e os sobreviventes entram em luto e desorganização.',
    introduced: 'A extensão completa das Joias do Infinito e o papel de Thanos como antagonista da saga.',
    connections: 'Ultimato parte diretamente desse final; Capitã Marvel explica o chamado de Fury.'
  },
  endgame: {
    context: 'Cinco anos depois do estalo, os sobreviventes tentam viver com a perda e a Terra está sem sua antiga equipe.',
    characters: 'Tony, Steve, Natasha, Thor, Bruce Banner, Clint Barton, Scott Lang, Nebula e Thanos.',
    conflict: 'Uma hipótese de viagem no tempo oferece uma chance de reverter o Blip, mas o custo pode ser definitivo.',
    happens: 'Os heróis viajam por momentos-chave, recuperam as Joias e trazem os desaparecidos de volta. Thanos de 2014 invade o presente, Natasha se sacrifica pela Joia da Alma e Tony usa as Joias para eliminar o exército inimigo.',
    ending: 'Tony morre salvando o universo. Steve devolve as Joias, escolhe viver sua vida com Peggy e passa o escudo para Sam Wilson.',
    consequences: 'O legado de Tony e Steve reorganiza os heróis. O multiverso e as ramificações temporais ganham espaço para as fases seguintes.',
    introduced: 'A ideia prática de viagem no tempo do MCU e o novo Capitão América, Sam Wilson.',
    connections: 'Doomsday nasce depois dessas perdas e de um universo com novas lideranças.'
  },
  'loki-1': {
    context: 'Uma variante de Loki escapa durante o assalto temporal de Ultimato e é capturada por uma organização fora do tempo.',
    characters: 'Loki, Sylvie, Mobius, Ravonna Renslayer e a AVT.',
    conflict: 'Loki descobre que a AVT poda linhas do tempo para manter uma única Linha do Tempo Sagrada.',
    happens: 'Ao lado de Sylvie, ele investiga a AVT, descobre que os agentes são variantes e chega à cidadela no fim do tempo. Lá encontra Aquele Que Permanece, uma variante de Kang que criou o sistema para impedir uma guerra multiversal.',
    ending: 'Sylvie mata Aquele Que Permanece e empurra Loki para uma realidade em que ninguém o reconhece. O multiverso começa a se ramificar.',
    consequences: 'Variantes, AVT, ramificações e guerras entre universos passam a ser conceitos práticos, não apenas teóricos.',
    introduced: 'Sylvie, Mobius e o funcionamento da AVT.',
    connections: 'A temporada é a melhor chave para entender multiverso, incursões e por que Doomsday pode reunir versões diferentes.'
  },
  'no-way-home': {
    context: 'Depois de ser exposto como Peter Parker, o Homem-Aranha pede ajuda a Doutor Estranho para apagar o segredo.',
    characters: 'Peter Parker, Doutor Estranho, MJ, Ned, Norman Osborn, Otto Octavius, Tobey Maguire e Andrew Garfield.',
    conflict: 'O feitiço dá errado e abre o universo para pessoas que conhecem a identidade do Homem-Aranha em outras realidades.',
    happens: 'Peter tenta curar os vilões em vez de devolvê-los para morrer. Outros dois Homens-Aranha aparecem e ajudam a lembrar por que responsabilidade importa. O Duende Verde mata Tia May.',
    ending: 'Peter pede um novo feitiço que faça todos esquecerem quem ele é, inclusive MJ e Ned. O mundo se fecha, mas Peter fica sozinho e continua como Homem-Aranha.',
    consequences: 'A existência de variantes é comprovada no cinema e Peter perde sua rede de apoio.',
    introduced: 'O encontro entre três Homens-Aranha e uma gramática emocional para o multiverso.',
    connections: 'O filme prepara a ideia de realidades colidindo e conversa diretamente com Doutor Estranho 2.'
  },
  'multiverse-madness': {
    context: 'America Chavez atravessa universos sem controlar o próprio poder e vira alvo de uma ameaça que conhece magia proibida.',
    characters: 'Doutor Estranho, America Chavez, Wanda Maximoff, Wong e versões alternativas de heróis.',
    conflict: 'Wanda usa o Darkhold para tentar chegar a uma realidade onde seus filhos existem.',
    happens: 'Strange e America viajam por realidades e descobrem que o poder de America pode abrir portais conscientemente. Wanda invade a Terra-838, enfrenta os Illuminati e percebe que está se tornando o monstro que teme.',
    ending: 'Wanda destrói todas as cópias do Darkhold e desaparece sob o templo. America começa a treinar em Kamar-Taj.',
    consequences: 'Incursões e universos alternativos entram no vocabulário do MCU; a relação entre magia, variantes e escolhas fica mais perigosa.',
    introduced: 'America Chavez e os Illuminati da Terra-838.',
    connections: 'A ameaça de incursões é uma ponte importante para uma narrativa de colisão.'
  },
  'deadpool-wolverine': {
    context: 'Wade Wilson tenta levar uma vida comum até ser recrutado por um agente da AVT para uma missão que envolve a sobrevivência de um universo.',
    characters: 'Deadpool, Wolverine, Cassandra Nova, Paradox e a AVT.',
    conflict: 'A realidade de Wade está condenada e ele precisa encontrar uma forma de salvar seu mundo sem sacrificar outra linha do tempo.',
    happens: 'Wade atravessa o Vazio, encontra uma variante de Wolverine e reúne versões de personagens da era Fox. A dupla enfrenta Cassandra Nova e a operação da AVT.',
    ending: 'Wade e Wolverine impedem a destruição do universo de Wade. A história preserva as memórias de versões anteriores e coloca o legado Fox dentro do mapa do MCU.',
    consequences: 'O filme legitima personagens e universos legados como parte da conversa do MCU contemporâneo.',
    introduced: 'O Vazio, Cassandra Nova e a integração explícita de Deadpool e Wolverine ao multiverso.',
    connections: 'A trilha dos X-Men deixa de ser apenas contexto e passa a conversar diretamente com Doomsday.'
  },
  'fantastic-four': {
    context: 'Em um mundo retrofuturista inspirado nos anos 1960, uma família de exploradores tornou-se a Primeira Família da Marvel.',
    characters: 'Reed Richards, Sue Storm, Johnny Storm, Ben Grimm, Galactus e o Surfista Prateado.',
    conflict: 'Os heróis equilibram família e responsabilidade quando Galactus ameaça consumir a Terra.',
    happens: 'O Quarteto enfrenta uma ameaça cósmica e precisa agir como unidade, enquanto a história apresenta sua realidade própria e sua relação com o espaço.',
    ending: 'A equipe protege seu mundo e consolida uma nova versão de Reed, Sue, Johnny e Ben para o futuro do MCU.',
    consequences: 'O Quarteto Fantástico chega ao centro do projeto multiversal e Victor von Doom ganha uma conexão temática direta com essa família.',
    introduced: 'A versão MCU do Quarteto e o vínculo com Galactus e o Surfista Prateado.',
    connections: 'É uma das bases oficiais para a presença do Quarteto em Avengers: Doomsday.'
  },
  doomsday: {
    context: 'Ainda não lançado em 20/11/2026; o briefing de preparação deve separar o que a Marvel confirmou do que permanece especulação.',
    characters: 'A Marvel confirmou a presença de Victor von Doom, vivido por Robert Downey Jr., e anunciou conexões com Thor, Steve Rogers, X-Men, Wakanda e Quarteto Fantástico.',
    conflict: 'A trama completa não foi publicada oficialmente. A premissa pública envolve heróis de diferentes mundos diante de uma ameaça de escala catastrófica.',
    happens: 'Não há resumo de enredo disponível sem inventar informação. A aplicação mantém este card como dossiê pré-estreia, com links para os materiais oficiais.',
    ending: 'Ainda não aplicável: o filme chega aos cinemas em 18 de dezembro de 2026, segundo a Marvel.',
    consequences: 'As consequências só devem ser registradas depois de material oficial ou da experiência do filme.',
    introduced: 'Victor von Doom como papel de Robert Downey Jr. e o encontro anunciado entre núcleos do MCU e universos legados.',
    connections: 'Use as trilhas 3, 4, 5, 6 e 7 para chegar com contexto; trate rumores como rumores.'
  },
  'wonder-man': {
    context: 'Simon Williams tenta firmar carreira como ator enquanto o show observa a indústria do entretenimento por dentro.',
    characters: 'Simon Williams, Trevor Slattery e Von Kovak.',
    conflict: 'A busca por um papel capaz de mudar uma vida mistura ambição, imagem pública e a presença de personagens já conhecidos do MCU.',
    happens: 'A série acompanha a produção de um filme dentro do próprio universo Marvel e usa Simon e Trevor para discutir fama, representação e oportunidade.',
    ending: 'O card recomenda assistir a série completa quando a pessoa quiser ampliar a camada televisiva; a página oficial informa lançamento em 27 de janeiro de 2026.',
    consequences: 'Expande o catálogo de personagens ligados à indústria e ao legado de Trevor Slattery.',
    introduced: 'Simon Williams/Wonder Man e Von Kovak.',
    connections: 'É complementar para Doomsday, mas oficial e já lançado conforme a ficha da Marvel.'
  }
};

const concepts = [
  ['Joias do Infinito', 'Seis artefatos que controlam aspectos fundamentais do universo: espaço, mente, realidade, poder, tempo e alma.', ['Os Vingadores', 'Guerra Infinita', 'Ultimato']],
  ['Thanos', 'Titã que acredita que o universo precisa ser “equilibrado” pela eliminação de metade da vida. A crença não torna suas ações menos genocidas.', ['Os Vingadores', 'Guerra Infinita', 'Ultimato']],
  ['Reino Quântico', 'Dimensão acessada por partículas e fenômenos fora das regras comuns de espaço e tempo. É uma peça central para viagens e sobrevivência.', ['Homem-Formiga e a Vespa', 'Quantumania', 'Ultimato']],
  ['Multiverso', 'Conjunto de realidades que podem conter versões diferentes dos mesmos personagens, histórias e escolhas.', ['Loki', 'Sem Volta para Casa', 'Doutor Estranho 2']],
  ['Variantes', 'Pessoas ou entidades que ocupam papéis parecidos em linhas do tempo ou universos diferentes.', ['Loki', 'Deadpool & Wolverine', 'Sem Volta para Casa']],
  ['AVT', 'A Autoridade de Variância Temporal monitora linhas do tempo e foi construída para conter guerras entre variantes.', ['Loki T1', 'Loki T2', 'Deadpool & Wolverine']],
  ['Incursões', 'Colisões em que a existência de uma realidade ameaça outra. O conceito transforma o multiverso em risco físico.', ['Doutor Estranho 2', 'Loki', 'Doomsday']],
  ['Mutantes', 'Pessoas que nascem com uma alteração genética que pode despertar habilidades. A história dos X-Men também é uma história de medo e pertencimento.', ['X-Men', 'Primeira Classe', 'Deadpool & Wolverine']],
  ['X-Men', 'Equipe de mutantes que tenta proteger humanos e mutantes em meio à intolerância e à disputa por poder.', ['X-Men 2', 'Dias de um Futuro Esquecido', 'Logan']],
  ['HYDRA', 'Organização autoritária que se infiltra em instituições e transforma ciência, política e espionagem em armas.', ['O Primeiro Vingador', 'O Soldado Invernal', 'Guerra Civil']],
  ['S.H.I.E.L.D.', 'Agência de inteligência e resposta global que coordenou operações e ajudou a reunir os primeiros Vingadores.', ['Homem de Ferro', 'Os Vingadores', 'O Soldado Invernal']],
  ['Victor von Doom', 'Cientista e governante associado ao Quarteto Fantástico nos quadrinhos. Para Doomsday, a Marvel confirmou Robert Downey Jr. no papel de Doctor Doom.', ['Quarteto Fantástico: Primeiros Passos', 'Avengers: Doomsday']],
  ['Doutor Destino e o Quarteto', 'Doom é ligado ao Quarteto por rivalidade científica, política e pessoal. Essa relação torna a Primeira Família um contexto prioritário para Doomsday.', ['Quarteto Fantástico', 'Quarteto Fantástico: Primeiros Passos', 'Doomsday']]
];

let state = loadState();
let ui = { route: routeFromHash(), search: '', status: 'all', importance: 'all', sort: 'release', track: 'all', selectedTrack: 't1', selectedId: null };

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { progress: saved.progress || {}, lastBackup: saved.lastBackup || null };
  } catch { return { progress: {}, lastBackup: null }; }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function routeFromHash() { const hash = location.hash.replace(/^#/, ''); return hash || '/'; }
function navigate(path) { location.hash = path; }
function getProgress(id) { return state.progress[id] || { status: 'pending', watchedAt: '', rating: 0, notes: '' }; }
function updateProgress(id, patch) { state.progress[id] = { ...getProgress(id), ...patch }; saveState(); }
function statusLabel(status) { return ({ watched: 'Assistido integralmente', skipped: 'Conhecido por resumo', partial: 'Assistido parcialmente', pending: 'Pendente' })[status] || 'Pendente'; }
function importanceClass(value) { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
function escapeHtml(value = '') { return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char])); }
function initials(title) { return title.split(/\s+/).filter(word => !['de','da','do','e','o','a','os','as','para','em'].includes(word.toLowerCase())).slice(0, 3).map(word => word[0]).join('').toUpperCase(); }
function formatDate(date) { if (!date) return 'Sem data'; const [y,m,d] = date.split('-'); return `${d}/${m}/${y}`; }
function allDone(trackId) { return tracks.find(t => t.id === trackId).items.every(item => getProgress(item.id).status !== 'pending'); }
function stats() { const values = allItems.map(item => getProgress(item.id).status); const watched = values.filter(s => s === 'watched').length; const skipped = values.filter(s => s === 'skipped').length; const partial = values.filter(s => s === 'partial').length; const pending = values.filter(s => s === 'pending').length; return { total: values.length, watched, skipped, partial, pending, complete: watched + skipped, percent: Math.round(((watched + skipped) / values.length) * 100) }; }
function trackStats(trackId) { const items = tracks.find(t => t.id === trackId).items; const values = items.map(item => getProgress(item.id).status); const watched = values.filter(s => s === 'watched').length; const skipped = values.filter(s => s === 'skipped').length; const pending = values.filter(s => s === 'pending').length; return { total: items.length, watched, skipped, pending, percent: Math.round(((watched + skipped) / items.length) * 100) }; }
function nextItem() { return allItems.find(item => getProgress(item.id).status === 'pending') || allItems[allItems.length - 1]; }
function sourceFor(item) { return officialLinks[item.id] || (item.type === 'Série' ? 'https://www.marvel.com/tv-shows' : 'https://www.marvel.com/movies'); }
function summaryFor(item) {
  if (summaries[item.id]) return summaries[item.id];
  return { context: `${item.title} ocupa a posição ${item.year} na trilha “${item.trackName}” e amplia o núcleo de personagens que a operação acompanha.`, characters: `Os personagens centrais de ${item.title} e suas relações com o restante do universo Marvel.`, conflict: `O conflito de ${item.title} adiciona uma nova frente ao MCU, aos universos legados ou às séries complementares.`, happens: `Assista ao título para acompanhar os eventos principais. Se preferir pular, use este dossiê como mapa de continuidade e consulte a fonte oficial antes de seguir.`, ending: `O encerramento reposiciona personagens e deixa referências para outros títulos da trilha.`, consequences: `A produção é classificada como ${item.importance.toLowerCase()} para a preparação e pode ser retomada pelo histórico quando necessário.`, introduced: `Personagens, locais e conceitos apresentados em ${item.title}.`, connections: `Conecta-se aos títulos da trilha “${item.trackName}” e ao guia de conexões.` };
}
function videosFor(item) { return videoLinks[item.id] || [{ label: 'Canal oficial da Marvel', url: officialChannel, why: 'Use a busca oficial para encontrar trailers e materiais do título sem depender de fontes não verificadas.' }]; }
function daysUntilDoomsday() { const release = new Date('2026-12-18T00:00:00'); const diff = Math.ceil((release - new Date()) / 86400000); return diff > 0 ? diff : 0; }

function shell(content) {
  const path = ui.route;
  const nav = [['/', '◈', 'Dashboard'], ['/maratona', '◫', 'Minha maratona'], ['/trilhas', '⌁', 'Trilhas'], ['/wrapped', '✦', 'Marvel Wrapped'], ['/guia', '◎', 'Guia de conexões'], ['/historico', '◷', 'Meu histórico']];
  return `<div class="app-shell"><header class="topbar"><a class="brand" href="#/"><span class="brand-mark" aria-hidden="true"></span><span><span class="brand-name">OPERAÇÃO DOOMSDAY</span><span class="brand-sub">MARVEL PREP / 2026</span></span></a><div class="top-actions"><span class="mission-status"><span class="pulse"></span> SISTEMA OPERACIONAL</span><button class="ghost-button" data-action="import">Importar</button><button class="ghost-button" data-action="export">Exportar backup</button></div></header><div class="layout"><aside class="sidebar"><div class="nav-label">Central de comando</div><nav class="nav" aria-label="Navegação principal">${nav.map(([href, icon, label]) => `<button class="nav-link ${path === href ? 'active' : ''}" data-action="navigate" data-path="${href}"><span class="nav-icon">${icon}</span>${label}</button>`).join('')}</nav><div class="sidebar-note"><strong>NOTA DA OPERAÇÃO</strong>O progresso fica salvo neste navegador. Exporte um backup antes de trocar de aparelho.</div></aside><main class="main"><div class="content">${content}</div></main></div><div id="overlay"></div><div id="toast-region" aria-live="polite"></div></div>`;
}
function statCard(value, label, accent = false) { return `<div class="stat ${accent ? 'accent' : ''}"><div class="mono">STATUS</div><div class="value">${value}</div><div class="label">${label}</div></div>`; }
function progressBar(percent) { return `<div class="progress-row"><div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div><span class="progress-label">${percent}%</span></div>`; }
function trackCard(t) { const s = trackStats(t.id); return `<article class="track-card"><div class="track-top"><div><div class="track-kicker">TRILHA ${t.number} / ${t.period}</div><h3>${t.name}</h3></div><span class="badge ${s.percent === 100 ? 'essential' : ''}">${s.percent === 100 ? 'CONCLUÍDA' : `${s.pending} pendentes`}</span></div><p>${t.description}</p>${progressBar(s.percent)}<div class="card-meta">${s.watched} assistidas · ${s.skipped} por resumo · ${s.total} títulos</div><button class="small-button" data-action="open-track" data-track="${t.id}">Abrir trilha →</button></article>`; }
function titleCard(item) { const p = getProgress(item.id); return `<article class="title-card"><div class="poster"><span class="initials">${initials(item.title)}</span><span class="poster-meta">${item.year}<br>${item.type.toUpperCase()}</span></div><div class="card-main"><div><span class="status-dot ${p.status}"></span><span class="badge ${importanceClass(item.importance)}">${item.importance}</span><h3>${item.title}</h3><div class="original-title">${item.original}</div></div><div class="card-meta">${statusLabel(p.status)}${p.watchedAt ? ` · ${formatDate(p.watchedAt)}` : ''}</div><div class="card-actions"><button class="small-button" data-action="open-detail" data-id="${item.id}">Abrir dossiê</button><button class="small-button ${p.status === 'watched' ? 'selected' : ''}" data-action="quick-status" data-id="${item.id}" data-status="watched" aria-label="Marcar ${escapeHtml(item.title)} como assistido">✓</button><button class="small-button ${p.status === 'skipped' ? 'selected' : ''}" data-action="quick-status" data-id="${item.id}" data-status="skipped" aria-label="Marcar ${escapeHtml(item.title)} como conhecido por resumo">R</button></div></div></article>`; }

function dashboard() {
  const s = stats(); const next = nextItem(); const days = daysUntilDoomsday();
  return `<section class="hero"><div class="hero-copy"><div class="eyebrow">Operação ativa / dossiê pessoal</div><h1>Chegue ao fim da maratona sabendo exatamente o que lembrar.</h1><p class="lede">Uma central de comando para assistir, pular com contexto e conectar as histórias que levam a <em>Avengers: Doomsday</em>.</p><div class="hero-cta"><button class="primary-button" data-action="navigate" data-path="/maratona">Continuar maratona</button><button class="ghost-button" data-action="open-detail" data-id="${next.id}">Próximo dossiê: ${next.title}</button></div></div><div class="hero-countdown"><div><div class="eyebrow">Contagem da missão</div><div class="countdown-number">${days || '—'}</div><div class="countdown-label">dias até Avengers: Doomsday</div></div><div class="countdown-foot">Estreia oficial indicada pela Marvel: <strong>18 de dezembro de 2026</strong>.<br>Fonte e materiais oficiais estão nos dossiês.</div></div></section><div class="stats-grid">${statCard(s.total, 'produções no radar')}${statCard(s.watched, 'assistidas integralmente')}${statCard(s.skipped, 'conhecidas por resumo')}${statCard(s.pending, 'pendentes')}${statCard(`${s.percent}%`, 'conclusão da missão', true)}</div><div class="section-head"><div><div class="eyebrow">Rota de preparação</div><h2>Progresso por trilha</h2></div><p>Concluir = assistir ou marcar que conhece pelo resumo.</p></div><div class="track-grid">${tracks.map(trackCard).join('')}</div><div class="section-head"><div><div class="eyebrow">Próximo ponto de controle</div><h2>O título recomendado</h2></div></div><div class="callout"><div class="callout-copy"><div class="callout-icon">→</div><div><h3>${next.title}</h3><p>${next.trackName} · ${next.year} · ${next.importance.toLowerCase()} · ${next.type}</p></div></div><button class="primary-button" data-action="open-detail" data-id="${next.id}">Abrir dossiê</button></div>`;
}
function marathon() {
  let items = allItems.filter(item => (!ui.search || `${item.title} ${item.original}`.toLowerCase().includes(ui.search.toLowerCase())) && (ui.status === 'all' || getProgress(item.id).status === ui.status) && (ui.importance === 'all' || item.importance === ui.importance) && (ui.track === 'all' || item.trackId === ui.track));
  if (ui.sort === 'release') items.sort((a,b) => a.year - b.year || a.trackNumber.localeCompare(b.trackNumber));
  if (ui.sort === 'title') items.sort((a,b) => a.title.localeCompare(b.title, 'pt-BR'));
  if (ui.sort === 'pending') items = items.filter(item => getProgress(item.id).status === 'pending');
  return `<div class="eyebrow">Catálogo operacional</div><h1>Minha maratona</h1><p class="lede">Filtre por prioridade, encontre um título e registre sua própria rota. Cada card abre um resumo completo para quando assistir não for a melhor opção.</p><div class="toolbar"><div class="search-wrap"><span class="search-icon">⌕</span><input class="field" data-filter="search" value="${escapeHtml(ui.search)}" placeholder="Pesquisar por nome..." aria-label="Pesquisar por nome"></div><select data-filter="track" aria-label="Filtrar por trilha"><option value="all" ${ui.track === 'all' ? 'selected' : ''}>Todas as trilhas</option>${tracks.map(t => `<option value="${t.id}" ${ui.track === t.id ? 'selected' : ''}>Trilha ${t.number} — ${t.name}</option>`).join('')}</select><select data-filter="status" aria-label="Filtrar por status"><option value="all" ${ui.status === 'all' ? 'selected' : ''}>Todos os status</option><option value="pending" ${ui.status === 'pending' ? 'selected' : ''}>Pendentes</option><option value="watched" ${ui.status === 'watched' ? 'selected' : ''}>Assistidos</option><option value="skipped" ${ui.status === 'skipped' ? 'selected' : ''}>Por resumo</option><option value="partial" ${ui.status === 'partial' ? 'selected' : ''}>Parciais</option></select><select data-filter="importance" aria-label="Filtrar por importância"><option value="all" ${ui.importance === 'all' ? 'selected' : ''}>Toda importância</option><option value="ESSENCIAL" ${ui.importance === 'ESSENCIAL' ? 'selected' : ''}>Essenciais</option><option value="COMPLEMENTAR" ${ui.importance === 'COMPLEMENTAR' ? 'selected' : ''}>Complementares</option><option value="OPCIONAL" ${ui.importance === 'OPCIONAL' ? 'selected' : ''}>Opcionais</option></select><select data-filter="sort" aria-label="Ordenar resultados"><option value="release" ${ui.sort === 'release' ? 'selected' : ''}>Ordem de lançamento</option><option value="title" ${ui.sort === 'title' ? 'selected' : ''}>Ordem alfabética</option><option value="pending" ${ui.sort === 'pending' ? 'selected' : ''}>Somente pendentes</option></select></div><div class="filter-summary"><span>${items.length} resultado${items.length === 1 ? '' : 's'} no catálogo curado</span><div class="filter-pills"><span class="filter-pill">✓ assistido</span><span class="filter-pill">R por resumo</span><span class="filter-pill">○ pendente</span></div></div>${items.length ? `<div class="title-grid">${items.map(titleCard).join('')}</div>` : '<div class="empty">Nenhum dossiê encontrado com esses filtros.</div>'}`;
}
function tracksPage() { return `<div class="eyebrow">Mapa da operação</div><h1>Trilhas</h1><p class="lede">O percurso foi dividido por função narrativa. Você pode seguir em ordem de lançamento ou avançar pelo que for essencial.</p><div class="timeline">${tracks.map(t => { const s = trackStats(t.id); return `<div class="timeline-item"><div class="timeline-year">${t.period}</div><div class="timeline-line"></div><div class="timeline-content"><div class="track-top"><div><div class="track-kicker">TRILHA ${t.number}</div><h3>${t.name}</h3></div><button class="small-button" data-action="open-track" data-track="${t.id}">Ver títulos</button></div><p>${t.description}</p>${progressBar(s.percent)}</div></div>`; }).join('')}</div>`; }
function wrappedPage() { const t = tracks.find(item => item.id === ui.selectedTrack) || tracks[0]; const s = trackStats(t.id); const ratings = t.items.map(item => getProgress(item.id).rating).filter(Boolean); const avg = ratings.length ? (ratings.reduce((a,b) => a + b, 0) / ratings.length).toFixed(1) : '—'; return `<div class="eyebrow">Relatório de conclusão</div><h1>Marvel Wrapped</h1><p class="lede">Um retrato da sua missão em cada etapa. O relatório fica mais completo conforme você registra status, datas e estrelas.</p><div class="toolbar" style="margin-top:24px; grid-template-columns:minmax(0,1fr)"><select data-filter="wrappedTrack" aria-label="Selecionar trilha">${tracks.map(item => `<option value="${item.id}" ${item.id === t.id ? 'selected' : ''}>Trilha ${item.number} — ${item.name}</option>`).join('')}</select></div><div class="wrapped-hero" style="margin-top:16px"><div class="eyebrow">MARVEL WRAPPED / TRILHA ${t.number}</div><h2>${t.name}</h2><p class="lede">${s.percent === 100 ? 'Trilha concluída. O próximo capítulo já está liberado.' : `${s.percent}% da trilha registrada. Complete ou conheça por resumo todos os títulos para fechar o relatório.`}</p><div class="wrapped-stats">${[['Títulos', s.total], ['Assistidos', s.watched], ['Por resumo', s.skipped], ['Média', avg === '—' ? '—' : `${avg}/5`]].map(([label,value]) => `<div class="wrapped-stat"><strong>${value}</strong><span>${label}</span></div>`).join('')}</div></div><div class="wrapped-layout" style="margin-top:14px"><div class="wrapped-side"><h3>Agora você está atualizada para…</h3><p>${t.insight} ${s.percent === 100 ? 'Você pode seguir sem carregar pendências desta trilha.' : 'Ainda vale abrir os dossiês pendentes antes de avançar.'}</p><h3>Na próxima trilha você vai encontrar…</h3><p>${t.next}</p></div><div class="wrapped-side"><h3>Indicadores da operação</h3><p><strong>${s.watched}</strong> títulos assistidos integralmente.</p><p><strong>${s.skipped}</strong> títulos conhecidos pelo resumo.</p><p><strong>${s.pending}</strong> pendências no radar.</p><button class="primary-button" data-action="navigate" data-path="/maratona">Ver títulos da maratona</button></div></div>`; }
function guidePage() { const query = (ui.search || '').toLowerCase(); const filtered = concepts.filter(([title, text]) => !query || `${title} ${text}`.toLowerCase().includes(query)); return `<div class="eyebrow">Manual de campo</div><h1>Entenda o Universo Marvel</h1><p class="lede">Conceitos curtos para conectar as trilhas sem transformar a maratona em uma prova. Pesquise um termo e abra os títulos relacionados quando quiser aprofundar.</p><div class="search-wrap" style="max-width:540px; margin:24px 0 18px"><span class="search-icon">⌕</span><input class="field" data-filter="guide-search" value="${escapeHtml(ui.search)}" placeholder="Pesquisar conceito..." aria-label="Pesquisar conceito"></div><div class="guide-grid">${filtered.map(([title, text, related]) => `<article class="guide-card"><h3>${title}</h3><p>${text}</p><div class="related">APARECE EM<br><strong>${related.join(' · ')}</strong></div></article>`).join('')}</div>`; }
function historyPage() { const done = allItems.filter(item => getProgress(item.id).status !== 'pending').sort((a,b) => (getProgress(b.id).watchedAt || '').localeCompare(getProgress(a.id).watchedAt || '')); return `<div class="eyebrow">Registro pessoal</div><h1>Meu histórico</h1><p class="lede">Tudo o que você marcou como assistido, parcial ou conhecido pelo resumo, com data e avaliação.</p><div class="section-head"><div><h2>${done.length} registros</h2></div><button class="ghost-button" data-action="reset">Limpar progresso</button></div>${done.length ? `<div class="timeline">${done.map(item => { const p = getProgress(item.id); return `<div class="timeline-item"><div class="timeline-year">${p.watchedAt ? formatDate(p.watchedAt) : 'sem data'}</div><div class="timeline-line"></div><div class="timeline-content"><div class="track-kicker">${item.trackName}</div><h3>${item.title}</h3><p><span class="status-dot ${p.status}"></span>${statusLabel(p.status)}${p.rating ? ` · ${'★'.repeat(p.rating)}${'☆'.repeat(5-p.rating)}` : ''}${p.notes ? ` · “${escapeHtml(p.notes)}”` : ''}</p><button class="small-button" data-action="open-detail" data-id="${item.id}">Editar registro</button></div></div>`; }).join('')}</div>` : '<div class="empty">Ainda não há registros. Abra um dossiê na maratona para começar.</div>'}`; }
function currentPage() { if (ui.route === '/maratona') return marathon(); if (ui.route === '/trilhas') return tracksPage(); if (ui.route === '/wrapped') return wrappedPage(); if (ui.route === '/guia') return guidePage(); if (ui.route === '/historico') return historyPage(); return dashboard(); }

function detail(item) { const p = getProgress(item.id); const s = summaryFor(item); const videos = videosFor(item); return `<div class="drawer-backdrop" data-action="close-detail"><aside class="drawer" role="dialog" aria-modal="true" aria-label="Dossiê de ${escapeHtml(item.title)}"><div class="drawer-head"><div><div class="eyebrow">Dossiê ${item.trackNumber} / ${item.year}</div><h2>${item.title}</h2><div class="original-title">${item.original} · ${item.type} · <span class="badge ${importanceClass(item.importance)}">${item.importance}</span></div></div><button class="icon-button" data-action="close-detail" aria-label="Fechar dossiê">×</button></div><div class="drawer-section"><h3>Status da missão</h3><div class="status-actions">${[['watched','Assistido'],['skipped','Conhecido por resumo'],['partial','Parcial'],['pending','Pendente']].map(([value,label]) => `<button class="status-action ${p.status === value ? 'active' : ''}" data-action="status" data-id="${item.id}" data-status="${value}">${label}</button>`).join('')}</div><label class="mono" style="display:block; margin-top:16px; color:var(--muted)">DATA EM QUE ASSISTIU<input class="field" style="margin-top:7px" type="date" data-date-for="${item.id}" value="${p.watchedAt || ''}"></label></div><div class="drawer-section"><h3>Resumo para caso não queira assistir</h3><div class="summary-block"><p><strong>Contexto inicial.</strong> ${s.context}</p><p><strong>Personagens importantes.</strong> ${s.characters}</p><p><strong>Conflito principal.</strong> ${s.conflict}</p><p><strong>O que efetivamente acontece.</strong> ${s.happens}</p><p><strong>Como termina.</strong> ${s.ending}</p><p><strong>Consequências para o universo.</strong> ${s.consequences}</p><p><strong>Personagens e conceitos introduzidos.</strong> ${s.introduced}</p><p><strong>Conexões com outros títulos.</strong> ${s.connections}</p></div></div><div class="drawer-section"><h3>O que você precisa lembrar</h3><ul class="reminder-list"><li>${s.consequences}</li><li>${s.connections}</li><li>Classificação editorial da operação: <strong>${item.importance.toLowerCase()}</strong>.</li></ul></div><div class="drawer-section"><h3>Avaliação pessoal</h3><div class="star-row" aria-label="Avaliar de 1 a 5 estrelas">${[1,2,3,4,5].map(n => `<button class="star ${n <= p.rating ? 'active' : ''}" data-action="rating" data-id="${item.id}" data-rating="${n}" aria-label="${n} estrelas">★</button>`).join('')}</div><textarea data-notes-for="${item.id}" placeholder="Observações pessoais, conexões ou dúvidas...">${escapeHtml(p.notes || '')}</textarea><div class="detail-footer"><button class="primary-button" data-action="save-notes" data-id="${item.id}">Salvar observações</button></div></div><div class="drawer-section"><h3>Conteúdo visual complementar</h3>${videos.map(v => `<a class="video-link" href="${v.url}" target="_blank" rel="noreferrer"><span><strong>${v.label}</strong><br><span>${v.why}</span></span><span>↗</span></a>`).join('')}<a class="source-link" href="${sourceFor(item)}" target="_blank" rel="noreferrer">Abrir fonte oficial do título/curadoria ↗</a></div></aside></div>`; }

function showToast(message) { const region = document.getElementById('toast-region'); if (!region) return; region.innerHTML = `<div class="toast">${escapeHtml(message)}</div>`; setTimeout(() => { region.innerHTML = ''; }, 2600); }
function render() { document.getElementById('app').innerHTML = shell(currentPage()); const overlay = document.getElementById('overlay'); if (ui.selectedId && itemById[ui.selectedId]) overlay.innerHTML = detail(itemById[ui.selectedId]); }
function exportBackup() { const payload = { app: 'operacao-doomsday', version: 1, exportedAt: new Date().toISOString(), progress: state.progress }; const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `operacao-doomsday-backup-${TODAY}.json`; link.click(); URL.revokeObjectURL(url); showToast('Backup exportado.'); }
function importBackup(file) { const reader = new FileReader(); reader.onload = () => { try { const payload = JSON.parse(reader.result); if (!payload || payload.app !== 'operacao-doomsday' || typeof payload.progress !== 'object') throw new Error('invalid'); state.progress = payload.progress; saveState(); showToast('Backup importado.'); render(); } catch { showToast('Arquivo de backup inválido.'); } }; reader.readAsText(file); }

window.addEventListener('hashchange', () => { ui.route = routeFromHash(); ui.selectedId = null; render(); });
document.addEventListener('input', event => { const filter = event.target.dataset.filter; if (!filter) return; if (filter === 'search' || filter === 'guide-search') ui.search = event.target.value; render(); const target = document.querySelector(`[data-filter="${filter}"]`); if (target) { target.focus(); target.setSelectionRange(target.value.length, target.value.length); } });
document.addEventListener('change', event => { const filter = event.target.dataset.filter; if (filter === 'status' || filter === 'importance' || filter === 'sort' || filter === 'track') ui[filter] = event.target.value; if (filter === 'wrappedTrack') ui.selectedTrack = event.target.value; if (event.target.dataset.dateFor) { updateProgress(event.target.dataset.dateFor, { watchedAt: event.target.value }); showToast('Data atualizada.'); return; } render(); });
document.addEventListener('click', event => {
  const el = event.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  if (action === 'navigate') { navigate(el.dataset.path); return; }
  if (action === 'export') { exportBackup(); return; }
  if (action === 'import') { document.getElementById('backup-input')?.click(); return; }
  if (action === 'open-detail') { ui.selectedId = el.dataset.id; render(); return; }
  if (action === 'close-detail') { if (event.target.closest('.drawer')) return; ui.selectedId = null; render(); return; }
  if (action === 'open-track') { ui.search = ''; ui.status = 'all'; ui.importance = 'all'; ui.sort = 'release'; ui.track = el.dataset.track || 'all'; navigate('/maratona'); return; }
  if (action === 'quick-status' || action === 'status') { const current = getProgress(el.dataset.id); const status = el.dataset.status; updateProgress(el.dataset.id, { status, watchedAt: status === 'watched' ? (current.watchedAt || TODAY) : current.watchedAt }); showToast(status === 'watched' ? 'Marcado como assistido.' : status === 'skipped' ? 'Marcado como conhecido por resumo.' : 'Status atualizado.'); render(); return; }
  if (action === 'rating') { updateProgress(el.dataset.id, { rating: Number(el.dataset.rating) }); render(); return; }
  if (action === 'save-notes') { const textarea = document.querySelector(`[data-notes-for="${el.dataset.id}"]`); updateProgress(el.dataset.id, { notes: textarea?.value || '' }); showToast('Observações salvas.'); render(); return; }
  if (action === 'reset') { if (confirm('Limpar todo o progresso salvo neste navegador?')) { state.progress = {}; saveState(); showToast('Progresso limpo.'); render(); } return; }
});
document.getElementById('backup-input')?.addEventListener('change', event => { const file = event.target.files?.[0]; if (file) importBackup(file); event.target.value = ''; });

render();
