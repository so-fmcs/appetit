import { Minus, Plus, Trash2 } from "lucide-react";

function PratoItem({ prato, quantidade, onAlterarQuantidade, onRemover, mostrarQuantidade = false }) {
  return (
    <article className={`prato-item${quantidade > 0 ? " prato-item--selecionado" : ""}`}>
      <img
        src={prato.imagem}
        alt={prato.nome}
        onError={(evento) => {
          evento.currentTarget.onerror = null;
          evento.currentTarget.src = "/ratatouille.jpg";
        }}
      />

      <div className="prato-item__info">
        <h3>{prato.nome}</h3>
        <p>{prato.descricao}</p>
      </div>

      <div className="preco-quantidade">
        <span className="prato-item__preco">
          {prato.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        {quantidade > 0 || mostrarQuantidade ? (
          <>
        <div className="quantidade">
          <button
            type="button"
            aria-label={`Diminuir quantidade de ${prato.nome}`}
            onClick={() => onAlterarQuantidade(prato.id, -1)}
            disabled={quantidade === 0}
          >
            <Minus aria-hidden="true" />
          </button>
          <span aria-live="polite">{quantidade}</span>
          <button
            className="adicao-botao"
            type="button"
            aria-label={`Aumentar quantidade de ${prato.nome}`}
            onClick={() => onAlterarQuantidade(prato.id, 1)}
          >
            <Plus aria-hidden="true" />
          </button>
        </div>
        {onRemover && (
        <button
          className="prato-item__remover"
          type="button"
          onClick={() => onRemover(prato.id)}
          aria-label={`Remover ${prato.nome}`}
        >
          <Trash2 aria-hidden="true" />
        </button>
        )}
          </>
        ) : (
          <button
            className="prato-item__adicionar"
            type="button"
            aria-label={`Adicionar ${prato.nome} ao pedido`}
            onClick={() => onAlterarQuantidade(prato.id, 1)}
          >
            <Plus aria-hidden="true" />
            Adicionar
          </button>
        )}
      </div>
    </article>
  );
}

export default PratoItem;
