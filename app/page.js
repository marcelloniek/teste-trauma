"use client";
import { useState } from 'react';

const perguntas = [
  "Sou perturbado(a) por lembranças indesejadas ou pesadelos relacionados a um evento difícil ou traumático que vivenciei.",
  "Tenho reações emocionais intensas (medo, angústia ou ansiedade) ao lembrar ou ser exposto(a) a algo que remeta ao trauma.",
  "Evito conscientemente lugares, pessoas ou situações que possam me lembrar do acontecimento traumático.",
  "Sinto dificuldade em confiar nas pessoas ou em estabelecer novos relacionamentos após ter passado por experiências difíceis.",
  "Tenho dificuldades para sentir emoções positivas ou prazer em situações que antes eram agradáveis, após o evento traumático.",
  "Recentemente, pensei em desistir da vida ou em causar dano físico a mim mesmo(a) devido ao sofrimento causado por lembranças traumáticas.", // FLAG
  "Sinto frequentemente nervosismo, sobressalto ou vigilância constante, como se algo ruim pudesse acontecer novamente a qualquer momento.",
  "Percebo alterações significativas no meu sono (insônia ou sono agitado) relacionadas a lembranças ou pensamentos traumáticos.",
  "Tenho problemas de concentração, memória ou atenção que começaram após um evento emocionalmente intenso ou traumático.",
  "Tenho me isolado emocionalmente ou socialmente devido ao medo, à vergonha ou à dor que sinto após experiências traumáticas."
];

export default function TesteTrauma() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) {
      setResultado("VERMELHO");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("VERDE");
      else if (soma <= 35) setResultado("AMARELO");
      else setResultado("VERMELHO");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md text-gray-900 dark:text-gray-100">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Teste de Trauma</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Pergunta {indiceAtual + 1} de {perguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Resultado: {resultado}</h2>
          {resultado === "VERDE" && <p>Você lida muito bem com esse tema e está emocionalmente bem resolvido. Poderá auxiliar grandemente outras pessoas que precisam de ajuda.</p>}
          {resultado === "AMARELO" && <p>Há sinais evidentes de dificuldades emocionais que precisam ser trabalhadas e que, com determinação e ajuda, poderão ser superadas.</p>}
          {resultado === "VERMELHO" && <p>Seus problemas emocionais com este tema precisam necessariamente de ajuda profissional. Procure com brevidade a ajuda de um médico ou psicólogo.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTeste}
          >
            Refazer teste
          </button>
        </>
      )}
    </div>
  );
}
