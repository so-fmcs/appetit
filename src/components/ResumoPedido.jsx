import { ArrowRight, ChevronDown, Minus, Plus, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";

function moeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function ItensPedido({ pratos, onAlterarQuantidade, mobile = false }) {
  if (pratos.length === 0) {
    return <p className="resumo-pratos__vazio">Seu pedido está vazio. Adicione pratos pelo catálogo.</p>;
  }

  return (
    <ul className={`resumo-pratos__lista${mobile ? " resumo-pratos__lista--mobile" : ""}`}>
      {pratos.map((prato) => (
        <li className="resumo-pratos__item" key={prato.id}>
          <img src={prato.imagem} alt="" loading="lazy" />
          <div className="resumo-pratos__produto">
            <strong>{prato.nome}</strong>
            <span>{prato.quantidade} × {moeda(prato.preco)}</span>
          </div>
          <div className="resumo-pratos__controle" role="group" aria-label={`Quantidade de ${prato.nome}`}>
            <button
              type="button"
              onClick={() => onAlterarQuantidade(prato, -1)}
              aria-label={`Remover uma unidade de ${prato.nome}`}
            >
              <Minus aria-hidden="true" />
            </button>
            <span aria-live="polite">{prato.quantidade}</span>
            <button
              type="button"
              onClick={() => onAlterarQuantidade(prato, 1)}
              aria-label={`Adicionar mais uma unidade de ${prato.nome}`}
            >
              <Plus aria-hidden="true" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function ResumoPedido({ pratos, quantidadeTotal, subtotal, onAlterarQuantidade }) {
  const navigate = useNavigate();
  const desabilitado = quantidadeTotal === 0;

  function continuarPedido() {
    if (!desabilitado) navigate("/pedido");
  }

  function botaoContinuar(mobile = false) {
    return (
      <button
        type="button"
        className={`resumo-pratos__continuar${mobile ? " resumo-pratos__continuar--mobile" : ""}`}
        onClick={continuarPedido}
        disabled={desabilitado}
      >
        Continuar pedido <ArrowRight aria-hidden="true" />
      </button>
    );
  }

  return (
    <>
      <aside className="resumo-pratos resumo-pratos--desktop" aria-labelledby="resumo-pratos-titulo">
        <div className="resumo-pratos__cabecalho">
          <h2 id="resumo-pratos-titulo">Seu pedido</h2>
          <span>{quantidadeTotal} {quantidadeTotal === 1 ? "item" : "itens"}</span>
        </div>
        <ItensPedido pratos={pratos} onAlterarQuantidade={onAlterarQuantidade} />
        <div className="resumo-pratos__subtotal">
          <strong>Subtotal</strong>
          <strong>{moeda(subtotal)}</strong>
        </div>
        <p className="resumo-pratos__entrega">Entrega calculada na próxima etapa.</p>
        {botaoContinuar()}
        <p className="resumo-pratos__nota"><Sprout aria-hidden="true" /> Preparado na hora, com carinho.</p>
      </aside>

      <div className="resumo-pratos-mobile">
        <details className="resumo-pratos-mobile__detalhes">
          <summary>
            <span>
              <strong>Seu pedido · {quantidadeTotal} {quantidadeTotal === 1 ? "item" : "itens"}</strong>
              <span>Subtotal · {moeda(subtotal)}</span>
            </span>
            <ChevronDown aria-hidden="true" />
          </summary>
          <div className="resumo-pratos-mobile__conteudo">
            <ItensPedido
              pratos={pratos}
              onAlterarQuantidade={onAlterarQuantidade}
              mobile
            />
            <p>Entrega calculada na próxima etapa.</p>
            <p className="resumo-pratos__nota"><Sprout aria-hidden="true" /> Preparado na hora, com carinho.</p>
          </div>
        </details>
        {botaoContinuar(true)}
      </div>
    </>
  );
}

export default ResumoPedido;