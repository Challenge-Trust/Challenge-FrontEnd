# SoulUp · TrustCorp

> **Assista conteúdos, acumule pontos e transforme em mobilidade.**

A SoulUp é uma rede social de impacto: o usuário assiste vídeos educativos e cada **180 minutos
assistidos viram 1 ponto**. A cada **10 pontos ele recebe 1 ticket de transporte público**. A
plataforma também calcula o **CO₂ que deixa de ser emitido** quando o usuário troca o carro pelo
ônibus e concede um **selo sustentável** (Bronze, Prata ou Ouro).

Este repositório é o **front-end** (SPA em React). Ele consome a API Java da solução:
[Challenge-Trust/java-challenge2](https://github.com/Challenge-Trust/java-challenge2).

---

## 📋 Índice

1. [Tecnologias utilizadas](#-tecnologias-utilizadas)
2. [Estrutura de pastas](#-estrutura-de-pastas)
3. [Autores e créditos](#-autores-e-créditos)
4. [Imagens e ícones](#-imagens-e-ícones)
5. [Como usar](#-como-usar)
6. [Rotas e integração com a API](#-rotas-e-integração-com-a-api)
7. [Contato](#-contato)

---

## 🛠 Tecnologias utilizadas

| Tecnologia                         | Uso                                                             |
| ---------------------------------- | --------------------------------------------------------------- |
| React 19 + Vite 7                  | SPA e servidor de desenvolvimento/build                         |
| TypeScript 5.9 (modo `strict`)     | Tipagem de componentes, serviços e respostas da API (sem `any`) |
| Tailwind CSS 4                     | Toda a estilização (tema em `@theme`, sem CSS manual)           |
| React Router DOM 7                 | Rotas estáticas, dinâmicas (`:id`), protegidas e 404            |
| `fetch` nativo                     | Todas as requisições HTTP (sem Axios)                           |
| React Hook Form                    | Estado e validação dos formulários                              |
| ESLint + Prettier + GitHub Actions | Qualidade e padronização do código a cada push                  |
| Vercel                             | Hospedagem (rewrite de SPA em `vercel.json`)                    |

Recursos de React usados: `useState`, `useEffect`, `useContext` (sessão do usuário),
`useRef`, `useCallback`, `useMemo` e hooks próprios (`useAuth`, `useFetch`,
`useExclusaoUsuario`, `useExclusaoViagem`).

Recursos de TypeScript: interfaces (`Usuario`, `Co2Economia`, `ErroApi`…), **union types**
(`RequestStatus`, `SeloSustentavel`, `AsyncState<T>`) e **intersection types**
(`SessaoUsuario = Usuario & { token?: string }`, `UsuarioRequest`).

---

## 📁 Estrutura de pastas

```
Challenge-FrontEnd/
├── public/
│   ├── favicon.svg          # Ícone da aba
│   └── img/                 # Fotos dos integrantes e logos
├── src/
│   ├── assets/              # Logo da SoulUp (importada pelo Header)
│   ├── components/          # Componentes reutilizáveis (Button, Card, Header, ConfirmDialog,
│   │                        #   LoadingState, ErrorState, EmptyState, ResumoUsuario…)
│   ├── contexts/            # AuthContext + AuthProvider (sessão do usuário)
│   ├── data/                # Conteúdo estático: menu, FAQ e equipe
│   ├── hooks/               # useAuth, useFetch, useExclusaoUsuario, useExclusaoViagem
│   ├── pages/               # Uma página por rota
│   ├── routes/              # router.tsx (todas as rotas da SPA)
│   ├── services/            # Camada de API: api.ts (fetch), authService, usuarioService, co2Service
│   ├── types/               # Tipos que espelham o JSON da API Java
│   ├── utils/               # CPF, formatação, cálculo de prévia, leitura de :id
│   ├── index.css            # Tailwind + tema (@theme)
│   ├── App.tsx              # AuthProvider + RouterProvider
│   └── main.tsx             # Ponto de entrada
├── .env.example             # VITE_API_URL
├── vercel.json              # Rewrite de SPA
├── index.html
├── package.json / package-lock.json
├── tsconfig*.json
└── vite.config.ts           # React + plugin do Tailwind
```

---

## 👥 Autores e créditos

Turma **1TDSPI** · FIAP · 2026 · Equipe **TrustCorp**

| Foto                                                                       | Nome            | RM     | Função                          | GitHub                                                            | LinkedIn                                                                        |
| -------------------------------------------------------------------------- | --------------- | ------ | ------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <img src="public/img/henrique.jpeg" width="70" alt="Henrique Soares">      | Henrique Soares | 573618 | Desenvolvedor de Banco de Dados | [henriquesoaresserra-h](https://github.com/henriquesoaresserra-h) | [LinkedIn](https://www.linkedin.com/in/henrique-s-s-47419a3aa/)                 |
| <img src="public/img/vinicius.jpeg" width="70" alt="Vinicius Soares">      | Vinicius Soares | 573351 | Desenvolvedor Front-End e Java  | [vinisl2510-sudo](https://github.com/vinisl2510-sudo)             | [LinkedIn](https://www.linkedin.com/in/vin%C3%ADcius-soares-loureiro-9bb96b34b) |
| <img src="public/img/nicolas_frazao.jpeg" width="70" alt="Nicolas Frazão"> | Nicolas Frazão  | 568780 | Desenvolvedor de Agente Virtual | [Frazaomol](https://github.com/Frazaomol)                         | [LinkedIn](https://www.linkedin.com/in/nicolas-molina-3a9257355)                |
| <img src="public/img/caua.png" width="70" alt="Cauã Bertini">              | Cauã Bertini    | 570451 | Desenvolvedor Python            | [cauabertini](https://github.com/cauabertini)                     | [LinkedIn](https://www.linkedin.com/in/caua-mathias-bertini)                    |

---

## 🖼 Imagens e ícones

| Arquivo                                                                              | Onde aparece                                |
| ------------------------------------------------------------------------------------ | ------------------------------------------- |
| `src/assets/logo.svg` / `public/favicon.svg`                                         | Logo da SoulUp no cabeçalho e ícone da aba  |
| `public/img/*.jpeg`, `public/img/caua.png`                                           | Fotos dos integrantes (`/integrantes`)      |
| `public/img/python-logo.png`, `html-logo.png`, `ia-logo.png`, `datamodeler-logo.png` | Área de atuação de cada integrante          |
| `public/img/github-logo.png`, `linkedin-logo.png`                                    | Links do perfil de cada integrante          |
| Emojis (🎥 🎯 🚌 🗂️)                                                                 | Ícones decorativos (sem biblioteca externa) |

### Telas

> Prints das telas: **[PREENCHER]** — adicionar em `docs/` e referenciar aqui
> (Home, Login, Painel, Usuários, Detalhe do usuário, Viagens, Conversão, mobile).

---

## ▶️ Como usar

- **Repositório:** <https://github.com/Challenge-Trust/Challenge-FrontEnd>
- **Aplicação publicada (Vercel):** **[PREENCHER APÓS O DEPLOY]**
- **API publicada (Render):** **[PREENCHER APÓS O DEPLOY]**
- **Vídeo de apresentação (YouTube):** **[PREENCHER]**

### Requisitos

- Node.js 22.12+ (ou 24 LTS) com npm
- A API Java rodando (local em `http://localhost:8080` ou publicada)

### Instalação e execução

```bash
git clone https://github.com/Challenge-Trust/Challenge-FrontEnd.git
cd Challenge-FrontEnd
cp .env.example .env        # ajuste VITE_API_URL se a API não estiver em localhost:8080
npm install
npm run dev                 # abre em http://localhost:5173
```

No PowerShell, se `npm.ps1` estiver bloqueado, use `npm.cmd install` e `npm.cmd run dev`.

Usuários de exemplo (criados pelo `script.sql` da API), senha `senha123`:

- Ana Silva — CPF `529.982.247-25`
- Bruno Costa — CPF `111.444.777-35`

### Outros scripts

```bash
npm run build     # verificação de tipos + build de produção em dist/
npm run preview   # serve o build localmente
npm run check     # Prettier + ESLint + build (mesma validação do GitHub Actions)
```

### Deploy na Vercel

1. Em <https://vercel.com>, **Add New → Project** e importe este repositório (framework: Vite).
2. Em **Settings → Environment Variables**, crie `VITE_API_URL` com a URL da API no Render
   (sem `/` no final) para Production, Preview e Development.
3. Faça o deploy. O `vercel.json` já redireciona todas as rotas para o `index.html`.
4. Copie a URL gerada e cadastre-a na variável `FRONT_URL` da API (CORS).

> Variáveis `VITE_*` são lidas no build: depois de alterar `VITE_API_URL`, faça **Redeploy**.

### Entrega (.zip)

Compacte **sem** `node_modules/` e `dist/`, incluindo: `src/`, `public/`, `index.html`,
`package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`,
`vercel.json`, `.env.example` e `README.md`. Para conferir: descompacte em outra pasta e rode
`npm install && npm run dev`.

```powershell
# PowerShell, na pasta Challenge-FrontEnd
git archive --format=zip -o ..\Challenge-FrontEnd.zip HEAD
```

---

## 🔀 Rotas e integração com a API

| Rota                                    | Acesso   | Descrição                                                  |
| --------------------------------------- | -------- | ---------------------------------------------------------- |
| `/`                                     | público  | Home                                                       |
| `/sobre`, `/faq`, `/contato`            | público  | Páginas institucionais                                     |
| `/integrantes`, `/integrantes/:id`      | público  | Equipe e perfil de cada integrante (rota dinâmica)         |
| `/conversao`                            | público* | Simulador; logado, registra minutos na API                 |
| `/cadastro`, `/login`, `/esqueci-senha` | público  | Conta do usuário                                           |
| `/painel`                               | logado   | Pontos, tickets, CO₂ e selo do usuário                     |
| `/usuarios`, `/usuarios/novo`           | logado   | Lista (busca) e cadastro de usuários                       |
| `/usuarios/:id`, `/usuarios/:id/editar` | logado   | Detalhe, edição e exclusão com confirmação                 |
| `/viagens`, `/viagens/nova`             | logado   | Viagens de ônibus e CO₂ economizado                        |
| `/viagens/:id`, `/viagens/:id/editar`   | logado   | Detalhe (com o cálculo), edição e exclusão com confirmação |
| `*`                                     | público  | Página 404                                                 |

Toda requisição passa por `src/services/api.ts` (`fetch` nativo, base `VITE_API_URL`):

| Serviço          | Endpoints da API                                                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authService`    | `POST /api/auth/login`, `POST /api/usuarios`, `POST /api/auth/recuperar-senha`                                                                              |
| `usuarioService` | `GET/POST /api/usuarios`, `GET/PUT/DELETE /api/usuarios/{id}`, `GET /api/usuarios/{id}/pontos · /tickets · /co2 · /selo`, `POST /api/usuarios/{id}/minutos` |
| `co2Service`     | `GET/POST /api/co2`, `GET/PUT/DELETE /api/co2/{id}`                                                                                                         |

Tratamento de respostas: **400/409** mostram a mensagem de validação da API, **404** mostra
"não encontrado", **500**/falha de rede mostram erro genérico com "Tentar novamente". Toda tela
que consome a API tem estado de **carregando**, **erro** e **lista vazia**; se a API (plano
gratuito) demorar a acordar, a tela avisa o usuário.

---

## 📬 Contato

- Equipe TrustCorp — turma 1TDSPI, FIAP (Av. Paulista, 1106 — São Paulo/SP)
- Abra uma [issue](https://github.com/Challenge-Trust/Challenge-FrontEnd/issues) ou fale com
  qualquer integrante pelos links da seção [Autores e créditos](#-autores-e-créditos).
- Formulário de contato no site: `/contato`

---

Projeto acadêmico desenvolvido para a **FIAP** (2026). Todos os direitos reservados ao grupo
TrustCorp.
