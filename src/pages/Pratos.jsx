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
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="mb-2 font-titulo text-sm uppercase tracking-[0.2em] text-terracota">
          La carte
        </p>
        <h1 className="font-titulo text-4xl font-bold uppercase text-marrom-escuro">
          Nosso cardápio
        </h1>
        <p className="mt-3 max-w-2xl text-base text-marrom-escuro/80">
          Clássicos da cozinha francesa, feitos na hora. Escolha um prato, veja
          os detalhes e monte seu pedido.
        </p>
      </section>

      {/* 2 busca e filtros*/}
      <section
        className="mx-auto max-w-6xl px-6 pb-8"
        aria-label="Buscar e filtrar pratos"
      >
        <label htmlFor="busca" className="mb-2 block text-sm font-semibold">
          Buscar Pratos
        </label>
        <div className="relative max-w-md">
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-marrom-escuro/60"
          />
          <input
            id="busca"
            type="search"
            placeholder="Ex.: Ratatouille"
            className="w-full rounded-xl border border-bege-areia
             bg-white py-3 pl-10 pr-4 outline-none focus:border-terracota focus:ring-2
              focus:ring-terracota/20"
          />
        </div>

        <div
          className="mt-5 flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrar pratos por categoria"
        >
          {categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              aria-pressed={categoria === "Todos"}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                categoria === "Todos"
                  ? "border-terracota bg-terracota text-white"
                  : "border-bege-areia bg-white hover:border-terracota"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
        <p className="mt-5 text-sm text-marrom-escuro/70" aria-live="polite">
          Mostrando {pratosExemplo.length} pratos
        </p>
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
