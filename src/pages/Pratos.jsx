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
  "Acompanhamentos",
  "Sobremesas",
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
    imagem: "/ratatouille.jpg",
  },
  {
    id: 3,
    nome: "Lasanha",
    categoria: "Massas",
    preco: 30,
    imagem: "/ratatouille.jpg",
  },
  {
    id: 4,
    nome: "Tarte Tatin",
    categoria: "Sobremesas",
    preco: 25,
    imagem: "/ratatouille.jpg",
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
          Clássicos da cozinha francesa, feitos na hora. Escolha um prato, veja
          os detalhes e monte seu pedido.
        </p>
      </section>

      {/* 2 busca e filtros*/}
      <section aria-label="Buscar e filtrar pratos">
        <div>
          <label htmlFor="busca">Buscar Pratos</label>
          <div>
            <Search aria-hidden="true" />
            <input id="busca" type="search" placeholder="Ex.: Ratatouille" />
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

      {/* 3 lista de pratos */}

      <ul>
        {pratosExemplo.map((prato) => (
          <li key={prato.id}>
            <article>
              <img src={prato.imagem} alt={prato.nome} />
              <p>{prato.categoria}</p>
              <h2>{prato.nome}</h2>
              <p>R$ {prato.preco}</p>
              <div>
                <button type="button">Ver detalhes</button>
                <button
                  type="button"
                  aria-label={`Adicionar ${prato.nome} ao pedido`}
                >
                  <Plus aria-hidden="true" />
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Pratos;
