import { ShoppingBag, Truck } from "lucide-react";
import ErroCampo from "./ErroCampo";
import { enderecoRestaurante } from "../data/restaurante";

function EtapaEntrega({ tipoRecebimento, onTipoRecebimentoChange, erros = {} }) {
  const entregaSelecionada = tipoRecebimento === "entrega";
  return (
    <section className="pedido-card etapa-entrega">
      <p className="etapa-entrega__rotulo">02 · LA LIVRAISON</p>
      <h2 className="etapa-entrega__titulo">Como quer receber?</h2>

      <div
        className="etapa-entrega__opcoes"
        role="group"
        aria-label="Como quer receber"
        aria-describedby={erros["tipo-recebimento"] ? "tipo-recebimento-erro" : undefined}
      >
        <label className="opcao-recebimento">
          <input
            type="radio"
            name="tipo-recebimento"
            value="retirada"
            checked={tipoRecebimento === "retirada"}
            onChange={() => onTipoRecebimentoChange("retirada")}
          />
          <ShoppingBag aria-hidden="true" className="opcao-recebimento__icone" />
          <span className="opcao-recebimento__texto">
            <strong>Retirar no bistrô</strong>
            <span>Sem taxa. Retire direto no balcão.</span>
          </span>
        </label>

        <label className="opcao-recebimento">
          <input
            type="radio"
            name="tipo-recebimento"
            value="entrega"
            checked={tipoRecebimento === "entrega"}
            onChange={() => onTipoRecebimentoChange("entrega")}
            required
          />
          <Truck aria-hidden="true" className="opcao-recebimento__icone" />
          <span className="opcao-recebimento__texto">
            <strong>Entrega</strong>
            <span>Levamos até você. </span>
          </span>
        </label>
      </div>

      <ErroCampo campo="tipo-recebimento" mensagem={erros["tipo-recebimento"]} />

      {/* A retirada mostra o endereço compartilhado com o rodapé. */}
      {tipoRecebimento === "retirada" && (
        <div className="etapa-entrega__retirada" role="status">
          <strong>Endereço para retirada</strong>
          <address>{enderecoRestaurante}</address>
          <p>Retire seu pedido diretamente no balcão, sem taxa de entrega.</p>
        </div>
      )}

      {/* Ocultar preserva os valores caso a pessoa volte para entrega. */}
      <div className="etapa-entrega__endereco" hidden={!entregaSelecionada}>
        <div className="campo campo--cep">
          <label htmlFor="cep">CEP</label>
          <input
            id="cep"
            name="cep"
            disabled={!entregaSelecionada}
            aria-invalid={entregaSelecionada && Boolean(erros.cep)}
            aria-describedby={entregaSelecionada && erros.cep ? "cep-erro" : undefined}
            placeholder="00000-000"
            autoComplete="postal-code"
            inputMode="numeric"
            pattern="\d{5}-?\d{3}"
            title="Informe um CEP válido."
            required={entregaSelecionada}
          />
          <ErroCampo campo="cep" mensagem={entregaSelecionada ? erros.cep : undefined} />
        </div>

        <div className="campo campo--endereco">
          <label htmlFor="endereco">Endereço</label>
          <input
            id="endereco"
            name="endereco"
            disabled={!entregaSelecionada}
            aria-invalid={entregaSelecionada && Boolean(erros.endereco)}
            aria-describedby={entregaSelecionada && erros.endereco ? "endereco-erro" : undefined}
            placeholder="Rua, avenida..."
            autoComplete="street-address"
            required={entregaSelecionada}
          />
          <ErroCampo campo="endereco" mensagem={entregaSelecionada ? erros.endereco : undefined} />
        </div>

        <div className="campo campo--numero">
          <label htmlFor="numero">Número</label>
          <input
            placeholder="Ex.: 120 ou S/N"
            id="numero"
            name="numero"
            disabled={!entregaSelecionada}
            aria-invalid={entregaSelecionada && Boolean(erros.numero)}
            aria-describedby={entregaSelecionada && erros.numero ? "numero-erro" : undefined}
            required={entregaSelecionada}
          />
          <ErroCampo campo="numero" mensagem={entregaSelecionada ? erros.numero : undefined} />
        </div>

        <div className="campo campo--complemento">
          <label htmlFor="complemento">Complemento (opcional)</label>
          <input id="complemento" name="complemento" placeholder="Apto, bloco..." disabled={!entregaSelecionada} />
        </div>

        <div className="campo campo--bairro">
          <label htmlFor="bairro">Bairro</label>
          <input
            placeholder="Seu bairro"
            id="bairro"
            name="bairro"
            disabled={!entregaSelecionada}
            aria-invalid={entregaSelecionada && Boolean(erros.bairro)}
            aria-describedby={entregaSelecionada && erros.bairro ? "bairro-erro" : undefined}
            required={entregaSelecionada}
          />
          <ErroCampo campo="bairro" mensagem={entregaSelecionada ? erros.bairro : undefined} />
        </div>
      </div>
    </section>
  );
}

export default EtapaEntrega;
