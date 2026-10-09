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
}) {
  return (
    <section className="pratos-filtros" aria-label="Buscar e filtrar pratos">
      <div className="pratos-filtros__linha">
        <label className="pratos-busca" htmlFor="busca-pratos">
          <Search aria-hidden="true" className="pratos-busca__icone" />
          <span className="sr-only">Buscar um prato</span>
          <input
            id="busca-pratos"
            type="search"
            value={busca}
            onChange={(evento) => onBuscaChange(evento.target.value)}
            placeholder="Buscar um prato..."
          />
        </label>

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
      </div>

      <div className="pratos-categorias" role="group" aria-label="Filtrar pratos por categoria">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            type="button"
            aria-pressed={categoria === categoriaSelecionada}
            onClick={() => onCategoriaChange(categoria)}
            className={categoria === categoriaSelecionada ? "ativo" : ""}
          >
            {categoria}
          </button>
        ))}
      </div>
      <h2 className="pratos-catalogo__titulo">
        <span>Nosso cardápio</span>
        <span className="pratos-catalogo__quantidade" aria-live="polite">
          {quantidade} {quantidade === 1 ? "prato" : "pratos"}
        </span>
      </h2>
    </section>
  );
}

export default FiltrosPratos;