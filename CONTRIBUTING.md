# Como contribuir

## Preparar o ambiente

Abra a pasta Challenge-FrontEnd e use Node.js 22.12+ (linha 22) ou 24.
Instale as dependências com `npm ci`. Não misture npm e pnpm.
No PowerShell, os mesmos comandos podem ser executados como `npm.cmd`.

## Fluxo de trabalho (Git Flow simples)

- `main`: versão estável, publicada na Vercel.
- `develop`: integração das funcionalidades prontas.
- `feature/nome`: uma branch por funcionalidade, criada a partir da `develop`.

1. Atualize a develop: `git switch develop` e `git pull --ff-only origin develop`.
2. Crie a branch: `git switch -c feature/nome-da-funcionalidade`.
3. Desenvolva, formate com `npm run format` e valide com `npm run check`.
4. Faça um commit por funcionalidade concluída, em Conventional Commits (ex.: `feat: adiciona página de viagens`, `fix: corrige status 404`).
5. Envie a branch: `git push -u origin feature/nome-da-funcionalidade`.
6. Faça merge na develop (`git merge --no-ff`) ou abra um pull request para a develop.
7. Quando a develop estiver estável, faça merge da develop na main.

`git pull` traz mudanças; `git push` envia os commits locais.
Evite force push e não versione node_modules, dist, backups locais ou arquivos .env.
Atualize e versione package-lock.json sempre que alterar dependências.

## Organização

- components: elementos reutilizáveis. Prefira Button, Card, FormField, PageHeader e os estados (LoadingState, ErrorState, EmptyState) aos estilos duplicados.
- pages: conteúdo e comportamento de cada página.
- routes: configuração central do React Router.
- data: conteúdo estático e navegação.
- services: única camada que faz fetch para a API (um arquivo por recurso).
- hooks: useAuth, useFetch e fluxos de exclusão reutilizáveis.
- types: contratos TypeScript que espelham o JSON da API; não use any.
- index.css: apenas o tema Tailwind (@theme) e padrões globais com @apply; estilize com classes do Tailwind.

## Checklist antes da revisão

- Prettier, ESLint, TypeScript e build passam em `npm run check`.
- Testar em 320, 390, 768 e 1440 px: sem rolagem horizontal, textos legíveis e campos dentro dos painéis.
- Testar menu por clique e teclado, Escape, link ativo e fechamento ao navegar.
- Testar links diretos de perfis (/integrantes/:id), perfil inexistente, rota 404 e botão voltar.
- Testar o CRUD de usuários e de viagens: listar, detalhar, cadastrar, editar e excluir (com confirmação), incluindo erros 400, 404 e API desligada.
- Testar formulário vazio, e-mail inválido, mensagem válida, modal, Escape e retorno de foco.
- Testar FAQ, simulador e navegação pelo histórico do navegador.

O workflow de CI executa as checagens de código e build. As verificações visuais e de teclado são manuais.
