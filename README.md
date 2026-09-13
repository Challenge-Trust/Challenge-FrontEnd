# TrustCorp · SoulUp 🚀

> **Assista conteúdos, acumule pontos e transforme em mobilidade!**

O SoulUp é uma rede social criada para incentivar o consumo de conteúdos relevantes e educativos de forma recompensadora. Os usuários assistem vídeos, acumulam pontos por participação e podem trocar esses pontos por créditos para transporte público — tornando o acesso à mobilidade mais acessível.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar](#como-executar)
- [Equipe](#equipe)
- [Status do Projeto](#status-do-projeto)

---

## Sobre o Projeto

O SoulUp une entretenimento, aprendizado e impacto social, criando uma experiência onde o tempo investido em conteúdo gera benefícios reais no dia a dia.

### Funcionalidades previstas

- 📺 Feed de vídeos educativos e relevantes
- 🏆 Sistema de pontuação por engajamento
- 🚌 Conversão de pontos em créditos de transporte público
- 🤖 Assistente virtual com IA integrado ao APP
- 👤 Perfil de usuário com histórico de pontos

---

## 🛠 Tecnologias Utilizadas

### Front-End (este repositório)

- React
- Vite
- TypeScript
- CSS3
- Tailwind CSS 4 e React Hook Form

### Back-End _(em desenvolvimento)_

- Java
- Python
- Banco de Dados Relacional _(integração futura)_

### Outros

- Assistente de IA _(projeto paralelo para o APP SoulUp)_

---

## 📁 Estrutura do Projeto

```
Challenge-FrontEnd/
│
├── index.html              # Entrada do Vite
├── src/
│   ├── components/         # Componentes compartilhados
│   ├── pages/              # Páginas React
│   ├── routes/             # Rotas centralizadas e fallback 404
│   ├── data/               # Dados de navegação, equipe e FAQ
│   ├── types/              # Tipos TypeScript compartilhados
│   ├── index.css           # Tema global e componentes de estilo
│   ├── App.tsx             # Provedor do React Router
│   └── main.tsx            # Entrada React
├── public/
│   └── img/                # Imagens e assets
├── .github/workflows/      # Validação automática de pushes e PRs
├── package.json
└── vite.config.ts
```

---

## ▶️ Como Executar

Este projeto utiliza React, Vite e TypeScript.

Requisitos: Node.js 22.12 ou superior na linha 22, ou Node.js 24, com npm.
Utilize apenas npm neste projeto para respeitar o `package-lock.json`.

Link Repositório:
https://github.com/Challenge-Trust/Challenge-FrontEnd

1. Clone o repositório:

```bash
git clone https://github.com/Challenge-Trust/Challenge-FrontEnd.git
```

2. Acesse a pasta do projeto:

```bash
cd Challenge-FrontEnd
```

3. Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm ci
npm run dev
```

4. Abra o endereço exibido pelo Vite no navegador.

No PowerShell, use `npm.cmd ci` e `npm.cmd run dev` caso a execução de `npm.ps1` esteja bloqueada.
Execute os comandos dentro de `Challenge-FrontEnd`, onde fica o `package.json`.

### Verificação e preview

```bash
npm run check
npm run preview
```

`check` executa Prettier, ESLint, TypeScript em modo estrito e build de produção.
Use `npm run format` para aplicar a formatação padronizada.
`preview` serve a última versão compilada; para desenvolvimento, use `dev`.

### Componentes e rotas

- `Header`, `Navbar` e `Footer`: estrutura compartilhada, menu responsivo e link para pular ao conteúdo.
- `Button`: botões de ação e links internos com aparência consistente.
- `Card`: painéis com espaçamento responsivo.
- `FormField` e `Modal`: campos com erros acessíveis e diálogo com foco e fechamento por Escape.
- `Layout`: títulos das páginas, foco no conteúdo e retorno ao topo nas trocas de rota.
- Rotas: `/`, `/sobre`, `/quem-somos`, `/quem-somos/:id`, `/faq`, `/contato`, `/conversao` e fallback 404.

Em hospedagem estática, configure o servidor para servir `index.html` nas rotas da aplicação.
O formulário ainda é uma demonstração local: valida dados e mostra um modal, mas não envia e-mails nem faz chamadas a um backend.

### Colaboração e versionamento

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para o fluxo de branches e revisão.
Cada push na `main` e cada pull request executa a validação em GitHub Actions.
Isso não configura proteção de branch nem publica o site automaticamente.

---

## 👥 Equipe

| Nome                                                        | Função                          | RM     |
| ----------------------------------------------------------- | ------------------------------- | ------ |
| [Henrique Soares Soares](https://github.com/henriquesoaresserra-h) | Desenvolvedor de DataBase       | 573618 |
| [Vinicius Soares](https://github.com/vinisl2510-sudo)       | Desenvolvedor Front-End         | 573351 |
| [Nicolas Frazão](https://github.com/Frazaomol)              | Desenvolvedor de Agente Virtual | 568780 |
| [Cauã Bertini](https://github.com/cauabertini)              | Desenvolvedor Python            | 570451 |

---

## 📌 Status do Projeto

🚧 **Em desenvolvimento** — Projeto acadêmico FIAP (2026)

- [x] Site institucional   (Front-End)
- [ ] Back-End Java
- [ ] Back-End Python
- [ ] Integração com Banco de Dados
- [ ] APP Mobile
- [ ] Assistente Virtual com IA

---

## 📄 Licença

Projeto acadêmico desenvolvido para a **FIAP**(2026). Todos os direitos reservados ao grupo TrustCorp.

