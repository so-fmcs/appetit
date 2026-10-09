import { useState, useEffect } from "react";
import CardPrato from "./CardPrato";
import { Pause, Play, RefreshCw } from "lucide-react";
import { buscarPratos } from "../services/cardapio";

const avaliacoes = [
  {
    nota: 5,
    comentario: "Igualzinho ao que comi em Lyon.",
    cliente: "Alexandre",
  },
  {
    nota: 4,
    comentario: "Porção generosa e bem temperada.",
    cliente: "Leonardo",
  },
  {
    nota: 5,
    comentario: "Ambiente muito agradável, comida muito boa.",
    cliente: "Giandro",
  },
  {
    nota: 3,
    comentario: "Demorou, comida veio fria.",
    cliente: "Lazaro",
  },
  { nota: 4, comentario: "Chegou quentinho e cheiroso.", cliente: "Valter" },
  { nota: 5, comentario: "Sabor de comida de vó francesa.", cliente: "Luisa" },
  { nota: 4, comentario: "Leve e cheio de ervas frescas.", cliente: "Tiago" },
  { nota: 5, comentario: "O melhor da casa, fácil.", cliente: "Rodrigo" },
];

function PratosDaCasa() {
  const [pratos, setPratos] = useState([]);
  const [pausado, setPausado] = useState(false);
  const [status, setStatus] = useState("carregando");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    buscarPratos({ signal: controller.signal })
      .then((dados) => {
        setPratos(dados);
        setStatus(dados.length > 0 ? "pronto" : "indisponivel");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("erro");
      });
    return () => controller.abort();
  }, [tentativa]);

  function tentarNovamente() {
    setStatus("carregando");
    setTentativa((atual) => atual + 1);
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-titulo text-sm uppercase tracking-widest text-verde-oliva">
            La carte
          </p>
          <h2 className="font-titulo text-4xl font-bold uppercase">
            Pratos da casa
          </h2>
        </div>
        {/* 1: o botão só aparece quando há animação */}
        {status === "pronto" && (
          <button
            type="button"
            onClick={() => setPausado(!pausado)}
            className="hidden md:motion-safe:flex items-center gap-2 px-4 py-2 rounded-full border-2 border-marrom-escuro font-medium transition hover:bg-marrom-escuro hover:text-creme"
          >
            {pausado ? (
              <Play className="size-4" aria-hidden="true" />
            ) : (
              <Pause className="size-4" aria-hidden="true" />
            )}
            {pausado ? "Continuar" : "Pausar"}
          </button>
        )}
      </div>
      {status === "carregando" && (
        <div className="mt-4 flex gap-6 overflow-hidden py-4">
          <p role="status" className="sr-only">
            Carregando pratos...
          </p>
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="h-96 w-60 shrink-0 rounded-3xl border border-bege-areia bg-white p-3 motion-safe:animate-pulse"
            >
              <div className="h-52 rounded-2xl bg-bege-areia/50" />
              <div className="mt-4 h-6 w-3/4 rounded-md bg-bege-areia/50" />
              <div className="mt-3 h-4 w-1/2 rounded-md bg-bege-areia/50" />
              <div className="mt-3 h-4 w-5/6 rounded-md bg-bege-areia/50" />
            </div>
          ))}
        </div>
      )}
      {(status === "erro" || status === "indisponivel") && (
        <div
          role={status === "erro" ? "alert" : "status"}
          className="mt-8 flex flex-wrap items-center gap-4 rounded-3xl border border-dashed border-bege-fendi bg-white p-6"
        >
          <p className="flex-1 text-lg">
            {status === "erro"
              ? "Não foi possível carregar os pratos agora."
              : "Nenhum prato disponível no momento."}
          </p>
          <button
            type="button"
            onClick={tentarNovamente}
            className="flex h-12 items-center gap-2 rounded-full bg-marrom-escuro px-5 font-bold text-creme transition hover:bg-madeira"
          >
            <RefreshCw aria-hidden="true" className="size-5" />
            Tentar novamente
          </button>
        </div>
      )}
      {status === "pronto" && (
        <>
          {/* 2: rolagem com o dedo no celular */}
          <div className="mt-4 py-4 overflow-x-auto md:motion-safe:overflow-hidden">
            {/* 3: a animação só em tela média e sem pedido de menos movimento */}
            <div
              className={
                "flex w-max md:motion-safe:animate-carrossel md:motion-safe:hover:[animation-play-state:paused] " +
                (pausado ? "md:motion-safe:[animation-play-state:paused]" : "")
              }
            >
              <div className="flex gap-6 pr-6">
                {pratos.map((prato, i) => (
                  <CardPrato
                    key={prato.idMeal}
                    nome={prato.strMeal}
                    imagem={prato.strMealThumb}
                    nota={avaliacoes[i].nota}
                    comentario={avaliacoes[i].comentario}
                    cliente={avaliacoes[i].cliente}
                  />
                ))}
              </div>
              {/* 4: a segunda cópia só existe quando anima */}
              <div
                className="hidden md:motion-safe:flex gap-6 pr-6"
                aria-hidden="true"
              >
                {pratos.map((prato, i) => (
                  <CardPrato
                    key={prato.idMeal}
                    nome={prato.strMeal}
                    imagem={prato.strMealThumb}
                    nota={avaliacoes[i].nota}
                    comentario={avaliacoes[i].comentario}
                    cliente={avaliacoes[i].cliente}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default PratosDaCasa;
