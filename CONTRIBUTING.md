# Contribuir — entre para a equipe

Obrigado por ajudar a melhorar a Operação Doomsday. O objetivo é manter uma maratona fácil de usar, com conteúdo verificável e uma trilha retrô acessível.

## Prepare o ambiente

Use Node.js **22.12 ou superior**, preferencialmente LTS, e npm. O projeto usa TypeScript 7 e Vite 8. Os comandos e portas estão no [README](README.md#executar-localmente).

Se não tiver permissão de escrita, faça um fork no GitHub e clone o seu fork. Caso tenha permissão, clone o repositório normalmente.

```sh
git clone https://github.com/imagalhaess/operacao-doomsday.git
cd operacao-doomsday
npm ci
npm run dev
```

No fluxo por fork, substitua a URL de clone pela URL do seu fork.

## Escolha uma missão

Consulte as [issues](https://github.com/imagalhaess/operacao-doomsday/issues). Para uma alteração grande, discuta a proposta antes de implementar. Para um bug pequeno ou uma correção de documentação, descreva o problema e a solução no PR.

Documentação, reprodução de bugs, acessibilidade, links oficiais e testes são contribuições tão úteis quanto novas funcionalidades. O [TODO](TODO.md) registra ideias e o escopo original; não é uma promessa de entrega ou uma lista de tarefas reservadas.

## Envie uma alteração focada

1. Parta da `master` atualizada e crie uma branch descritiva, como `fix/poster-fallback` ou `docs/guia-de-contribuicao`.
2. Faça uma mudança por propósito. Evite misturar correções com reformatações de arquivos não relacionados.
3. Execute as verificações pertinentes e atualize a documentação quando o comportamento mudar.
4. Abra um pull request com destino à `master` e preencha o modelo, explicando o motivo e como verificou a solução.

Se já estiver em um worktree ou branch gerenciado por uma ferramenta, respeite esse fluxo; não troque a branch de um checkout compartilhado.

Não é exigido um prefixo específico na mensagem de commit. Use uma descrição clara e **não inclua trailers `Co-authored-by` ou identificação de IA**.

## Onde alterar

| Intenção | Ponto de partida |
| --- | --- |
| Adicionar/corrigir uma produção | `src/data/tracks.ts`, `src/data/types.ts` e `src/data/summaries.ts` |
| Atualizar um destino do Disney+ | `src/data/links.ts` |
| Alterar o botão Assistir agora | `src/components/watch-now.ts` |
| Ajustar personagens/sprites | `src/data/characters.ts`, `src/data/pixel-sprites.ts` e `src/components/coop-modals.ts` |
| Corrigir persistência ou estatísticas | `src/state/store.ts` e `src/state/stats.ts` |
| Ajustar o modo em dupla | `src/state/coop.ts` |
| Modificar eventos e navegação | `src/app.ts` e `src/router.ts` |
| Alterar áudio/cursor | `src/utils/audio.ts`, `src/utils/cursor.ts` e `public/cursors` |
| Ajustar layout e temas | `src/styles/main.css`, `src/styles/pixel.css` e `src/styles/trail.css` |
| Corrigir cache/offline | `public/sw.js` |
| Adicionar regressões | `tests/quest.test.mjs` e `tests/audio.test.mjs` |

## Convenções importantes

### Código e dados

- Preserve o TypeScript estrito e os padrões existentes de módulos e templates. Prefira helpers existentes a lógica duplicada.
- Escape conteúdo dinâmico inserido em HTML com `escapeHtml`; não acrescente handlers inline como `onclick` ou `onerror`.
- **IDs de produções são persistidos no progresso.** Não os renomeie para mudar um título traduzido. Mudanças de formato ou identificador precisam considerar os dados já salvos.
- Não descarte registros ou altere o comportamento de restauração sem explicitar o impacto e discutir uma estratégia de compatibilidade.
- Não adicione dependências sem necessidade e justificativa. Versione `package-lock.json` se as dependências mudarem; não envie `node_modules` ou `dist`.

### Curadoria e Disney+

- Diferencie conteúdo lançado, anunciado e não confirmado. Não apresente rumores como fatos.
- Prefira páginas oficiais e informe a fonte no PR, com data e região consultadas quando houver variação de catálogo.
- Use URLs HTTPS oficiais da produção no Disney+, mapeadas pelo ID interno. Não invente identificadores nem troque silenciosamente um destino direto por busca.
- Séries podem compartilhar a página da produção entre temporadas; remakes e filmes diferentes não devem ser confundidos.
- Sem link confirmado, preserve o aviso de indisponibilidade. O botão não deve prometer streaming de um trailer ou de um filme ainda indisponível.
- Use apenas imagens, sons e outros assets com origem e condições de uso conhecidas. Créditos não substituem autorização de uso.

### Interface e acessibilidade

- Textos de interface e documentação são em português brasileiro; mantenha os identificadores de código conforme o padrão existente.
- O HUD de herói/nível/XP, a marca e o favicon pixelados pertencem à trilha 8-bit. Não os espalhe pelas demais telas.
- O controle de som existe em todas as telas; respeite mute, interação inicial exigida pelo navegador e navegação por teclado.
- O cursor tem variantes convencional/pixelada. Preserve o cursor de texto, o comportamento em touch e a possibilidade de usar controles nativos.
- Preserve foco visível, nomes acessíveis, mensagens de erro compreensíveis e `prefers-reduced-motion`.
- Verifique textos longos e telas estreitas; não esconda um controle essencial para fazê-lo caber.

### Cache e publicação

- Ao alterar assets estáticos cacheados com a mesma URL, revise `STATIC_ASSETS` e incremente `CACHE_NAME` em `public/sw.js`.
- Não volte a interceptar indiscriminadamente recursos de outras origens no Service Worker.
- A configuração de cabeçalhos do preview em `vite.config.ts` não configura a hospedagem de produção. Mudanças de CSP devem considerar o provedor real.
- Não publique arquivos de progresso pessoais, credenciais, tokens ou capturas com dados sensíveis.

## Verifique sua alteração

Para mudanças de código:

```sh
npm test
npm run build
```

Não há comando de lint configurado atualmente. Não registre uma verificação como executada se ela não foi feita; explique limitações no PR. Mudanças só de documentação não exigem recompilar a aplicação, mas links, comandos e assets novos precisam ser conferidos.

Para alterações de interface, confira os fluxos afetados:

- Desktop e celular, incluindo largura de 320 px e textos que ocupam mais de uma linha.
- Navegação por teclado, foco visível e fechamento de modais/dossiês com Escape.
- Estado ativo clicado novamente volta para pendente.
- Som ativado, hover/clique e mute; cursor convencional e pixelado conforme a rota.
- Pôster carregado e imagem indisponível sem sobreposição ou ícone quebrado.
- Recarregamento da página e preservação do progresso.

Teste em um perfil de navegador de desenvolvimento, sem usar seu progresso pessoal como fixture. Se mudar o fluxo de coop, confira duas sessões e a transmissão dos registros; não use dados reais de terceiros.

## Documente a entrega

- Atualize o README quando mudar o uso, os comandos ou a arquitetura descrita.
- Acrescente mudanças relevantes em **Não lançado** no [CHANGELOG](CHANGELOG.md). Use **Adicionado**, **Alterado**, **Corrigido**, **Removido** ou **Documentação**, conforme o caso.
- Ao integrar/publicar, a mantenedora pode mover as entradas para uma seção datada ou para uma versão real. Não invente tags ou versões retroativas.
- Inclua capturas antes/depois quando ajudarem a revisar uma alteração visual, sem depender delas para explicar o comportamento.

## Relatar um problema

Use os [modelos de issue](https://github.com/imagalhaess/operacao-doomsday/issues/new/choose). Inclua a tela/rota, passos de reprodução, comportamento esperado/observado e navegador. Para falhas de som ou cache, diga se ocorre em `dev`, `preview` ou no site publicado.

Não anexe seu arquivo de progresso completo. Prefira um exemplo mínimo sem notas pessoais. Para uma possível vulnerabilidade, não publique detalhes de exploração ou dados sensíveis em uma issue aberta; procure a mantenedora por um canal privado.
