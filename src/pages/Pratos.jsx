import { useEffect, useState } from "react";
import CabecalhoPratos from "../components/CabecalhoPratos";
import CardCardapio from "../components/CardCardapio";
import FiltrosPratos from "../components/FiltrosPratos";

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

function Pratos() {
  const [pratos, setPratos] = useState([]);
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

  const pratosFiltrados = pratos.filter((prato) => {
    const correspondeBusca = prato.strMeal
      .toLowerCase()
      .includes(busca.trim().toLowerCase());
    const correspondeCategoria =
      categoriaSelecionada === "Todos" ||
      categoriasDaApi[categoriaSelecionada].includes(prato.strCategory);

    return correspondeBusca && correspondeCategoria;
  });

  useEffect(() => {
    let ativo = true;

    async function carregarPratos() {
      try {
        const resposta = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?a=France",
        );
        if (!resposta.ok) throw new Error("Falha ao carregar os pratos");
        const dados = await resposta.json();
        const pratosBasicos = dados.meals?.slice(0, 8) ?? [];
        const pratosDetalhados = await Promise.all(
          pratosBasicos.map(async (prato) => {
            try {
              const respostaDetalhes = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${prato.idMeal}`,
              );
              if (!respostaDetalhes.ok) return prato;

              const detalhes = await respostaDetalhes.json();
              return detalhes.meals?.[0] ?? prato;
            } catch {
              return prato;
            }
          }),
        );

        if (ativo) setPratos(pratosDetalhados);
      } catch {
        if (ativo) setErro(true);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarPratos();
    return () => {
      ativo = false;
    };
  }, []);

  return (
    <main>
      <CabecalhoPratos />
      <FiltrosPratos
        busca={busca}
        setBusca={setBusca}
        categorias={["Todos", ...Object.keys(categoriasDaApi)]}
        categoriaSelecionada={categoriaSelecionada}
        setCategoriaSelecionada={setCategoriaSelecionada}
        carregando={carregando}
        erro={erro}
        quantidadeFiltrada={pratosFiltrados.length}
        quantidadeTotal={pratos.length}
      />

      <ul className="mx-auto grid max-w-7xl list-none grid-cols-1 gap-6 px-6 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {pratosFiltrados.map((prato) => (
          <li key={prato.idMeal}>
            <CardCardapio prato={prato} />
          </li>
        ))}
      </ul>
      {!carregando && !erro && pratosFiltrados.length === 0 && (
        <p
          className="mx-auto max-w-7xl px-6 pb-12 text-marrom-escuro/70"
          role="status"
        >
          Nenhum prato encontrado.
        </p>
      )}
    </main>
  );
}

export default Pratos;
