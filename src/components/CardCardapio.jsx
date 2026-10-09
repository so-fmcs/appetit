import { Minus, Plus } from "lucide-react";

function CardCardapio({
  prato,
  quantidade = 0,
  onAbrirDetalhes,
  onAlterarQuantidade,
}) {
  const nome = prato?.nome ?? prato?.strMeal ?? "";
  const descricao = prato?.descricao ?? "";
  const categoria = prato?.categoria ?? prato?.strCategory ?? "";
  const imagem = prato?.imagem ?? prato?.strMealThumb ?? "";
  const preco = prato?.preco != null
    ? Number(prato.preco).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : "";

  return (
    <li>
      <article className="prato-card h-full rounded-3xl border border-bege-areia bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
        <button
          type="button"
          onClick={() => onAbrirDetalhes?.(prato)}
          className="prato-card__imagem-botao"
          aria-label={`Ver detalhes de ${nome}`}
        >
          <img
            src={imagem}
            alt={nome}
            loading="lazy"
            className="prato-card__imagem h-56 w-full rounded-2xl object-cover"
          />
        </button>
        <div className="prato-card__corpo px-1 pb-1 pt-3">
          <button
            type="button"
            onClick={() => onAbrirDetalhes?.(prato)}
            className="prato-card__detalhes"
            aria-label={`Abrir receita de ${nome}`}
          >
            <p className="prato-card__categoria">{categoria}</p>
            <h3 className="prato-card__nome mt-1 font-titulo text-2xl font-bold uppercase leading-tight text-marrom-escuro">
              {nome}
            </h3>
            <p className="prato-card__descricao">{descricao || ""}</p>
          </button>
          <footer className="prato-card__rodape">
            <span className="prato-card__preco">{preco}</span>
            {quantidade === 0 ? (
              <button
                type="button"
                onClick={() => onAlterarQuantidade?.(prato, 1)}
                aria-label={`Adicionar ${nome} ao pedido`}
                className="prato-card__adicionar flex-1 rounded-full border border-bege-areia px-4 py-3 text-base font-semibold text-marrom-escuro transition hover:border-terracota hover:text-terracota"
              >
                <Plus aria-hidden="true" /> Adicionar
              </button>
            ) : (
              <div
                className="prato-card__quantidade"
                role="group"
                aria-label={`Quantidade de ${nome} no pedido`}
              >
                <button
                  type="button"
                  onClick={() => onAlterarQuantidade?.(prato, -1)}
                  aria-label={`Remover uma unidade de ${nome}`}
                  className="prato-card__quantidade-botao"
                >
                  <Minus aria-hidden="true" />
                </button>
                <span aria-live="polite">{quantidade}</span>
                <button
                  type="button"
                  onClick={() => onAlterarQuantidade?.(prato, 1)}
                  aria-label={`Adicionar mais uma unidade de ${nome}`}
                  className="prato-card__quantidade-botao prato-card__quantidade-botao--mais"
                >
                  <Plus aria-hidden="true" />
                </button>
              </div>
            )}
          </footer>
        </div>
      </article>
    </li>
  );
}

export default CardCardapio;
