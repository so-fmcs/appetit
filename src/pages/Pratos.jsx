import { useEffect, useState } from "react";
import { RefreshCw, SearchX, UtensilsCrossed } from "lucide-react";
import BarraPedido from "../components/BarraPedido";
import CabecalhoPratos from "../components/CabecalhoPratos";
import CardCardapio from "../components/CardCardapio";
import FiltrosPratos from "../components/FiltrosPratos";
import MensagemPratos from "../components/MensagemPratos";
import ModalDetalhesPrato from "../components/ModalDetalhesPrato";
import SkeletonPratos from "../components/SkeletonPratos";
import { usePedido } from "../context/PedidoContext";
import { buscarPratosDetalhados } from "../services/cardapio";
import { converterPrato } from "../utils/converterPrato";

const categoriasDaApi = {
  Carnes: ["Beef", "Lamb", "Pork", "Goat"],
  Massas: ["Pasta"],
  Saladas: ["Starter"],
  Vegetarianos: ["Vegetarian", "Vegan"],
  Aves: ["Chicken"],
  Peixes: ["Seafood"],
  Acompanhamentos: ["Side", "Miscellaneous"],
  Sobremesas: ["Dessert"],
};

function categoriaDoPrato(prato) {
  return Object.keys(categoriasDaApi).find((categoria) =>
    categoriasDaApi[categoria].includes(prato.strCategory),
  );
}

function Pratos() {
  const [pratos, setPratos] = useState([]);
  const [status, setStatus] = useState("carregando");
  const [tentativa, setTentativa] = useState(0);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [ordem, setOrdem] = useState("recomendados");
  const [pratoAberto, setPratoAberto] = useState(null);
  const { pratosPedido, setPratosPedido } = usePedido();

  const quantidades = Object.fromEntries(
    pratosPedido.map((item) => [item.id, item.quantidade]),
  );

  const termo = busca.trim().toLowerCase();
  const pratosDaBusca = pratos.filter((prato) =>
    prato.strMeal.toLowerCase().includes(termo),
  );
  // A contagem de cada categoria respeita a busca digitada.
  const contagens = Object.fromEntries(
    Object.keys(categoriasDaApi).map((categoria) => [
      categoria,
      pratosDaBusca.filter((prato) => categoriaDoPrato(prato) === categoria)
        .length,
    ]),
  );
  const categorias = [
    { nome: "Todos", quantidade: pratosDaBusca.length },
    ...Object.keys(categoriasDaApi).map((nome) => ({
      nome,
      quantidade: contagens[nome],
    })),
  ];

  const pratosFiltrados = pratosDaBusca.filter(
    (prato) =>
      categoriaSelecionada === "Todos" ||
      categoriaDoPrato(prato) === categoriaSelecionada,
  );
  if (ordem === "nome") {
    pratosFiltrados.sort((a, b) => a.strMeal.localeCompare(b.strMeal, "pt-BR"));
  }

  const filtrosAtivos = termo !== "" || categoriaSelecionada !== "Todos";
  const totalItens = Object.values(quantidades).reduce((soma, q) => soma + q, 0);

  useEffect(() => {
    const controller = new AbortController();

    buscarPratosDetalhados({ signal: controller.signal })
      .then((dados) => {
        setPratos(dados);
        // A API respondeu, mas sem pratos: não há filtro para limpar.
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

  function limparFiltros() {
    setBusca("");
    setCategoriaSelecionada("Todos");
  }

  function alterarQuantidade(prato, variacao) {
    setPratosPedido((atuais) => {
      const existente = atuais.find((item) => item.id === prato.idMeal);
      if (!existente) {
        return variacao > 0
          ? [...atuais, { ...converterPrato(prato), quantidade: variacao }]
          : atuais;
      }
      return atuais
        .map((item) =>
          item.id === prato.idMeal
            ? { ...item, quantidade: Math.max(0, item.quantidade + variacao) }
            : item,
        )
        .filter((item) => item.quantidade > 0);
    });
  }

  return (
    <main className="pb-28">
      <CabecalhoPratos />
      <FiltrosPratos
        busca={busca}
        setBusca={setBusca}
        categorias={categorias}
        categoriaSelecionada={categoriaSelecionada}
        setCategoriaSelecionada={setCategoriaSelecionada}
        ordem={ordem}
        setOrdem={setOrdem}
        desativado={status !== "pronto"}
      />

      <div className="mx-auto largura-site px-6">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-6">
          <div>
            <h2 className="font-titulo text-4xl font-bold uppercase leading-none md:text-5xl">
              {categoriaSelecionada === "Todos"
                ? "Todos os pratos"
                : categoriaSelecionada}
            </h2>
            <p className="mt-2 text-lg text-marrom-escuro/80" aria-live="polite">
              {status === "carregando" && "Carregando pratos..."}
              {status === "erro" && "Não foi possível carregar os pratos."}
              {status === "indisponivel" && "Nenhum prato disponível agora."}
              {status === "pronto" && (
                <>
                  Mostrando{" "}
                  <strong className="text-marrom-escuro">
                    {pratosFiltrados.length}
                  </strong>{" "}
                  de {pratos.length} pratos
                </>
              )}
            </p>
          </div>
          {status === "pronto" && filtrosAtivos && (
            <button
              type="button"
              onClick={limparFiltros}
              className="py-2 text-base font-bold underline decoration-bege-areia underline-offset-4 transition hover:text-terracota-escuro hover:decoration-terracota-escuro"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {status === "carregando" && <SkeletonPratos quantidade={6} />}

        {(status === "erro" || status === "indisponivel") && (
          <MensagemPratos
            icone={UtensilsCrossed}
            titulo={
              status === "erro"
                ? "A cozinha não respondeu"
                : "Cardápio indisponível"
            }
            texto={
              status === "erro"
                ? "Não foi possível carregar o cardápio. Verifique sua conexão e tente de novo."
                : "Nenhum prato está disponível no momento. Tente novamente em alguns minutos."
            }
            alerta={status === "erro"}
          >
            <button
              type="button"
              onClick={tentarNovamente}
              className="flex h-12 items-center gap-2 rounded-full bg-terracota-escuro px-5 text-lg font-bold text-white transition hover:bg-marrom-escuro"
            >
              <RefreshCw aria-hidden="true" className="size-5" />
              Tentar novamente
            </button>
          </MensagemPratos>
        )}

        {status === "pronto" && pratosFiltrados.length === 0 && (
          <MensagemPratos
            icone={SearchX}
            titulo="Nada por aqui"
            texto={
              termo
                ? `Nenhum prato encontrado para “${busca.trim()}”${
                    categoriaSelecionada !== "Todos"
                      ? ` em ${categoriaSelecionada}`
                      : ""
                  }.`
                : "Nenhum prato encontrado."
            }
          >
            <button
              type="button"
              onClick={limparFiltros}
              className="h-12 rounded-full bg-terracota-escuro px-5 text-lg font-bold text-white transition hover:bg-marrom-escuro"
            >
              Limpar filtros
            </button>
          </MensagemPratos>
        )}

        {status === "pronto" && pratosFiltrados.length > 0 && (
          <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5">
            {pratosFiltrados.map((prato) => (
              <li key={prato.idMeal}>
                <CardCardapio
                  prato={prato}
                  categoria={categoriaDoPrato(prato)}
                  preco={converterPrato(prato).preco}
                  quantidade={quantidades[prato.idMeal] ?? 0}
                  onAlterarQuantidade={(variacao) =>
                    alterarQuantidade(prato, variacao)
                  }
                  onVerDetalhes={() => setPratoAberto(prato)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <ModalDetalhesPrato
        prato={pratoAberto}
        categoria={pratoAberto && categoriaDoPrato(pratoAberto)}
        quantidade={pratoAberto ? (quantidades[pratoAberto.idMeal] ?? 0) : 0}
        onAlterarQuantidade={(variacao) =>
          alterarQuantidade(pratoAberto, variacao)
        }
        onFechar={() => setPratoAberto(null)}
      />

      <BarraPedido totalItens={totalItens} />
    </main>
  );
}

export default Pratos;
