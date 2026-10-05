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
      <section className="mx-auto max-w-7xl px-6 py-12">
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
        className="mx-auto max-w-7xl px-6 pb-8"
        aria-label="Buscar e filtrar pratos"
      >
        <label htmlFor="busca" className="mb-2 block text-sm font-semibold">
          Buscar Pratos
        </label>
        <div className="relative max-w-xl">
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-marrom-escuro/60"
          />
          <input
            id="busca"
            type="search"
            placeholder="Ex.: Ratatouille"
            className="w-full rounded-xl border border-bege-areia
             bg-white py-4 text-base pl-10 pr-4 outline-none focus:border-terracota focus:ring-2
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

      <ul className="mx-auto grid max-w-7xl list-none grid-cols-1 gap-6 px-6 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {pratosExemplo.map((prato) => (
          <li key={prato.id}>
            <article
              className="h-full rounded-3xl border border-bege-areia
            bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={prato.imagem}
                alt={prato.nome}
                className="h-56 w-full rounded-2xl object-cover"
              />

              <div className="px-1 pb-1 pt-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-terracota">
                  {prato.categoria}
                </p>

                <h2 className="mt-1 font-titulo text-2xl font-bold uppercase leading-tight text-marrom-escuro">
                  {prato.nome}
                </h2>

                <p className="mt-2 text-lg font-semibold text-marrom-escuro">
                  {prato.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    className="flex-1 rounded-full border
                 border-bege-areia px-4 py-3 text-base font-semibold text-marrom-escuro transition
                  hover:border-terracota hover:text-terracota"
                  >
                    Ver detalhes
                  </button>

                  <button
                    type="button"
                    aria-label={`Adicionar ${prato.nome} ao pedido`}
                    className="flex size-12 items-center justify-center rounded-full bg-terracota
                   text-white transition hover:bg-marrom-escuro"
                  >
                    <Plus aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Pratos;
