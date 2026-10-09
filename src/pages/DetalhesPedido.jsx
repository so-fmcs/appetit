import { ArrowLeft, CircleCheck, MapPin, ShoppingBag, Truck } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { enderecoRestaurante } from "../data/restaurante";
import { lerDetalhesPedido } from "../utils/detalhesPedidoStorage";
import "../assets/styles/pedido.css";
import "../assets/styles/finalizacao.css";

const moeda = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function DetalhesPedido() {
  const { pedidoId } = useParams();
  const location = useLocation();
  const pedido = location.state?.pedido?.id === pedidoId
    ? location.state.pedido : lerDetalhesPedido(pedidoId);

  if (!pedido) {
    return (
      <main className="pagina-pedido">
        <div className="app-container texto-header-pedido">
          <span>Commande</span><h1>Pedido indisponível</h1>
          <p>Não encontramos os detalhes deste pedido nesta sessão.</p>
          <Link to="/pratos" className="pedido-detalhes__acao">Voltar ao cardápio</Link>
        </div>
      </main>
    );
  }

  const retirada = pedido.recebimento.tipo === "retirada";
  const endereco = pedido.recebimento.endereco;
  const data = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(pedido.criadoEm));

  return (
    <main className="pagina-pedido pedido-detalhes">
      <div className="app-container texto-header-pedido">
        <Link to="/pratos" className="texto-header-pedido__voltar"><ArrowLeft aria-hidden="true" /> Voltar ao cardápio</Link>
        <span>Commande</span><h1>Detalhes do pedido</h1>
        <p>Registrado em {data}</p>
      </div>
      <div className="pedido-conteudo">
        <div className="pedido-secoes">
          <section className={`pedido-card pedido-detalhes__confirmacao${pedido.simulado ? " pedido-detalhes__confirmacao--simulada" : ""}`}>
            <CircleCheck aria-hidden="true" />
            <div>
              <h2>{pedido.simulado ? "Simulação concluída" : "Pedido confirmado"}</h2>
              <p>{pedido.simulado ? "Este pedido é uma demonstração e não foi enviado ao bistrô." : "Seu pedido foi enviado com sucesso. Confira os detalhes abaixo."}</p>
              <p className="pedido-detalhes__referencia">Referência: <strong>{pedido.id}</strong></p>
            </div>
          </section>
          <section className="pedido-card">
            <h2 className="pedido-detalhes__titulo">Pratos do pedido</h2>
            <ul className="pedido-detalhes__itens">
              {pedido.itens.map((item) => (
                <li key={item.id}>
                  <img src={item.imagem} alt="" onError={(evento) => { evento.currentTarget.onerror = null; evento.currentTarget.src = "/ratatouille.jpg"; }} />
                  <div><strong>{item.nome}</strong><span>{item.quantidade} × {moeda(item.preco)}</span></div>
                  <strong>{moeda(item.preco * item.quantidade)}</strong>
                </li>
              ))}
            </ul>
          </section>
          <section className="pedido-card">
            <h2 className="pedido-detalhes__titulo">{retirada ? <ShoppingBag aria-hidden="true" /> : <Truck aria-hidden="true" />}{retirada ? "Retirada no bistrô" : "Entrega"}</h2>
            <address className="pedido-detalhes__endereco">
              <MapPin aria-hidden="true" />
              <div>{retirada ? enderecoRestaurante : <>
                <strong>{endereco.logradouro}, {endereco.numero}</strong>
                <span>{endereco.bairro} · CEP {endereco.cep.replace(/(\d{5})(\d{3})/, "$1-$2")}</span>
                {endereco.complemento && <span>{endereco.complemento}</span>}
              </>}</div>
            </address>
          </section>
          <section className="pedido-card">
            <h2 className="pedido-detalhes__titulo">Seus dados</h2>
            <dl className="pedido-detalhes__dados">
              <div><dt>Nome</dt><dd>{pedido.cliente.nome}</dd></div>
              <div><dt>Telefone / WhatsApp</dt><dd>{pedido.cliente.telefone}</dd></div>
              {pedido.cliente.email && <div><dt>E-mail</dt><dd>{pedido.cliente.email}</dd></div>}
            </dl>
            {pedido.observacoes && <div className="pedido-detalhes__observacoes"><strong>Observações</strong><p>{pedido.observacoes}</p></div>}
          </section>
        </div>
        <aside className="pedido-card pedido-detalhes__resumo">
          <h2 className="pedido-detalhes__titulo">Resumo do pedido</h2>
          <p>{pedido.valores.quantidadeTotal} {pedido.valores.quantidadeTotal === 1 ? "item" : "itens"}</p>
          <div className="pedido-detalhes__valores">
            <p><span>Subtotal</span><strong>{moeda(pedido.valores.subtotal)}</strong></p>
            <p><span>{retirada ? "Retirada" : "Taxa de entrega"}</span><strong>{retirada ? "Sem taxa" : moeda(pedido.valores.taxaEntrega)}</strong></p>
            <p className="pedido-detalhes__total"><strong>Total</strong><strong>{moeda(pedido.valores.total)}</strong></p>
          </div>
          <Link className="pedido-detalhes__acao" to="/pratos">Fazer outro pedido</Link>
        </aside>
      </div>
    </main>
  );
}

export default DetalhesPedido;
