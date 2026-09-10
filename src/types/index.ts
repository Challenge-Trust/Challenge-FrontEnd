export interface TeamMember {
  id: string;
  name: string;
  role: string;
  rm: string;
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
