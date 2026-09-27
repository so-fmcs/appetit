function ResumoPedido() {
  return (
    <aside className="pedido-card resumo-pedido">
      <p className="resumo-pedido__rotulo">Votre commande</p>
      <h2 className="resumo-pedido__titulo">Seu pedido</h2>

      <ul className="resumo-pedido__itens">
        <li className="resumo-pedido__item">
          <span>1× Ratatouille</span>
          <strong>R$ 48,00</strong>
        </li>
        <li className="resumo-pedido__item">
          <span>1× Gratin dauphinois</span>
          <strong>R$ 36,00</strong>
        </li>
      </ul>

      <div className="resumo-pedido__valores">
        <p>
          <span>Subtotal</span>
          <span>R$ 84,00</span>
        </p>

        <p>
          <span>Entrega</span>
          <span>Calculada pelo CEP</span>
        </p>
      </div>

      <div className="resumo-pedido__total">
        <strong>Total</strong>
        <strong>R$ 84,00</strong>
      </div>

      <button className="resumo-pedido__botao" type="button">
        Confirmar pedido <span aria-hidden="true">→</span>
      </button>
    </aside>
  );
}

export default ResumoPedido;