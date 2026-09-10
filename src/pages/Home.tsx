import { Link } from 'react-router-dom'

export default function Home() {
  return <>
    <section><div><h1>Seus pontos valem <span className="destaque">passagens reais</span></h1><p>Converta pontos de fidelidade em passagens de transporte público. Simples, rápido e sem burocracia.</p><div className="hero-buttons"><Link to="/sobre" className="btn-primary">Conhecer a solução →</Link><Link to="/contato" className="btn-secondary">Fale conosco</Link></div></div></section>
    <section><div className="cf-header"><span>COMO FUNCIONA?</span><h2>Dos pontos ao bilhete<br />em 3 etapas</h2><p>Conectamos seu programa de pontos diretamente a rede de transporte público da sua cidade.</p></div><div><div><span>1</span><h3>Acumule Pontos!</h3><p>Use seu cartão fidelidade no dia a dia e acumule pontos em compras, serviços e parceiros.</p></div><div><span>2</span><h3>Converta!</h3><p>Acesse o app, escolha quantos pontos deseja converter e selecione a modalidade de transporte.</p></div><div><span>3</span><h3>Viaje!</h3><p>Receba um voucher digital ou crédito direto no bilhete eletrônico integrado.</p></div></div></section>
    <h2>FUNCIONALIDADES</h2><div><div><h3>Vouchers Digitais</h3><p>Gere vouchers com QR Code para uso imediato nas catracas e terminais parceiros.</p></div><div><h3>Integração com Bilhetagem</h3><p>Crédito automático no seu cartão de transporte.</p></div><div><h3>Acessibilidade</h3><p>Interface com suporte a leitores de tela e fontes ajustáveis.</p></div></div>
  </>
}
