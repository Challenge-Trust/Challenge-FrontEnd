import { useState } from 'react';

export default function Conversao() {
  const [pontos, setPontos] = useState('0');

  const valor = (Number(pontos) || 0) / 10;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = event.target.value.replace(/\D/g, '');
    setPontos(onlyDigits);
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-20 text-center sm:px-10">
      <h1 className="mb-10 text-2xl font-bold text-heading sm:text-3xl">
        Simulador de conversão de Pontos
      </h1>

      <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <input
          aria-label="Quantidade de pontos"
          type="text"
          inputMode="numeric"
          value={pontos}
          onChange={handleChange}
          className="w-full max-w-xs rounded-xl border border-cardborder bg-card px-6 py-4 text-center text-2xl font-semibold text-heading outline-none focus:border-brand sm:w-48"
        />
        <h3 className="text-2xl text-faint">=</h3>
        <div className="w-full max-w-xs rounded-xl border border-cardborder bg-card px-6 py-4 sm:w-48">
          <h2 aria-live="polite" aria-atomic="true" className="text-2xl font-bold text-accent">
            R${valor.toFixed(2)}
          </h2>
        </div>
      </div>

      <p className="mx-auto max-w-md text-sm leading-relaxed text-faint">
        Simule como funciona a conversão de pontos em créditos para transporte público.
      </p>
    </section>
  );
}
