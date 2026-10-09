import { Search } from "lucide-react";

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
  ordem,
  setOrdem,
  desativado,
}) {
  const handleBuscaChange = onBuscaChange ?? setBusca;
  const handleCategoriaChange = onCategoriaChange ?? setCategoriaSelecionada;

  return (
    <section
      className="mx-auto largura-site px-6 pb-6"
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

      {/* Mantém os filtros agrupados e fecha o container já existente abaixo. */}
      <div className="pratos-categorias">
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
