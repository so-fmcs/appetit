import { ArrowRight, Minus, Plus, Trash2, Truck } from "lucide-react";
import EtapaDados from "../components/DadosForm";
import EtapaEntrega from "../components/EtapaEntrega";
import HeaderPedido from "../components/HeaderPedido";
import { pratos } from "../data/pratos";
import "../assets/styles/pedido.css";

const pratosExemplo = [
  { ...pratos[0], quantidade: 1 },
  { ...pratos[pratos.length - 1], quantidade: 2 },
];

const quantidadeTotal = pratosExemplo.reduce(
  (total, prato) => total + prato.quantidade,
  0,
);
const subtotal = pratosExemplo.reduce(
  (total, prato) => total + prato.preco * prato.quantidade,
  0,
);

function moeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function Pedido() {
  return (
    <>
    <HeaderPedido />
    
    <div className="pedido-conteudo">
      <div className="pedido-secoes">
        <div className="pedido-card prato-container">
          <div className="texto-escolha-pratos">
            <span>01 · VOTRE SÉLECTION</span>
            <h2>Pratos escolhidos</h2>
          </div>
          {pratosExemplo.map((prato) => (
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

        <EtapaEntrega />
        <EtapaDados />
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
          {pratosExemplo.map((prato) => (
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
        <button className="resumo-pedido__botao" type="button" disabled>
          <span>Confirmar pedido</span>
          <span className="resumo-pedido__seta"><ArrowRight aria-hidden="true" /></span>
        </button>
        <div className="resumo-pedido__mobile">
          <div>
            <span>Total · {quantidadeTotal} itens</span>
            <strong>{moeda(subtotal)}</strong>
          </div>
          <button className="resumo-pedido__botao" type="button" disabled>
            <span>Confirmar</span>
            <span className="resumo-pedido__seta"><ArrowRight aria-hidden="true" /></span>
          </button>
        </div>
      </aside>
    </div>

       </>

);
}

export default Pedido;