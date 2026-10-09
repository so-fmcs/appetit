import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import CardCardapio from "../components/CardCardapio";
import CabecalhoPratos from "../components/CabecalhoPratos";
import FiltrosPratos from "../components/FiltrosPratos";
import ModalDetalhesPrato from "../components/ModalDetalhesPrato";
import "../assets/styles/pratos.css";
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
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [pratoDetalhe, setPratoDetalhe] = useState(null);

  useEffect(() => {
    const controlador = new AbortController();

    buscarPratosFranceses(controlador.signal)
      .then((dados) => {
        const itens = Array.isArray(dados) ? dados : dados?.meals ?? [];
        setPratos(itens);
      })
      .catch((erroBusca) => {
        if (erroBusca.name !== "AbortError") setErro(true);
      })
      .finally(() => {
        if (!controlador.signal.aborted) setCarregando(false);
      });

    return () => controlador.abort();
  }, []);

  const pratosFiltrados = pratos.filter((prato) => {
    const nome = prato?.nome ?? prato?.strMeal ?? "";
    const descricao = prato?.descricao ?? prato?.strInstructions ?? "";
    const categoria = prato?.categoria ?? prato?.strCategory ?? "";
    const correspondeCategoria =
      categoriaSelecionada === "Todos" ||
      categoria === categoriaSelecionada ||
      (categoriasDaApi[categoriaSelecionada] ?? []).includes(categoria);
    const correspondeBusca = normalizar(`${nome} ${descricao}`).includes(
      normalizar(busca),
    );
    return correspondeCategoria && correspondeBusca;
  });

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
    <main className="pagina-pratos">
      <CabecalhoPratos />
      <div className="pratos-layout">
        <section className="pratos-catalogo" aria-label="Catálogo de pratos">
          <FiltrosPratos
            busca={busca}
            onBuscaChange={setBusca}
            categorias={[
              "Todos",
              ...new Set([
                ...categoriasCardapio.filter((categoria) => categoria !== "Todos"),
                ...Object.keys(categoriasDaApi),
              ]),
            ]}
            categoriaSelecionada={categoriaSelecionada}
            onCategoriaChange={setCategoriaSelecionada}
            ordenacao={ordenacao}
            onOrdenacaoChange={setOrdenacao}
            quantidade={pratosFiltrados.length}
          />
          {carregando && (
            <p className="pratos-estado" role="status">
              Carregando pratos...
            </p>
          )}
          {erro && (
            <p className="pratos-estado" role="alert">
              Não foi possível carregar os pratos agora. Tente recarregar a página.
            </p>
          )}
          {!carregando && !erro && pratosFiltrados.length === 0 && (
            <p className="pratos-estado" role="status">
              Nenhum prato encontrado com esses filtros.
            </p>
          )}
          <ul className="pratos-grade">
            {pratosOrdenados.map((prato) => (
              <CardCardapio
                key={prato.id ?? prato.idMeal}
                prato={prato}
                quantidade={
                  pratosPedido.find(
                    (item) => (item.id ?? item.idMeal) === (prato.id ?? prato.idMeal),
                  )?.quantidade ?? 0
                }
                onAbrirDetalhes={setPratoDetalhe}
                onAlterarQuantidade={onAlterarQuantidade}
              />
            ))}
          </ul>
        </section>
      </div>
      <ModalDetalhesPrato
        prato={pratoDetalhe}
        onClose={() => setPratoDetalhe(null)}
      />
    </main>
  );
}

    </main>
  );
}

export default Pratos;
