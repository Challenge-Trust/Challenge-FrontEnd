export const navigation = [
  { label: 'Início', to: '/' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Integrantes', to: '/integrantes' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contato', to: '/contato' },
  { label: 'Converter Créditos', to: '/conversao' },
] as const;

/** Links exibidos conforme o estado de autenticação. */
export const guestNavigation = [
  { label: 'Entrar', to: '/login' },
  { label: 'Criar conta', to: '/cadastro' },
] as const;

export const userNavigation = [
  { label: 'Meu Painel', to: '/painel' },
  { label: 'Viagens', to: '/viagens' },
  { label: 'Usuários', to: '/usuarios' },
] as const;

/** Rotas sem item de menu, usadas apenas para o título da aba. */
export const extraTitles: Record<string, string> = { '/esqueci-senha': 'Esqueci minha senha' };

/** Títulos das rotas com parâmetro (avaliadas na ordem). */
export const dynamicTitles: ReadonlyArray<readonly [RegExp, string]> = [
  [/^\/usuarios\/novo$/, 'Novo usuário'],
  [/^\/usuarios\/\d+\/editar$/, 'Editar usuário'],
  [/^\/usuarios\/\d+$/, 'Detalhes do usuário'],
  [/^\/viagens\/nova$/, 'Nova viagem'],
  [/^\/viagens\/\d+\/editar$/, 'Editar viagem'],
  [/^\/viagens\/\d+$/, 'Detalhes da viagem'],
];
