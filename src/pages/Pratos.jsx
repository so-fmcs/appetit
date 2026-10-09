import { useEffect, useState } from "react";
import CardCardapio from "../components/CardCardapio";
import CabecalhoPratos from "../components/CabecalhoPratos";
import FiltrosPratos from "../components/FiltrosPratos";
import ModalDetalhesPrato from "../components/ModalDetalhesPrato";
import { RefreshCw, SearchX, UtensilsCrossed } from "lucide-react";
import MensagemPratos from "../components/MensagemPratos";
import SkeletonPratos from "../components/SkeletonPratos";
import { buscarPratosFranceses } from "../services/pratosFranceses";

const categoriasCardapio = [
  "Todos",
  "Carnes",
  "Aves",
  "Peixes",
  "Vegetarianos",
  "Sobremesas",
  "Acompanhamentos",
];

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

function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function Pratos({ pratosPedido = [], onAlterarQuantidade }) {
  const [pratos, setPratos] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("destaques");
  const [status, setStatus] = useState("carregando");
  const [tentativa, setTentativa] = useState(0);
  const [pratoDetalhe, setPratoDetalhe] = useState(null);

  useEffect(() => {
    const controlador = new AbortController();

    buscarPratosFranceses(controlador.signal)
      .then((dados) => {
        const itens = Array.isArray(dados) ? dados : dados?.meals ?? [];
        if (controlador.signal.aborted) return;
        setPratos(itens);
        setStatus(itens.length ? "pronto" : "indisponivel");
      })
      .catch((erroBusca) => {
        if (!controlador.signal.aborted && erroBusca.name !== "AbortError") setStatus("erro");
      });

    return () => controlador.abort();
  }, [tentativa]);

  const correspondeCategoria = (prato, categoria) => categoria === "Todos" ||
    (prato.categoria ?? prato.strCategory) === categoria ||
    (categoriasDaApi[categoria] ?? []).includes(prato.categoria ?? prato.strCategory);
  const termo = normalizar(busca.trim());
  const pratosDaBusca = pratos.filter(prato => normalizar(`${prato.nome ?? prato.strMeal ?? ""} ${prato.descricao ?? ""}`).includes(termo));
  // Contadores respeitam a busca, antes de aplicar a categoria selecionada.
  const categorias = ["Todos", ...new Set([...categoriasCardapio.slice(1), ...Object.keys(categoriasDaApi), ...pratos.map(prato => prato.categoria).filter(Boolean)])]
    .map(nome => ({ nome, quantidade: pratosDaBusca.filter(prato => correspondeCategoria(prato, nome)).length }));
  const pratosFiltrados = pratosDaBusca.filter(prato => correspondeCategoria(prato, categoriaSelecionada));
  const filtrosAtivos = Boolean(termo) || categoriaSelecionada !== "Todos";
  function limparFiltros() { setBusca(""); setCategoriaSelecionada("Todos"); }
  function tentarNovamente() { setStatus("carregando"); setTentativa(atual => atual + 1); }

  const pratosOrdenados = [...pratosFiltrados];

  if (ordenacao === "menor-preco") {
    pratosOrdenados.sort(
      (a, b) => (Number(a.preco ?? 0) || 0) - (Number(b.preco ?? 0) || 0),
    );
  } else if (ordenacao === "maior-preco") {
    pratosOrdenados.sort(
      (a, b) => (Number(b.preco ?? 0) || 0) - (Number(a.preco ?? 0) || 0),
    );
  } else if (ordenacao === "nome") {
    pratosOrdenados.sort((a, b) =>
      (a.nome ?? a.strMeal ?? "").localeCompare(
        b.nome ?? b.strMeal ?? "",
        "pt-BR",
      ),
    );
  }

  return (
    <main className="pb-16">
      <CabecalhoPratos />
      <FiltrosPratos busca={busca} onBuscaChange={setBusca} categorias={categorias}
        categoriaSelecionada={categoriaSelecionada} onCategoriaChange={setCategoriaSelecionada}
        ordenacao={ordenacao} onOrdenacaoChange={setOrdenacao} desativado={status !== "pronto"} />
      <section className="mx-auto largura-site px-6" aria-label="Catálogo de pratos" aria-busy={status === "carregando"}>
        <div className="flex flex-wrap items-end justify-between gap-3 pb-6">
          <div><h2 className="font-titulo text-4xl font-bold uppercase leading-none md:text-5xl">{categoriaSelecionada === "Todos" ? "Todos os pratos" : categoriaSelecionada}</h2>
            <p className="mt-2 text-lg text-marrom-escuro/80" aria-live="polite">{status === "carregando" ? "Carregando pratos..." : status === "erro" ? "Não foi possível carregar os pratos." : status === "indisponivel" ? "Nenhum prato disponível agora." : `Mostrando ${pratosFiltrados.length} de ${pratos.length} pratos`}</p>
          </div>
          {status === "pronto" && filtrosAtivos && <button type="button" onClick={limparFiltros} className="py-2 font-bold underline underline-offset-4 hover:text-terracota-escuro">Limpar filtros</button>}
        </div>
        {status === "carregando" && <SkeletonPratos quantidade={6} />}
        {(status === "erro" || status === "indisponivel") && <MensagemPratos icone={UtensilsCrossed} titulo={status === "erro" ? "A cozinha não respondeu" : "Cardápio indisponível"} texto={status === "erro" ? "Não foi possível carregar o cardápio. Verifique sua conexão e tente de novo." : "Nenhum prato está disponível no momento. Tente novamente em alguns minutos."} alerta={status === "erro"}>
          <button type="button" onClick={tentarNovamente} className="flex min-h-12 items-center gap-2 rounded-full bg-terracota-escuro px-5 font-bold text-white hover:bg-marrom-escuro"><RefreshCw aria-hidden="true" className="size-5" />Tentar novamente</button>
        </MensagemPratos>}
        {status === "pronto" && pratosFiltrados.length === 0 && <MensagemPratos icone={SearchX} titulo="Nada por aqui" texto={busca.trim() ? `Nenhum prato encontrado para “${busca.trim()}”.` : "Nenhum prato encontrado nesta categoria."}>
          <button type="button" onClick={limparFiltros} className="min-h-12 rounded-full bg-terracota-escuro px-5 font-bold text-white hover:bg-marrom-escuro">Limpar filtros</button>
        </MensagemPratos>}
        {status === "pronto" && pratosOrdenados.length > 0 && <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5">
          {pratosOrdenados.map(prato => <CardCardapio key={prato.id ?? prato.idMeal} prato={prato} quantidade={pratosPedido.find(item => item.id === prato.id)?.quantidade ?? 0} onAbrirDetalhes={setPratoDetalhe} onAlterarQuantidade={onAlterarQuantidade} />)}
        </ul>}
      </section>
      <ModalDetalhesPrato prato={pratoDetalhe} quantidade={pratosPedido.find(item => item.id === pratoDetalhe?.id)?.quantidade ?? 0} onAlterarQuantidade={onAlterarQuantidade} onClose={() => setPratoDetalhe(null)} />
    </main>
  );
}
export default Pratos;
