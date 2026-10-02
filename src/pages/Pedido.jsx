import { useState } from "react";
import { ArrowRight, Minus, Plus, Trash2, Truck } from "lucide-react";
import EtapaDados from "../components/DadosForm";
import EtapaEntrega from "../components/EtapaEntrega";
import HeaderPedido from "../components/HeaderPedido";
import { pratos } from "../data/pratos";
import "../assets/styles/pedido.css";
import { validarPedido } from "../utils/validarPedido";

const pratosExemplo = [
  { ...pratos[0], quantidade: 1 },
  { ...pratos[pratos.length - 1], quantidade: 2 },
];

function moeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function Pedido() {
  const pratosPedido = pratosExemplo;
  const [tipoRecebimento, setTipoRecebimento] = useState("entrega");
  const [mensagemValidacao, setMensagemValidacao] = useState("");
  const [erros, setErros] = useState({});
  const [tentouConfirmar, setTentouConfirmar] = useState(false);
  const quantidadeTotal = pratosPedido.reduce(
    (total, prato) => total + prato.quantidade,
    0,
  );
  const subtotal = pratosPedido.reduce(
    (total, prato) => total + prato.preco * prato.quantidade,
    0,
  );

  function lerErros(formulario) {
    // Cada atributo name vira uma chave no objeto de dados.
    const dados = Object.fromEntries(new FormData(formulario));
    return validarPedido(dados);
  }

  function atualizarValidacao(evento) {
    setMensagemValidacao("");
    // Só mostra erros durante a edição depois da primeira tentativa.
    if (evento.target.name === "tipo-recebimento") {
      // Trocar o modo limpa erros de endereço da escolha anterior.
      // A edição seguinte ou o envio valida novamente o novo modo.
      setErros((atuais) => Object.fromEntries(
        Object.entries(atuais).filter(([campo]) =>
          ["nome", "telefone", "email"].includes(campo),
        ),
      ));
      return;
    }
    if (tentouConfirmar) setErros(lerErros(evento.currentTarget));
  }

  function confirmarPedido(evento) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    const novosErros = lerErros(formulario);
    setTentouConfirmar(true);
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      setMensagemValidacao("Revise os campos indicados antes de confirmar.");
      // O foco segue a ordem visual dos campos, inclusive no celular.
      const primeiroInvalido = Array.from(formulario.elements).find(
        (campo) => !campo.disabled && novosErros[campo.name],
      );
      primeiroInvalido?.focus();
      return; // Impede continuar quando há dados inválidos.
    }

    setMensagemValidacao(
      quantidadeTotal > 0
        ? "Dados validados. O pedido ainda não foi enviado."
        : "Adicione pelo menos um prato antes de confirmar.",
    );
  }

  return (
    <>
    <HeaderPedido />
    
    {/* noValidate permite mostrar nossas mensagens, em vez dos balões do navegador. */}
    <form
      className="pedido-conteudo"
      onSubmit={confirmarPedido}
      onChange={atualizarValidacao}
      noValidate
    >
      <div className="pedido-secoes">
        <div className="pedido-card prato-container">
          <div className="texto-escolha-pratos">
            <span>01 · VOTRE SÉLECTION</span>
            <h2>Pratos escolhidos</h2>
          </div>
          {pratosPedido.map((prato) => (
            <div key={prato.id} className="mb-4">
              <article className="prato-item prato-item--selecionado">
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
                  <span className="prato-item__preco">{moeda(prato.preco)}</span>
                  <div className="quantidade">
                    <button type="button" disabled aria-label={`Diminuir ${prato.nome}`}>
                      <Minus aria-hidden="true" />
                    </button>
                    <span>{prato.quantidade}</span>
                    <button type="button" disabled aria-label={`Aumentar ${prato.nome}`}>
                      <Plus aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    className="prato-item__remover"
                    type="button"
                    disabled
                    aria-label={`Remover ${prato.nome}`}
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>

        <EtapaEntrega
          tipoRecebimento={tipoRecebimento}
          onTipoRecebimentoChange={setTipoRecebimento}
          erros={erros}
        />
        <EtapaDados erros={erros} />
      </div>
      <aside className="pedido-card resumo-pedido">
        <p className="resumo-pedido__rotulo">Votre commande</p>
        <div className="resumo-pedido__cabecalho">
          <h2 className="resumo-pedido__titulo">Seu pedido</h2>
          <span className="resumo-pedido__contador">
            {quantidadeTotal} itens
          </span>
        </div>
        <ul className="resumo-pedido__itens">
          {pratosPedido.map((prato) => (
            <li className="resumo-pedido__item" key={prato.id}>
              <div className="resumo-pedido__produto">
                <div className="resumo-pedido__imagem-wrap">
                  <img
                    src={prato.imagem}
                    alt=""
                    onError={(evento) => {
                      evento.currentTarget.onerror = null;
                      evento.currentTarget.src = "/ratatouille.jpg";
                    }}
                  />
                  <span>{prato.quantidade}</span>
                </div>
                <div className="resumo-pedido__descricao">
                  <strong>{prato.nome}</strong>
                  <span>{moeda(prato.preco)} cada</span>
                </div>
              </div>
              <strong>{moeda(prato.preco * prato.quantidade)}</strong>
            </li>
          ))}
        </ul>
        <div className="resumo-pedido__entrega">
          <Truck aria-hidden="true" />
          <strong>Entrega</strong>
          <span>Calculada pelo CEP</span>
        </div>
        <div className="resumo-pedido__valores">
          <p><span>Subtotal</span><span>{moeda(subtotal)}</span></p>
          <p><span>Entrega</span><span>Calculada pelo CEP</span></p>
        </div>
        <div className="resumo-pedido__total">
          <strong>Total</strong>
          <strong>{moeda(subtotal)}</strong>
        </div>
        <button className="resumo-pedido__botao" type="submit">
          <span>Confirmar pedido</span>
          <span className="resumo-pedido__seta"><ArrowRight aria-hidden="true" /></span>
        </button>
        <div className="resumo-pedido__mobile">
          <div>
            <span>Total · {quantidadeTotal} itens</span>
            <strong>{moeda(subtotal)}</strong>
          </div>
          <button className="resumo-pedido__botao" type="submit">
            <span>Confirmar</span>
            <span className="resumo-pedido__seta"><ArrowRight aria-hidden="true" /></span>
          </button>
        </div>
        <p className="resumo-pedido__mensagem" role="status" aria-live="polite">
          {mensagemValidacao}
        </p>
      </aside>
    </form>

       </>

);
}

export default Pedido;
