function EtapaDados() {
  return (
    <section className="pedido-card etapa-dados">
      <p className="etapa-dados__rotulo">04 · VOUS</p>
      <h2 className="etapa-dados__titulo">Seus dados</h2>

      <div className="etapa-dados__campos">
        <div className="campo campo--nome">
          <label htmlFor="nome">Nome completo</label>
          <input id="nome" name="nome" autoComplete="name" required />
        </div>

        <div className="campo">
          <label htmlFor="telefone">Telefone / WhatsApp</label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            placeholder="(00) 00000-0000"
            autoComplete="tel"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="email">E-mail (opcional)</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="voce@email.com"
            autoComplete="email"
          />
        </div>

        <div className="campo campo--observacoes">
          <label htmlFor="observacoes">Observações (opcional)</label>
          <textarea
            id="observacoes"
            name="observacoes"
            placeholder="Alergias, restrições ou um recado para a cozinha"
            rows={4}
          />
        </div>
      </div>
    </section>
  );
}

export default EtapaDados;