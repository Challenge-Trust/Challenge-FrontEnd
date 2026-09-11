import { useState } from 'react';
import { faqItems } from '../data/faq';

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <div className="mb-12 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">Dúvidas</span>
        <h1 className="my-3 text-3xl font-bold text-heading sm:text-4xl">Perguntas Frequentes</h1>
        <p className="text-faint">Tire suas dúvidas sobre o SoulUp.</p>
      </div>

      <div className="flex flex-col gap-4">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-cardborderalt bg-cardalt"
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                id={`faq-question-${item.id}`}
                className="w-full px-6 py-5 text-left text-lg text-white transition-colors hover:text-accent"
              >
                {item.question}
              </button>
              <div
                id={`faq-answer-${item.id}`}
                role="region"
                aria-labelledby={`faq-question-${item.id}`}
                aria-hidden={!isOpen}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 leading-relaxed text-[#b9b9d9]">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
