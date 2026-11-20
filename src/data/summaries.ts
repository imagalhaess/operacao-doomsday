import type { Summary, TrackItem, EnrichedItem } from './types';

export const summaries: Record<string, Summary> = {
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

export function summaryFor(item: TrackItem | EnrichedItem): Summary {
  if (summaries[item.id]) return summaries[item.id];
  const trackName = 'trackName' in item ? item.trackName : 'Geral';
  return {
    context: `${item.title} ocupa a posição ${item.year} na trilha “${trackName}” e amplia o núcleo de personagens que a operação acompanha.`,
    characters: `Os personagens centrais de ${item.title} e suas relações com o restante do universo Marvel.`,
    conflict: `O conflito de ${item.title} adiciona uma nova frente ao MCU, aos universos legados ou às séries complementares.`,
    happens: `Assista ao título para acompanhar os eventos principais. Se preferir pular, use este dossiê como mapa de continuidade e consulte a fonte oficial antes de seguir.`,
    ending: `O encerramento reposiciona personagens e deixa referências para outros títulos da trilha.`,
    consequences: `A produção é classificada como ${item.importance.toLowerCase()} para a preparação e pode ser retomada pelo histórico quando necessário.`,
    introduced: `Personagens, locais e conceitos apresentados em ${item.title}.`,
    connections: `Conecta-se aos títulos da trilha “${trackName}” e ao guia de conexões.`
  };
}

