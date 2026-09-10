import { useState } from 'react'

const faqs = [
  ['O que é a Soul Up?', 'A Soul Up é a primeira rede social de impacto sustentável do planeta! Ela combina tecnologia blockchain, comunidades descentralizadas e recompensas com impacto real.'],
  ['A Soul Up é gratuita?', 'Sim. A Soul Up é 100% gratuita! Basta apenas instalar, criar uma conta e começar a assistir vídeos para poder trocar pontos em créditos!'],
  ['Preciso criar uma conta?', 'Sim. Para a conversão de pontos em créditos de transporte público é necessário realizar a criação de uma conta.'],
  ['Minhas informações ficam seguras?', 'Sim. Prezamos pela privacidade dos usuários e buscamos utilizar boas práticas de segurança e proteção de dados.'],
  ['Como posso entrar em contato com a equipe?', 'Você pode utilizar a página de contato do site e enviar uma mensagem diretamente para nossa equipe.'],
  ['Quem desenvolveu a Soul Up?', 'A SoulUp foi desenvolvido por estudantes da FIAP como parte de um projeto acadêmico voltado à inovação e tecnologia.'],
]

export default function Faq() {
  const [active, setActive] = useState<Set<number>>(new Set())
  const toggle = (index: number) => setActive(previous => {
    const next = new Set(previous)
    if (next.has(index)) next.delete(index)
    else next.add(index)
    return next
  })
  return <section className="faq-section"><div className="faq-layout"><div className="faq-header"><span className="faq-label">DÚVIDAS</span><h1>Perguntas Frequentes</h1><p>Tire suas dúvidas sobre o SoulUp.</p></div><div className="faq-container">{faqs.map(([question, answer], index) => <div className={`faq-item${active.has(index) ? ' active' : ''}`} key={question}><button className="faq-question" onClick={() => toggle(index)}>{question}</button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></div></section>
}
