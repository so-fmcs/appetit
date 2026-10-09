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

function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function Pratos({ pratosPedido, onAlterarQuantidade }) {
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
      .then(setPratos)
      .catch((erroBusca) => {
        if (erroBusca.name !== "AbortError") setErro(true);
      })
      .finally(() => {
        if (!controlador.signal.aborted) setCarregando(false);
      });

    return () => controlador.abort();
  }, []);

  const pratosFiltrados = pratos.filter((prato) => {
    const correspondeCategoria = categoriaSelecionada === "Todos" ||
      prato.categoria === categoriaSelecionada;
    const correspondeBusca = normalizar(`${prato.nome} ${prato.descricao ?? ""}`)
      .includes(normalizar(busca));
    return correspondeCategoria && correspondeBusca;
  });
  const pratosOrdenados = [...pratosFiltrados];

  if (ordenacao === "menor-preco") {
    pratosOrdenados.sort((a, b) => a.preco - b.preco);
  } else if (ordenacao === "maior-preco") {
    pratosOrdenados.sort((a, b) => b.preco - a.preco);
  } else if (ordenacao === "nome") {
    pratosOrdenados.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  }

  return (
    <main className="pagina-pratos">
      <CabecalhoPratos />
      <div className="pratos-layout">
        <section className="pratos-catalogo" aria-label="Catálogo de pratos">
          <FiltrosPratos
            busca={busca}
            onBuscaChange={setBusca}
            categorias={categoriasCardapio}
            categoriaSelecionada={categoriaSelecionada}
            onCategoriaChange={setCategoriaSelecionada}
            ordenacao={ordenacao}
            onOrdenacaoChange={setOrdenacao}
            quantidade={pratosFiltrados.length}
          />
          {carregando && <p className="pratos-estado" role="status">Carregando pratos...</p>}
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
                key={prato.id}
                prato={prato}
                quantidade={pratosPedido.find((item) => item.id === prato.id)?.quantidade ?? 0}
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

export default Pratos;
