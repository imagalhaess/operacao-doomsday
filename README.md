# 🛡️ Operação Doomsday

Painel pessoal de comando para planejar, acompanhar e conectar todas as produções cinematográficas e televisivas rumo a **Avengers: Doomsday (2026)**.

Uma Single Page Application (SPA) progressiva (PWA), rápida, offline-first e com armazenamento local criptografado no navegador.

---

## ✨ Recursos

- **Trilha Visual & Caminho da Missão**: Mapa visual e dinâmico conectando as 8 trilhas narrativas com conduítes energéticos e emblemas animados dedicados para cada filme (Reator Arc, Escudo, Mjolnir, Olho de Agamotto, Garras de Vibranium, Teia, etc.).
- **Gamificação & Seleção de Heróis**: Escolha seu personagem (Tony Stark, Steve Rogers, Thor, Peter Parker, Wanda, Loki, Deadpool, Wolverine, Doom) para percorrer a trilha como avatar ativo.
- **Maratona em Dupla (Live P2P Sync)**: Conecte-se em tempo real com seu parceiro via WebRTC descentralizado por código de sala (sem cadastro nem servidor intermediário). Os dois acompanham a posição um do outro na trilha com tokens visuais e comparativo de distância.
- **Ações Rápidas Responsivas & Desfazer (Toggle)**: Clique em assistido ou conhecido por resumo com alternância e desfazer imediato (revertendo para pendente com um toque).
- **Feedback Tátil HUD**: Pulso de energia Arc Reactor e varredura holográfica nos cards ao registrar filmes, sem sobrecarregar a tela.
- **Dossiês Operacionais**: Resumo para caso não queira assistir, pontos cruciais a lembrar, conexões imediatas e links oficiais verificados.
- **PWA & Offline-First**: Instale como aplicativo nativo no celular ou desktop; funciona 100% offline via Service Worker.
- **Posters Oficiais TMDB**: Identificação visual rápida de cada título com suporte a fallback gráfico.
- **Sistema de Backup & Restauração**: Exporte e importe seu progresso a qualquer momento via JSON sem dependência de contas ou servidores de terceiros.
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

---

## 📄 Licença

Este projeto é disponibilizado para uso pessoal sob a licença [MIT](LICENSE).
Marcas registradas, personagens e nomes citados pertencem à Marvel Characters, Inc. e à The Walt Disney Company.

