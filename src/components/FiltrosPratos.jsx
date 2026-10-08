import { Search } from "lucide-react";

function FiltrosPratos({
  busca,
  setBusca,
  categorias,
  categoriaSelecionada,
  setCategoriaSelecionada,
  carregando,
  erro,
  quantidadeFiltrada,
  quantidadeTotal,
}) {
  return (
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
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
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
            aria-pressed={categoria === categoriaSelecionada}
            onClick={() => setCategoriaSelecionada(categoria)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              categoria === categoriaSelecionada
                ? "border-terracota bg-terracota text-white"
                : "border-bege-areia bg-white hover:border-terracota"
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>
      <p className="mt-5 text-sm text-marrom-escuro/70" aria-live="polite">
        {carregando
          ? "Carregando pratos..."
          : erro
            ? "Não foi possível carregar os pratos."
            : `Mostrando ${quantidadeFiltrada} de ${quantidadeTotal} pratos`}
      </p>
    </section>
  );
}

export default FiltrosPratos;