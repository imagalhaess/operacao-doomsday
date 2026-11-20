# Plano — Operação Doomsday

## Direção do produto

Aplicação web mobile-first em português brasileiro para conduzir uma maratona Marvel até *Avengers: Doomsday*. A primeira entrega prioriza uma experiência realmente utilizável, rápida e publicável: catálogo organizado em trilhas, status individual, notas, avaliações, resumos com spoilers, vídeos oficiais, glossário pesquisável, histórico e Wrapped por trilha.

A persistência inicial será local, por decisão de simplicidade e para manter a publicação sem dependência de login. O navegador salva o progresso em `localStorage` e a interface oferece exportação/importação JSON de backup. Isso atende ao fallback explicitamente permitido no briefing e evita compartilhar dados entre pessoas sem um modelo de conta/ownership definido.

## Arquitetura

- `index.html`: shell acessível da SPA.
- `app.js`: catálogo, estado local, roteamento por hash, renderização, filtros, modal de detalhes e backup.
- `styles.css`: sistema visual responsivo e componentes.
- `server.mjs`: servidor HTTP mínimo para Preview.
- `manus-routes.json`: manifesto das rotas da aplicação.
- `research-notes.md`: evidências atuais e fontes oficiais usadas na curadoria.

A publicação usa saída estática sem build externo: o comando copia os arquivos de runtime para `public/`. O servidor local existe apenas para Preview; a versão publicada é browser-only e não expõe credenciais.

## Design

### Estilos considerados

1. **Mission control editorial** — painel cinematográfico escuro, com linhas de status, recortes vermelhos e cartões de briefing. Probabilidade 0,07.
2. **Arquivo dourado** — biblioteca premium com fundo grafite, molduras finas e hierarquia de catálogo. Probabilidade 0,04.
3. **Neon multiversal** — interface mais vibrante, com gradientes roxos e animações de portais. Probabilidade 0,03.

Escolhido: **Mission control editorial**.

- **Movimento:** painel de operações cinematográfico, inspirado em dossiês e telas de comando, sem copiar marcas ou logos de estúdios.
- **Princípios:** hierarquia imediata, contraste alto, densidade controlada e ações sempre visíveis.
- **Filosofia de cor:** grafite e azul-noite criam concentração; vermelho sinaliza ação e progresso; dourado reserva destaque para missão, relevância e conquistas; branco azulado mantém leitura confortável.
- **Layout:** cabeçalho compacto, hero com duas colunas no desktop e blocos verticais no celular; trilhas em faixas horizontais com progresso; detalhes em drawer/modal para preservar o contexto da maratona.
- **Assinaturas:** selo circular de operação, barras de progresso com brilho discreto e “case file” vertical para cada título.
- **Interação:** marcar assistido/pulado deve exigir no máximo um toque; detalhes e resumo abrem sem perder filtros; mudanças dão feedback textual de confirmação.
- **Animação:** entrada curta de 180–240 ms em cards e modal; sem movimento contínuo que prejudique leitura ou acessibilidade; respeitar `prefers-reduced-motion`.
- **Tipografia:** `Inter`/system sans para leitura e uma escala monoespaciada pequena para metadados de missão; títulos grandes, curtos e com tracking discreto.
- **Essência:** uma central pessoal de preparação para Doomsday, feita para quem quer saber o que assistir, o que pode pular e o que precisa lembrar.
- **Personalidade:** precisa, cinematográfica, acolhedora.
- **Voz:** direta e motivadora. Exemplos: “A missão começa no primeiro reator.” e “Você já conhece o essencial. O multiverso vem a seguir.”
- **Marca visual:** um anel de radar interrompido por um corte vermelho, usado como ícone abstrato da operação.
- **Cor proprietária:** `#e5484d`, um vermelho coral operacional que diferencia a marca do vermelho puro de interfaces genéricas.

## Escopo desta entrega

Inclui o catálogo das trilhas do briefing, produções adicionais oficialmente listadas como relevantes, dashboard, pesquisa, filtros, ordenação, progresso, modal de detalhes, resumos de campanha, lembretes, fontes oficiais, glossário, Wrapped, histórico e backup local.

A expansão futura mais natural é autenticação com banco compartilhado por usuário. A estrutura atual mantém o estado isolado no navegador e deixa essa troca localizada no módulo de persistência.
