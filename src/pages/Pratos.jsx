import { Search, Plus } from "lucide-react";

//filtrando as categorias
const categorias = [
  "Todos",
  "Carnes",
  "Massas",
  "Saladas",
  "Vegetarianos",
  "Aves",
  "Peixes",
  "Acompanhamento",
];

//pratos de exemplo, apenas para montar a estrutura (é para vir da API depois)
const pratosExemplo = [
  {
    id: 1,
    nome: "Ratatouille",
    categoria: "Vegetarianos",
    preco: 42,
    imagem: "/ratatouille.jpg",
  },
  {
    id: 2,
    nome: "Coq au Vin",
    categoria: "Aves",
    preco: 35,
    imagem: "frango_grelhado.jpg",
  },
  {
    id: 3,
    nome: "Lasanha",
    categoria: "Massas",
    preco: 30,
    imagem: "lasanha.jpg",
  },
  {
    id: 4,
    nome: "Tarse Tatin",
    categoria: "Sobremesas",
    preco: 25,
    imagem: "tarse_tatin.jpg",
  },
];
function Pratos() {
  return (
    <main>
      {/* 1 cabeçalho da pagina */}
      <section>
        <p>La carte</p>
        <h1>Nosso cardápio</h1>
        <p>
          Classicos da cozinha francesa, feitos na hora. Escolha um prato, veja
          os detalhes e monte seu pedido.
        </p>
      </section>

      {/* 2 busca e filtros*/}
      <section aria-label="Buscar e filtrar pratos">
        <div>
          <label htmlFor="busca">Buscar Pratos</label>
          <div>
            <Search aria-hidden="true" />
            <input id="busca" type="search" placeholder="Ex..: Ratatouille" />
          </div>
        </div>
        <div role="group" aria-label="Filtrar pratos por categoria">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              aria-pressed={categoria === "Todos"}
            >
              {categoria}
            </button>
          ))}
        </div>
        <p aria-live="polite">Mostrando {pratosExemplo.length} pratos</p>
      </section>
    </main>
  );
}

export default Pratos;
