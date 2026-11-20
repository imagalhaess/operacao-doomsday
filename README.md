# 🛡️ Operação Doomsday

Painel pessoal de comando para planejar, acompanhar e conectar todas as produções cinematográficas e televisivas rumo a **Avengers: Doomsday (2026)**.

Uma Single Page Application (SPA) progressiva (PWA), rápida, offline-first e com armazenamento local criptografado no navegador.

---

## ✨ Recursos

- **Trilha Visual & Caminho da Missão**: Mapa visual e dinâmico conectando as 8 trilhas narrativas com conduítes energéticos e emblemas animados dedicados para cada filme (Reator Arc, Escudo, Mjolnir, Olho de Agamotto, Garras de Vibranium, Teia, etc.).
- **Gamificação & Seleção de Heróis**: Escolha entre 12 heróis e vilões em um seletor com rolagem, sprites 8-bit e token com nome flutuante na posição atual da trilha.
- **Tipografia Retrô**: Títulos e interface em Press Start 2P/Silkscreen; textos de leitura em DM Mono.
- **Identidade Pixel Art da Trilha**: Reator Arc, favicon pixelado e HUD de herói/nível/XP aparecem somente em “Trilhas (8-Bit)”. O cursor MCU usa núcleo azul e luva repulsora em todas as telas: pixelado na trilha e convencional nas demais. Ele é desenhado na página para aparecer também em prévias que não exibem o cursor nativo. Campos de texto e dispositivos de toque mantêm o comportamento nativo.
- **Som 8-bit**: Clique em “Ativar som” no cabeçalho de qualquer tela para liberar efeitos de hover, foco por teclado, clique e conquistas. A preferência fica salva; ao retornar, o navegador exige uma primeira interação para liberar áudio novamente. “Som ligado” desativa imediatamente todos os efeitos. Os sons são sintetizados localmente com Web Audio, sem downloads ou música de fundo.
- **Maratona em Dupla (Live P2P Sync)**: Conecte-se em tempo real com seu parceiro via WebRTC descentralizado por código de sala (sem cadastro nem servidor intermediário). Os dois acompanham a posição um do outro na trilha com tokens visuais e comparativo de distância.
- **Ações Rápidas Responsivas & Desfazer (Toggle)**: Use “Já assisti” ou “Li o resumo” nos cards e na trilha. No dossiê, também há “Vi uma parte” e “Pendente”; clicar no estado ativo reverte para pendente.
- **Feedback Tátil HUD**: Pulso de energia Arc Reactor e varredura holográfica nos cards ao registrar filmes, sem sobrecarregar a tela.
- **Dossiês Operacionais**: Resumo para caso não queira assistir, pontos cruciais a lembrar, conexões imediatas e links oficiais verificados.
- **Assistir agora**: Botão nos cards, na trilha e no dossiê que abre a página oficial de cada produção no Disney+, sem passar pela busca. São 77 títulos com links catalogados; Doomsday não oferece reprodução enquanto o filme completo não estiver disponível. Séries abrem a página da produção, onde você seleciona a temporada. Requer internet e pode exigir login e assinatura; disponibilidade varia por região.
- **PWA & Offline-First**: Instale como aplicativo nativo no celular ou desktop; funciona 100% offline via Service Worker.
- **Posters Oficiais TMDB**: Identificação visual com iniciais e ano como fallback durante o carregamento ou quando uma imagem não está disponível. O tratamento de falha não depende de scripts inline; imagens externas não passam pelo cache do Service Worker.
- **Salvar e Restaurar Progresso**: “Salvar progresso” baixa um arquivo JSON com títulos assistidos, notas e avaliações. “Restaurar progresso” abre esse arquivo e substitui os dados atuais, sem contas ou servidores de terceiros.
- **Marvel Wrapped**: Relatório contextual para cada trilha concluída, destacando sua preparação para o próximo arco narrativo.
- **Guia de Conceitos**: Glossário interativo (Incursões, AVT, Joias do Infinito, Variantes, etc.) com links cruzados para os filmes onde são explorados.
- **Easter Eggs Temáticos**: Animações temáticas sob marcos de progresso (Thanos Snap nos 50%, Mjolnir Thunder ao fechar trilha, intervenções de Deadpool e código Konami).

---

## 🔒 Segurança & STRIDE Threat Model

A aplicação foi projetada e auditada com base no modelo de ameaças **STRIDE**:

| Categoria | Risco Mapeado | Mitigação Implementada |
|---|---|---|
| **Spoofing** | Falsificação de identidade ou sessão | App totalmente client-side sem cookies de sessão vulneráveis; rotas são puramente conveniência de interface |
| **Tampering** | Injeção de script (XSS) e manipulação | Sanitização de strings com função `escapeHtml()`; Content Security Policy (CSP) estrito e `X-Content-Type-Options: nosniff` |
| **Repudiation** | Desautorização de ações locais | O estado é de posse exclusiva do usuário no `localStorage`, com auditoria através de payloads exportáveis |
| **Information Disclosure** | Vazamento de credenciais ou código | `build.sourcemap: false` no Vite; sem variáveis de ambiente com segredos no bundle; dev server fixado em `localhost` |
| **Denial of Service** | Sobrecarga de memória | Code-splitting nativo no Vite; sem bibliotecas pesadas de terceiros; rendering DOM granular |
| **Elevation of Privilege** | Elevação de privilégios | Arquitetura plana de permissões; dados isolados no domínio de origem do navegador |

---

## 🛠️ Stack Tecnológico

- **Vite 8**: Build tool e dev server de alta performance
- **TypeScript 5**: Tipagem estática rigorosa para todo o modelo de dados
- **Tailwind CSS v4 & daisyUI 5**: Sistema de design utilitário com tokens customizados
- **Vanilla ES Modules**: Arquitetura modular sem overhead de frameworks reativos pesados
- **Service Worker API**: Cache de assets para funcionamento offline

---

## 📁 Estrutura de Pastas

```
operacao-doomsday/
├── public/                 # Assets estáticos servidos na raiz (PWA, icons, robots)
│   ├── icon.svg
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   └── sw.js
├── src/
│   ├── components/         # Componentes modulares da interface
│   │   ├── dashboard.ts
│   │   ├── detail-drawer.ts
│   │   ├── guide.ts
│   │   ├── history.ts
│   │   ├── marathon.ts
│   │   ├── poster.ts
│   │   ├── shell.ts
│   │   ├── toast.ts
│   │   ├── tracks.ts
│   │   └── wrapped.ts
│   ├── data/               # Catálogo de dados, resumos e links
│   │   ├── concepts.ts
│   │   ├── links.ts
│   │   ├── summaries.ts
│   │   ├── tracks.ts
│   │   └── types.ts
│   ├── easter-eggs/        # Micro-interações e efeitos temáticos
│   │   ├── deadpool.ts
│   │   ├── hammer-strike.ts
│   │   ├── index.ts
│   │   ├── portal.ts
│   │   ├── snap.ts
│   │   └── web-shot.ts
│   ├── state/              # Gerenciamento de estado e métricas
│   │   ├── stats.ts
│   │   ├── store.ts
│   │   └── ui.ts
│   ├── styles/             # Folhas de estilo CSS
│   │   ├── easter-eggs.css
│   │   └── main.css
│   ├── app.ts              # Ponto de entrada da aplicação
│   ├── router.ts           # Roteamento por hash
│   ├── utils.ts            # Funções utilitárias e sanitização
│   └── vite-env.d.ts
├── index.html              # Shell HTML da aplicação
├── package.json
├── tsconfig.json
└── vite.config.ts          # Configuração Vite com headers de segurança
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v18 ou superior)
- npm

### 1. Clonar e Instalar Dependências
```bash
git clone https://github.com/SEU_USUARIO/operacao-doomsday.git
cd operacao-doomsday
npm install
```

### 2. Executar em Ambiente de Desenvolvimento
```bash
npm run dev
```
Acesse `http://localhost:3000` no seu navegador.

### 3. Gerar Build de Produção
```bash
npm run build
```
Os arquivos otimizados e prontos para publicação estarão no diretório `dist/`.

### 4. Testar o Build Localmente
```bash
npm run preview
```

### 5. Executar Testes de Regressão
```bash
npm test
```
Verifica o seletor de personagens, os estados do dossiê, a posição na trilha, os links do Disney+, o desbloqueio/mute do áudio e a atualização da página com fallback offline usando o runner nativo do Node.js e o Vite.

Os assets de ícone e cursor são SVGs locais em `public/icon.svg`, `public/icon-8bit.svg` e `public/cursors/`, sem extensões ou dependências adicionais. A pesquisa de alternativas incluiu [Pixelarticons](https://pixelarticons.com/docs/) (ícones genéricos, conjunto gratuito MIT), [NES.css](https://nostalgic-css.github.io/NES.css/) (componentes retrô) e um [cursor 8-bit do Homem de Ferro](https://www.rw-designer.com/cursor-detail/130701) (arquivo `.ani`, não adotado por compatibilidade web). Os cursores locais usam [CSS cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/cursor) com hotspots explícitos e fallback nativo; não alteram o cursor do sistema.

Os destinos do Disney+ foram conferidos em 20/11/2026 no [catálogo oficial Marvel](https://www.disneyplus.com/brand/marvel), no [guia oficial de filmes e séries](https://www.disneyplus.com/explore/articles/marvel-movies-in-order) e nas páginas dos títulos. O mapa fica em `src/data/links.ts`; títulos sem URL catalogada exibem um aviso, nunca uma busca ou um ID inventado. Os links HTTPS não forçam o aplicativo móvel nem iniciam a reprodução automaticamente.

---

## 📄 Licença

Este projeto é disponibilizado para uso pessoal sob a licença [MIT](LICENSE).
Marcas registradas, personagens e nomes citados pertencem à Marvel Characters, Inc. e à The Walt Disney Company.

