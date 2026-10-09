import { Search } from "lucide-react";

function FiltrosPratos({
  busca,
function FiltrosPratos({
  busca,
  onBuscaChange,
  categorias,
  categoriaSelecionada,
  onCategoriaChange,
  ordenacao,
  onOrdenacaoChange,
  quantidade,
  setBusca,
  setCategoriaSelecionada,
  carregando,
  erro,
  quantidadeFiltrada,
  quantidadeTotal,
}) {
  const handleBuscaChange = onBuscaChange ?? setBusca;
  const handleCategoriaChange = onCategoriaChange ?? setCategoriaSelecionada;

  return (
    <section
      className="mx-auto max-w-7xl px-6 pb-8"
      aria-label="Buscar e filtrar pratos"
    >
      <div className="pratos-filtros__linha">
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
            onChange={(evento) => handleBuscaChange(evento.target.value)}
            className="w-full rounded-xl border border-bege-areia bg-white py-4 pl-10 pr-4 text-base outline-none focus:border-terracota focus:ring-2 focus:ring-terracota/20"
          />
        </div>

        {onOrdenacaoChange && ordenacao !== undefined && (
          <label className="pratos-ordenacao">
            <span>Ordenar:</span>
            <select
              aria-label="Ordenar pratos"
              value={ordenacao}
              onChange={(evento) => onOrdenacaoChange(evento.target.value)}
            >
              <option value="destaques">Destaques</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
              <option value="nome">Nome</option>
            </select>
          </label>
        )}
      </div>

        {categorias.map((categoria) => (
          <button
            key={categoria}
            type="button"
            aria-pressed={categoria === categoriaSelecionada}
            onClick={() => handleCategoriaChange(categoria)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              categoria === categoriaSelecionada
                ? "ativo border-terracota bg-terracota text-white"
                : "border-bege-areia bg-white hover:border-terracota"
            }`}

          >
            {categoria}
          </button>
        ))}
      </div>
      {quantidade !== undefined ? (
        <h2 className="pratos-catalogo__titulo">
          <span>Nosso cardápio</span>
          <span className="pratos-catalogo__quantidade" aria-live="polite">
            {quantidade} {quantidade === 1 ? "prato" : "pratos"}
          </span>
        </h2>
      ) : (
        <p className="mt-5 text-sm text-marrom-escuro/70" aria-live="polite">
          {carregando
            ? "Carregando pratos..."
            : erro
              ? "Não foi possível carregar os pratos."
              : `Mostrando ${quantidadeFiltrada} de ${quantidadeTotal} pratos`}
        </p>
      )}

    </section>
  );
}

export default FiltrosPratos;