function EtapaEntrega() {
  return (
    <section className="pedido-card etapa-entrega">
      <p className="etapa-entrega__rotulo">02 · LA LIVRAISON</p>
      <h2 className="etapa-entrega__titulo">Como quer receber</h2>

      <div className="etapa-entrega__opcoes">
        <label className="opcao-recebimento">
          <input
            type="radio"
            name="tipo-recebimento"
            value="retirada"
          />
          <span className="opcao-recebimento__texto">
            <strong>Retirar no bistrô</strong>
            <span>Sem taxa. Fica pronto no horário que você escolher.</span>
          </span>
        </label>

        <label className="opcao-recebimento">
          <input
            type="radio"
            name="tipo-recebimento"
            value="entrega"
            defaultChecked
          />
          <span className="opcao-recebimento__texto">
            <strong>Entrega</strong>
            <span>Levamos até você. Taxa calculada pelo CEP.</span>
          </span>
        </label>
      </div>

      <div className="etapa-entrega__endereco">
        <div className="campo campo--cep">
          <label htmlFor="cep">CEP</label>
          <input id="cep" name="cep" placeholder="00000-000" />
        </div>

        <div className="campo campo--endereco">
          <label htmlFor="endereco">Endereço</label>
          <input id="endereco" name="endereco" placeholder="Rua, avenida..." />
        </div>

        <div className="campo">
          <label htmlFor="numero">Número</label>
          <input id="numero" name="numero" />
        </div>

        <div className="campo">
          <label htmlFor="complemento">Complemento (opcional)</label>
          <input id="complemento" name="complemento" placeholder="Apto, bloco..." />
        </div>

        <div className="campo">
          <label htmlFor="bairro">Bairro</label>
          <input id="bairro" name="bairro" />
        </div>
      </div>
    </section>
  );
}

export default EtapaEntrega;