import ErroCampo from "./ErroCampo";

function EtapaDados({ erros = {} }) {
  return (
    <section className="pedido-card etapa-dados">
      <p className="etapa-dados__rotulo">03 · VOUS</p>
      <h2 className="etapa-dados__titulo">Seus dados</h2>

      <div className="etapa-dados__campos">
        <div className="campo campo--nome">
          <label htmlFor="nome">Nome completo</label>
          <input
            placeholder="Como podemos chamar você?"
            id="nome"
            name="nome"
            aria-invalid={Boolean(erros.nome)}
            aria-describedby={erros.nome ? "nome-erro" : undefined}
            autoComplete="name"
            minLength={3}
            required
          />
          <ErroCampo campo="nome" mensagem={erros.nome} />
        </div>

        <div className="campo">
          <label htmlFor="telefone">Telefone / WhatsApp</label>
          <input
            id="telefone"
            name="telefone"
            aria-invalid={Boolean(erros.telefone)}
            aria-describedby={erros.telefone ? "telefone-erro" : undefined}
            type="tel"
            placeholder="(00) 00000-0000"
            autoComplete="tel"
            pattern="\(?\d{2}\)?\s?9?\d{4}-?\d{4}"
            title="Informe um telefone válido, com DDD."
            required
          />
          <ErroCampo campo="telefone" mensagem={erros.telefone} />
        </div>

        <div className="campo">
          <label htmlFor="email">E-mail (opcional)</label>
          <input
            id="email"
            name="email"
            aria-invalid={Boolean(erros.email)}
            aria-describedby={erros.email ? "email-erro" : undefined}
            type="email"
            placeholder="voce@email.com"
            autoComplete="email"
          />
          <ErroCampo campo="email" mensagem={erros.email} />
        </div>

        <div className="campo campo--observacoes">
          <label htmlFor="observacoes">Observações (opcional)</label>
          <textarea
            id="observacoes"
            name="observacoes"
            placeholder="Alergias, restrições ou um recado para a cozinha"
            rows={3}
          />
        </div>
      </div>
    </section>
  );
}

export default EtapaDados;
