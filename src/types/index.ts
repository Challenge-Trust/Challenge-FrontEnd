export interface TeamMember {
  id: string;
  name: string;
  role: string;
  rm: string;
  turma: string;
  photo: string;
  logo: string;
  logoAlt: string;
  linkedin: string;
  github: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type ContactSubject = 'duvida' | 'sugestao' | 'parceria' | 'outro' | '';

export interface ContactFormData {
  nome: string;
  email: string;
  assunto: ContactSubject;
  mensagem: string;
}

/* ---------- Autenticação e API (espelham os models Java: Usuario, Ticket, Points, CO2Economia) ---------- */

/** Usuario.java sem o campo password, que nunca deve voltar do back-end. */
export interface Usuario {
  id: number;
  name: string;
  userName?: string | null;
  cpf: string;
  viewMinutes: number;
}

/** Union type: todos os estados possíveis de uma requisição. */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

/** Intersection type: usuário autenticado + token opcional (caso o back-end emita um). */
export type SessaoUsuario = Usuario & { token?: string };

export interface LoginRequest {
  cpf: string;
  password: string;
}

export interface CadastroRequest {
  cpf: string;
  name: string;
  password: string;
  viewMinutes: number;
}

/** Intersection type: PUT /api/usuarios/{id} aceita os dados do cadastro + userName, com senha opcional. */
export type UsuarioRequest = Omit<CadastroRequest, 'password'> & {
  userName?: string | null;
  password?: string;
};

export interface RecuperarSenhaRequest {
  cpf: string;
  name: string;
  newPassword: string;
}

export interface MensagemResponse {
  mensagem: string;
}

/** Corpo padrão de erro da API Java (GlobalExceptionHandler). */
export interface ErroApi {
  status: number;
  erro: string;
  mensagem: string;
  timestamp: string;
}

/** Ticket.java (tabela passagem). dataEmissao chega como ISO-8601. */
export interface Ticket {
  id: number;
  usuarioId: number;
  tickets: number;
  dataEmissao: string;
}

/** Points.java (tabela T_SU_PONTOS): saldo de pontos, 1 registro por usuário. */
export interface Pontos {
  id: number;
  usuarioId: number;
  earnedPoints: number;
  dataAtualizacao: string;
}

/** CO2Economia.java (tabela co2). */
export interface Co2Economia {
  id: number;
  usuarioId: number;
  distanciaKm: number;
  co2Economizado: number;
  passageiroOnibus: number;
  dataCalculo: string;
}

/** Union type: selos possíveis conforme o CO₂ total economizado. */
export type SeloSustentavel = 'Bronze' | 'Prata' | 'Ouro';

/** GET /api/usuarios/{id}/selo (totalCo2Economizado em gramas). */
export interface Selo {
  usuarioId: number;
  totalCo2Economizado: number;
  selo: SeloSustentavel;
}

/** Estado genérico de dados vindos da API. */
export type AsyncState<T> =
  | { status: 'idle' | 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string; httpStatus?: number };

export interface LocationState {
  from?: string;
  aviso?: string;
  sucesso?: string;
}

/* ---------- CO₂ e conversão ---------- */

/** POST/PUT /api/co2: o co2Economizado é calculado pela API. */
export interface Co2Request {
  usuarioId: number;
  distanciaKm: number;
  passageiroOnibus: number;
}

/** POST /api/usuarios/{id}/minutos */
export interface MinutosRequest {
  minutos: number;
}

/** Resultado da conversão minutos → pontos → tickets. */
export interface ConversaoResponse {
  usuarioId: number;
  pontosGanhos: number;
  ticketsEmitidos: number;
  viewMinutes: number;
  earnedPoints: number;
}

/** Tudo o que a tela mostra sobre um usuário (montado a partir de 5 GETs da API). */
export interface ResumoUsuario {
  usuario: Usuario;
  /** null quando o usuário ainda não tem registro de pontos (API responde 404). */
  pontos: Pontos | null;
  tickets: Ticket[];
  co2: Co2Economia[];
  selo: Selo;
}
