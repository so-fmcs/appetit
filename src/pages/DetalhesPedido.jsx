import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChefHat, CircleCheck, Clock, Copy, MapPin, Phone, ShoppingBag, Truck } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { enderecoRestaurante } from "../data/restaurante";
import { buscarPedidoApi } from "../services/pedidoApi";
import { lerDetalhesPedido, salvarDetalhesPedido } from "../utils/detalhesPedidoStorage";
import "../assets/styles/acompanhamento.css";

const moeda = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const textosStatus = {
  CONFIRMADO: { titulo: "Pedido confirmado", descricao: "Seu pedido foi recebido pelo bistrô.", etapa: 0 },
  EM_PREPARO: { titulo: "Pedido em preparo", descricao: "A cozinha está preparando seu pedido.", etapa: 1 },
  PRONTO_PARA_RETIRADA: { titulo: "Pronto para retirada", descricao: "Seu pedido está pronto para retirada no bistrô.", etapa: 2 },
  SAIU_PARA_ENTREGA: { titulo: "Saiu para entrega", descricao: "Seu pedido saiu para entrega.", etapa: 2 },
  CONCLUIDO: { titulo: "Pedido concluído", descricao: "Seu pedido foi finalizado.", etapa: 3 },
  CANCELADO: { titulo: "Pedido cancelado", descricao: "Este pedido foi cancelado.", etapa: -1 },
};

function DetalhesPedido() {
  const { pedidoId } = useParams();
  return <ConteudoPedido key={pedidoId} pedidoId={pedidoId} />;
}

function ConteudoPedido({ pedidoId }) {
  const location = useLocation();
  const [mensagemCopia, setMensagemCopia] = useState("");
  const pedidoInicial = location.state?.pedido?.id === pedidoId
    ? location.state.pedido : lerDetalhesPedido(pedidoId);
  const [pedido, setPedido] = useState(pedidoInicial);
  const [consulta, setConsulta] = useState(pedidoInicial || pedidoId?.startsWith("SIM-") ? "pronto" : "carregando");

  useEffect(() => {
    if (pedidoId?.startsWith("SIM-")) return;

    const controller = new AbortController();
    let ativo = true;
    let consultando = false;
    async function atualizar() {
      if (consultando) return;
      consultando = true;
      try {
        const atualizado = await buscarPedidoApi(pedidoId, controller.signal);
        if (!ativo) return;
        setPedido(atualizado);
        setConsulta("pronto");
        salvarDetalhesPedido(atualizado);
      } catch {
        if (ativo && !controller.signal.aborted) setConsulta("erro");
      } finally {
        consultando = false;
      }
    }

    atualizar();
    const intervalo = window.setInterval(() => {
      if (document.visibilityState === "visible") atualizar();
    }, 10000);
    return () => {
      ativo = false;
      controller.abort();
      window.clearInterval(intervalo);
    };
  }, [pedidoId]);

  async function copiarReferencia() {
    try {
      await navigator.clipboard.writeText(pedido.id);
      setMensagemCopia("Referência copiada.");
    } catch {
      setMensagemCopia("Não foi possível copiar. Selecione a referência acima.");
    }
  }

  if (!pedido) return (
    <main className="acompanhamento app-container">
      <span className="acompanhamento__rotulo">Commande</span>
      <h1>{consulta === "carregando" ? "Carregando pedido…" : "Pedido indisponível"}</h1>
      <p>{consulta === "carregando" ? "Consultando os detalhes do pedido." : "Não foi possível consultar este pedido no momento."}</p>
      <Link to="/pratos" className="acompanhamento__botao">Voltar ao cardápio <ArrowRight aria-hidden="true" /></Link>
    </main>
  );

  const retirada = pedido.recebimento.tipo === "retirada";
  const endereco = pedido.recebimento.endereco;
  const dataPedido = pedido.criadoEm ? new Date(pedido.criadoEm) : null;
  const data = dataPedido && !Number.isNaN(dataPedido.getTime())
    ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(dataPedido)
    : null;
  const statusAtual = textosStatus[pedido.status] || textosStatus.CONFIRMADO;
  const etapas = [
    { nome: "Confirmado", Icone: CircleCheck },
    { nome: "Em preparo", Icone: ChefHat },
    { nome: retirada ? "Pronto para retirada" : "Saiu para entrega", Icone: retirada ? ShoppingBag : Truck },
    { nome: retirada ? "Retirado" : "Entregue", Icone: Check },
  ];

  return (
    <main className="acompanhamento app-container">
      <Link to="/pratos" className="acompanhamento__voltar"><ArrowLeft aria-hidden="true" /> Voltar ao cardápio</Link>
      <header className="acompanhamento__cabecalho">
        <div><span className="acompanhamento__rotulo">Merci beaucoup</span><h1>Acompanhe seu pedido</h1><p>Confira a confirmação e os detalhes do seu pedido.</p></div>
        <div className="acompanhamento__referencia"><span>Referência do pedido</span><div><strong>{pedido.id}</strong><button type="button" onClick={copiarReferencia} aria-label="Copiar referência do pedido"><Copy aria-hidden="true" /></button></div><small>{data ? `Registrado em ${data}` : "Data do registro não disponível"}</small><span className="acompanhamento__copia" role="status">{mensagemCopia}</span></div>
      </header>

      <section className="acompanhamento__card acompanhamento__status" aria-labelledby="status-pedido">
        <div className="acompanhamento__status-topo">
          <div className="acompanhamento__situacao"><span className="acompanhamento__icone"><CircleCheck aria-hidden="true" /></span><div><span className="acompanhamento__rotulo">{pedido.simulado ? "Demonstração" : "Andamento do pedido"}</span><h2 id="status-pedido">{pedido.simulado ? "Simulação concluída" : statusAtual.titulo}</h2><p>{pedido.simulado ? "Este pedido é uma demonstração e não foi enviado ao bistrô." : statusAtual.descricao}</p></div></div>
          <div className="acompanhamento__previsao"><Clock aria-hidden="true" /><div><span>{retirada ? "Previsão de retirada" : "Previsão de entrega"}</span><strong>{pedido.simulado ? "Não se aplica" : pedido.status === "CANCELADO" ? "Cancelado" : pedido.status === "CONCLUIDO" ? "Concluído" : "Ainda não informada"}</strong></div></div>
        </div>
        <ol className="acompanhamento__etapas" aria-label="Etapas do pedido">{etapas.map(({ nome, Icone }, indice) => (
          <li key={nome}
            className={!pedido.simulado && indice === statusAtual.etapa ? "etapa--atual" : ""}
            aria-current={!pedido.simulado && indice === statusAtual.etapa ? "step" : undefined}>
            <span className="acompanhamento__etapa-icone"><Icone aria-hidden="true" /></span>
            <strong>{nome}</strong>
            <span>{pedido.simulado ? "Não iniciado" : pedido.status === "CANCELADO" ? "Interrompido"
              : indice < statusAtual.etapa ? "Concluído" : indice === statusAtual.etapa ? "Etapa atual" : "Aguardando"}</span>
          </li>
        ))}</ol>
        <p className="acompanhamento__nota">
          As etapas acima mostram o fluxo de um pedido real.
          {!pedido.simulado && consulta === "erro" && " Mostrando o último estado disponível. Não foi possível atualizar agora."}
        </p>
      </section>

      <div className="acompanhamento__colunas">
        <section className="acompanhamento__card" aria-labelledby="itens-pedido"><div className="acompanhamento__titulo"><h2 id="itens-pedido">Seu pedido</h2><span className="acompanhamento__badge">{pedido.valores.quantidadeTotal} {pedido.valores.quantidadeTotal === 1 ? "item" : "itens"}</span></div>
          <ul className="acompanhamento__itens">{pedido.itens.map(item => <li key={item.id}><img src={item.imagem} alt="" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "/ratatouille.jpg"; }} /><div><strong>{item.nome}</strong><span>{item.quantidade} × {moeda(item.preco)}</span></div><strong>{moeda(item.preco * item.quantidade)}</strong></li>)}</ul>
          <dl className="acompanhamento__valores"><div><dt>Subtotal</dt><dd>{moeda(pedido.valores.subtotal)}</dd></div><div><dt>{retirada ? "Retirada no bistrô" : "Taxa de entrega"}</dt><dd>{retirada ? "Sem taxa" : moeda(pedido.valores.taxaEntrega)}</dd></div><div className="acompanhamento__total"><dt>Total do pedido</dt><dd>{moeda(pedido.valores.total)}</dd></div></dl>
          {pedido.observacoes && <div className="acompanhamento__observacoes"><h3>Observações para a cozinha</h3><p>{pedido.observacoes}</p></div>}
        </section>
        <div className="acompanhamento__lateral">
          <section className="acompanhamento__card"><h2 className="acompanhamento__titulo-icone">{retirada ? <ShoppingBag aria-hidden="true" /> : <Truck aria-hidden="true" />}{retirada ? "Retirada no bistrô" : "Dados da entrega"}</h2>
            <address className="acompanhamento__endereco"><MapPin aria-hidden="true" /><div>{retirada ? <strong>{enderecoRestaurante}</strong> : <><strong>{endereco.logradouro}, {endereco.numero}</strong><span>{endereco.bairro} · CEP {endereco.cep.replace(/(\d{5})(\d{3})/, "$1-$2")}</span>{endereco.complemento && <span>{endereco.complemento}</span>}</>}</div></address>
            <dl className="acompanhamento__cliente"><div><dt>Pedido em nome de</dt><dd>{pedido.cliente.nome}</dd></div><div><dt>Telefone / WhatsApp</dt><dd>{pedido.cliente.telefone}</dd></div>{pedido.cliente.email && <div><dt>E-mail</dt><dd>{pedido.cliente.email}</dd></div>}</dl>
          </section>
          <section className="acompanhamento__card acompanhamento__ajuda"><span className="acompanhamento__rotulo">Estamos por aqui</span><h2>Precisa de ajuda?</h2><p>Tenha a referência do pedido em mãos ao entrar em contato.</p><a className="acompanhamento__contato" href="tel:+555533330000"><Phone aria-hidden="true" /> Falar com o bistrô <ArrowRight aria-hidden="true" /></a><small>Mesmo telefone informado no rodapé.</small></section>
          <Link className="acompanhamento__novo" to="/pratos">Fazer outro pedido <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </main>
  );
}
export default DetalhesPedido;
