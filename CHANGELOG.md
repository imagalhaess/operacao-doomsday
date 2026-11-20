# Histórico de alterações

O diário das missões entregues. Registra mudanças relevantes para quem usa ou mantém a aplicação, agrupadas por data. Não substitui o histórico completo do Git.

As datas abaixo identificam integrações; não representam versões publicadas ou tags de release.

## Não lançado

### Adicionado

- Vinheta 8-bit original e aviso ao subir de nível ou concluir uma trilha, respeitando a ativação e o mute do som.
- A comemoração ocorre apenas quando uma mudança de status conquista um nível ou conclui uma trilha, sem repetição ao navegar, recarregar ou restaurar um backup.

### Corrigido

- Concluir uma trilha agora também dispara a comemoração, mesmo sem mudar o nível de XP e mesmo quando o efeito antigo já havia sido visto.
- Faixa de conquista visível no topo, sem depender de animação ou de um toast discreto; sobrevive à renderização da tela e pode ser fechada com Escape.
- Títulos parcialmente assistidos não concluem uma trilha. Os títulos conhecidos por resumo contam no total de concluídos.
- Um único clique que ganha nível e conclui a trilha produz uma única comemoração.

### Documentação

- README com identidade visual 8-bit, novidades e instruções de uso e desenvolvimento.
- Guia de contribuição, modelos de issue/PR e este histórico.
- Correção dos requisitos de Node/TypeScript e esclarecimento dos limites de armazenamento, offline, coop e publicação.

### Licença

- Formalização da licença MIT em `LICENSE`, com autoria imagalhaess e metadados consistentes no manifesto e no lockfile.
- Esclarecimento de que materiais e dependências de terceiros mantêm seus próprios direitos e licenças.

## 2026-11-20

Integração na `master`: [#1](https://github.com/imagalhaess/operacao-doomsday/pull/1).

### Adicionado

- Botão **Assistir agora** em cards, dossiês e nós da trilha, com 77 entradas de links oficiais diretos do Disney+.
- Aviso explícito quando não há link verificado ou o filme completo não está disponível.
- Sons sintetizados de hover, foco por teclado e clique, com controle de ativação e preferência persistida.
- Cursor MCU com variantes convencional e pixelada, desenhado na página para aparecer também na prévia integrada.
- Marca convencional, Reator Arc pixelado para a trilha e favicon conforme a tela.
- Testes de regressão para personagens, estados, links, HUD, áudio, pôsteres, cache e controles de progresso.

### Alterado

- Padronização de **Já assisti**, **Li o resumo**, **Vi uma parte** e **Pendente**, preservando o toggle para pendente.
- Tipografia em DM Mono, Press Start 2P e Silkscreen, sem Inter.
- HUD de herói/nível/XP restrito a **Trilhas (8-Bit)**; som disponível em todas as telas.
- Controles **Salvar progresso** e **Restaurar progresso** em estilo 8-bit, com explicação do download e da substituição dos dados.
- Service Worker prioriza a rede para navegação e mantém fallback offline; imagens externas não passam pelo seu cache.

### Corrigido

- Renderização dos 12 personagens mesmo quando o campo de facção estiver ausente.
- Altura e rolagem do seletor de personagens e posição visível do token do jogador.
- Layout do dossiê, ações dos cards e cabeçalho em telas pequenas.
- Desbloqueio assíncrono do `AudioContext`, mute imediato e comunicação de falhas de áudio.
- Pôsteres externos bloqueados pela intermediação do Service Worker e fallback que dependia de `onerror` inline incompatível com a CSP.

Validação registrada na entrega: `npm test` com 14 testes aprovados, `npm run build` concluído e conferência manual da prévia em desktop/mobile.

## Antes deste histórico

Entregas anteriores incluíram o catálogo em oito trilhas, dashboard, dossiês, estados de progresso, histórico, Wrapped, PWA e modo em dupla. Não foram atribuídas versões retroativas a essas mudanças.

Para consultar commits anteriores:

```sh
git log --oneline
```
