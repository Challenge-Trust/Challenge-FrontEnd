import { useState } from 'react'

export default function Conversao() {
  const [creditos, setCreditos] = useState('0')
  const convertido = (Number(creditos) || 0) / 10
  return <main><h1>Simulador de conversão de Pontos</h1><div className="container-creditos"><div className="creditos-pontos"><input type="text" id="inputCreditos" value={creditos} onChange={event => setCreditos(event.target.value.replace(/\D/g, ''))} /></div><h3>=</h3><div className="creditos-reais"><h2 id="valorReais">R${convertido.toFixed(2)}</h2></div></div><p className="descricao"> Simule como funciona a conversão de pontos em créditos para transporte público.</p></main>
}
