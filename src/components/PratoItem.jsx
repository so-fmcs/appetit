import { Minus, Plus, Trash2 } from "lucide-react";

function PratoItem({ prato, quantidade, onAlterarQuantidade, onRemover, mostrarQuantidade = false, compacto = false }) {
  const descricao = prato.descricao?.replace(/\s+/g, " ").trim() ?? "";
  const descricaoResumida = descricao.length > 140
    ? `${descricao.slice(0, 137).trimEnd()}...`
    : descricao;

  const moeda = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <article className={`prato-item${quantidade > 0 ? " prato-item--selecionado" : ""}${compacto ? " prato-item--compacto" : ""}`}>
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
        <p>{compacto ? `${moeda(prato.preco)} cada` : descricaoResumida}</p>
      </div>

      <div className="preco-quantidade">
        <span className="prato-item__preco">
          {/* Na revisão, mostra o valor da linha; o preço unitário fica sob o nome. */}
          {moeda(compacto ? prato.preco * quantidade : prato.preco)}
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
