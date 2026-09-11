# Como contribuir

## Preparar o ambiente

Abra a pasta Challenge-FrontEnd e use Node.js 22.12+ (linha 22) ou 24.
Instale as dependências com `npm ci`. Não misture npm e pnpm.
No PowerShell, os mesmos comandos podem ser executados como `npm.cmd`.

## Fluxo de trabalho

1. Confira suas alterações com `git status`; faça commit do trabalho local antes de atualizar.
2. Na main, traga as mudanças da equipe com `git pull --ff-only origin main`.
3. Crie uma branch: `git switch -c feat/nome-da-melhoria`.
4. Desenvolva, formate com `npm run format` e valide com `npm run check`.
5. Revise o diff e adicione apenas os arquivos relacionados à mudança.
6. Faça um commit descritivo e envie a branch: `git push -u origin feat/nome-da-melhoria`.
7. Abra um pull request para main com descrição e evidências dos testes.

`git pull` traz mudanças; `git push` envia os commits locais.
Evite force push e não versione node_modules, dist, backups locais ou arquivos .env.
Atualize e versione package-lock.json sempre que alterar dependências.

## Organização

- components: elementos reutilizáveis. Prefira Button, Card, FormField e Modal aos estilos duplicados.
- pages: conteúdo e comportamento de cada página.
- routes: configuração central do React Router.
- data: conteúdo estático e navegação.
- types: contratos TypeScript compartilhados; evite any.
- index.css: tema Tailwind com @theme e estilos comuns.

## Checklist antes da revisão

- Prettier, ESLint, TypeScript e build passam em `npm run check`.
- Testar em 320, 390, 768 e 1440 px: sem rolagem horizontal, textos legíveis e campos dentro dos painéis.
- Testar menu por clique e teclado, Escape, link ativo e fechamento ao navegar.
- Testar links diretos de perfis, perfil inexistente, rota 404 e botão voltar para equipe.
- Testar formulário vazio, e-mail inválido, mensagem válida, modal, Escape e retorno de foco.
- Testar FAQ, simulador e navegação pelo histórico do navegador.

O workflow de CI executa as checagens de código e build. As verificações visuais e de teclado são manuais.
