export const navigation = [
  { label: 'Início', to: '/' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Quem Somos', to: '/quem-somos' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contato', to: '/contato' },
  { label: 'Converter Créditos', to: '/conversao' },
] as const;

/** Links exibidos conforme o estado de autenticação. */
export const guestNavigation = [
  { label: 'Entrar', to: '/login' },
  { label: 'Criar conta', to: '/cadastro' },
] as const;

export const userNavigation = [{ label: 'Meu Painel', to: '/painel' }] as const;

/** Rotas sem item de menu, usadas apenas para o título da aba. */
export const extraTitles: Record<string, string> = { '/esqueci-senha': 'Esqueci minha senha' };
