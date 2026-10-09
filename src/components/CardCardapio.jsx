import { Minus, Plus } from "lucide-react";

function CardCardapio({ prato, quantidade, onAbrirDetalhes, onAlterarQuantidade }) {
  const preco = prato.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <li>
      <article className="prato-card">
        <button
          type="button"
          onClick={() => onAbrirDetalhes(prato)}
          className="prato-card__imagem-botao"
          aria-label={`Ver detalhes de ${prato.nome}`}
        >
          <img
            src={prato.imagem}
            alt={prato.nome}
            loading="lazy"
            className="prato-card__imagem"
          />
        </button>
        <div className="prato-card__corpo">
          <button
            type="button"
            onClick={() => onAbrirDetalhes(prato)}
            className="prato-card__detalhes"
            aria-label={`Abrir receita de ${prato.nome}`}
          >
            <p className="prato-card__categoria">{prato.categoria}</p>
            <h3 className="prato-card__nome">
              {prato.nome}
            </h3>
            <p className="prato-card__descricao">
              {prato.descricao || ""}
            </p>
          </button>
          <footer className="prato-card__rodape">
            <span className="prato-card__preco">{preco}</span>
            {quantidade === 0 ? (
              <button
                type="button"
                onClick={() => onAlterarQuantidade(prato, 1)}
                aria-label={`Adicionar ${prato.nome} ao pedido`}
                className="prato-card__adicionar"
              >
                <Plus aria-hidden="true" /> Adicionar
              </button>
            ) : (
              <div
                className="prato-card__quantidade"
                role="group"
                aria-label={`Quantidade de ${prato.nome} no pedido`}
              >
                <button
                  type="button"
                  onClick={() => onAlterarQuantidade(prato, -1)}
                  aria-label={`Remover uma unidade de ${prato.nome}`}
                  className="prato-card__quantidade-botao"
                >
                  <Minus aria-hidden="true" />
                </button>
                <span aria-live="polite">{quantidade}</span>
                <button
                  type="button"
                  onClick={() => onAlterarQuantidade(prato, 1)}
                  aria-label={`Adicionar mais uma unidade de ${prato.nome}`}
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