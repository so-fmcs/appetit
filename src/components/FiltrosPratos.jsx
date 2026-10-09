import { Search } from "lucide-react";

function FiltrosPratos({
  busca,
  setBusca,
  categorias,
  categoriaSelecionada,
  setCategoriaSelecionada,
  ordem,
  setOrdem,
  desativado,
}) {
  return (
    <section
      className="mx-auto max-w-7xl px-6 pb-6"
      aria-label="Buscar e filtrar pratos"
    >
      <div className="flex flex-wrap items-end gap-3 border-b border-bege-areia pb-5">
        <div className="min-w-0 flex-[1_1_20rem]">
          <label htmlFor="busca" className="mb-2 block text-base font-bold">
            Buscar pratos
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 size-5.5 -translate-y-1/2 text-marrom-escuro/60"
            />
            <input
              id="busca"
              type="search"
              placeholder="Ex.: Ratatouille"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
              className="h-14 w-full rounded-2xl border border-bege-areia bg-white pl-12 pr-4 text-lg outline-none focus:border-terracota-escuro focus:ring-3 focus:ring-terracota-escuro/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="ordenar" className="mb-2 block text-base font-bold">
            Ordenar por
          </label>
          <select
            id="ordenar"
            value={ordem}
            onChange={(evento) => setOrdem(evento.target.value)}
            className="h-14 rounded-2xl border border-bege-areia bg-white px-4 text-lg outline-none focus:border-terracota-escuro focus:ring-3 focus:ring-terracota-escuro/20"
          >
            <option value="recomendados">Recomendados</option>
            <option value="nome">Nome (A–Z)</option>
          </select>
        </div>

        <div
          className="flex basis-full flex-wrap gap-2 pt-2"
          role="group"
          aria-label="Filtrar pratos por categoria"
        >
          {categorias.map(({ nome, quantidade }) => {
            const selecionada = nome === categoriaSelecionada;
            // A categoria escolhida continua clicável mesmo se a busca a esvaziar.
            const vazia = quantidade === 0 && !selecionada;

            return (
              <button
                key={nome}
                type="button"
                aria-pressed={selecionada}
                disabled={desativado || vazia}
                onClick={() => setCategoriaSelecionada(nome)}
                className={`flex min-h-12 items-center gap-2 rounded-full border px-5 text-base font-medium transition ${
                  selecionada
                    ? "border-marrom-escuro bg-marrom-escuro text-white"
                    : vazia
                      ? "cursor-not-allowed border-bege-areia/60 text-marrom-escuro/45"
                      : "border-bege-areia bg-white hover:border-terracota-escuro disabled:cursor-wait disabled:opacity-60"
                }`}
              >
                {nome}
                {!desativado && (
                  <span
                    className={`min-w-7 rounded-full px-2 text-center text-sm font-bold ${
                      vazia ? "" : "bg-creme text-marrom-escuro"
                    }`}
                  >
                    <span className="sr-only">(</span>
                    {quantidade}
                    <span className="sr-only">
                      {quantidade === 1 ? " prato)" : " pratos)"}
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FiltrosPratos;
