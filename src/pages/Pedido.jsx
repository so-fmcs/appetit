import { useRef, useState } from "react";
import { ArrowRight, MapPin, Truck } from "lucide-react";
import EtapaDados from "../components/DadosForm";
import EtapaEntrega from "../components/EtapaEntrega";
import HeaderPedido from "../components/HeaderPedido";
import PratoItem from "../components/PratoItem";
import ModalPratos from "../components/ModalPratos";
import { pratos } from "../data/pratos";
import { taxaEntregaRestaurante } from "../data/restaurante";
import { calcularResumoPedido } from "../utils/calcularResumoPedido";
import "../assets/styles/pedido.css";
import { validarPedido } from "../utils/validarPedido";
import { montarPedido } from "../utils/montarPedido";
import { enviarPedido } from "../services/enviarPedido";

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
  const [pratosPedido, setPratosPedido] = useState(() => pratosExemplo);
  const [tipoRecebimento, setTipoRecebimento] = useState("entrega");
  const [mensagemValidacao, setMensagemValidacao] = useState("");
  const [erros, setErros] = useState({});
  const [tentouConfirmar, setTentouConfirmar] = useState(false);
  const [statusEnvio, setStatusEnvio] = useState("ocioso");
  const [confirmacao, setConfirmacao] = useState(null);
  const formularioRef = useRef(null);
  const modalPratosRef = useRef(null);
  const envioEmAndamento = useRef(false);
  const bloqueado = statusEnvio === "enviando" || statusEnvio === "sucesso";
  const textoConfirmar = statusEnvio === "enviando"
    ? "Enviando pedido…"
    : statusEnvio === "sucesso"
      ? (confirmacao?.simulado ? "Simulação concluída" : "Pedido confirmado")
      : "Confirmar pedido";
  // Valores derivados do pedido: não precisam de outro estado do React.
  const { quantidadeTotal, subtotal, taxaEntrega, total } = calcularResumoPedido(
    pratosPedido,
    tipoRecebimento,
    taxaEntregaRestaurante,
  );
  const retiradaSelecionada = tipoRecebimento === "retirada";
  const descricaoRecebimento = retiradaSelecionada
    ? "Sem taxa de entrega"
    : quantidadeTotal === 0
      ? "Adicione pratos para calcular"
      : `Taxa fixa de ${moeda(taxaEntrega)}`;

  function abrirCardapio() {
    if (bloqueado || modalPratosRef.current.open) return;
    // O diálogo nativo mantém o foco no modal e torna o fundo inativo.
    modalPratosRef.current.showModal();
  }

  function adicionarPrato(id) {
    if (bloqueado) return;
    const prato = pratos.find((item) => item.id === id);
    if (!prato) return;
    setMensagemValidacao("");
    setStatusEnvio("ocioso");
    setPratosPedido((atuais) => {
      // Verifica o estado mais recente para evitar entradas duplicadas.
      const jaSelecionado = atuais.some((item) => item.id === id);
      return jaSelecionado
        ? atuais.map((item) => item.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item,
        )
        : [...atuais, { ...prato, quantidade: 1 }];
    });
  }

  function alterarQuantidade(id, variacao) {
    if (bloqueado) return;
    setMensagemValidacao("");
    setStatusEnvio("ocioso");
    setPratosPedido((atuais) =>
      atuais.map((prato) =>
        prato.id === id
          ? { ...prato, quantidade: Math.max(0, prato.quantidade + variacao) }
          : prato,
      ).filter((prato) => prato.quantidade > 0),
    );
  }

  function removerPrato(id) {
    if (bloqueado) return;
    setMensagemValidacao("");
    setStatusEnvio("ocioso");
    setPratosPedido((atuais) => atuais.filter((prato) => prato.id !== id));
  }

  function lerErros(formulario) {
    // Cada atributo name vira uma chave no objeto de dados.
    const dados = Object.fromEntries(new FormData(formulario));
    return validarPedido(dados);
  }

  function atualizarValidacao(evento) {
    if (bloqueado) return;
    setStatusEnvio("ocioso");
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

  async function confirmarPedido(evento) {
    evento.preventDefault();
    // A ref bloqueia um segundo envio antes mesmo de o React atualizar a tela.
    if (envioEmAndamento.current || statusEnvio === "sucesso") return;
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

    const dados = Object.fromEntries(new FormData(formulario));
    const pedido = montarPedido(dados, pratosPedido);
    if (pedido.itens.length === 0) {
      setMensagemValidacao("Adicione pelo menos um prato antes de confirmar.");
      return;
    }

    // Os dados são lidos antes de desabilitar os campos.
    envioEmAndamento.current = true;
    setStatusEnvio("enviando");
    setMensagemValidacao("Enviando pedido…");

    try {
      const resposta = await enviarPedido(pedido);
      setConfirmacao(resposta);
      setStatusEnvio("sucesso");
      setMensagemValidacao(resposta.simulado
        ? `Simulação concluída. Nenhum pedido foi enviado ao bistrô. Referência: ${resposta.id}`
        : `Pedido confirmado! Número: ${resposta.id}`,
      );
    } catch (erro) {
      setStatusEnvio("erro");
      setMensagemValidacao(erro instanceof Error
        ? erro.message
        : "Não foi possível confirmar o pedido. Tente novamente.",
      );
    } finally {
      envioEmAndamento.current = false;
    }
  }

  function iniciarNovoPedido() {
    formularioRef.current?.reset();
    setPratosPedido(pratosExemplo.map((prato) => ({ ...prato })));
    setTipoRecebimento("entrega");
    setErros({});
    setTentouConfirmar(false);
    setConfirmacao(null);
    setStatusEnvio("ocioso");
    setMensagemValidacao("");
  }

  return (
    <>
    <HeaderPedido />
    
    {/* noValidate permite mostrar nossas mensagens, em vez dos balões do navegador. */}
    <form
      className="pedido-conteudo"
      ref={formularioRef}
      aria-busy={statusEnvio === "enviando"}
      onSubmit={confirmarPedido}
      onChange={atualizarValidacao}
      noValidate
    >
      <fieldset className="pedido-secoes" disabled={bloqueado}>
        <div className="pedido-card prato-container">
          <div className="texto-escolha-pratos">
            <span>01 · VOTRE SÉLECTION</span>
            <h2>Pratos escolhidos</h2>
          </div>
          {pratosPedido.length === 0 && (
            <p className="pedido-selecao-vazia" role="status">
              Seu pedido está vazio. Clique em “Adicionar pratos” para começar.
            </p>
          )}
          {pratosPedido.map((prato) => (
            <div key={prato.id} className="mb-4">
              <PratoItem
                prato={prato}
                quantidade={prato.quantidade}
                onAlterarQuantidade={alterarQuantidade}
                onRemover={removerPrato}
              />
            </div>
          ))}

          <div className="pedido-cardapio__cabecalho">
            <h3>Adicionar ao pedido</h3>
            <button
              className="pedido-cardapio__alternar"
              type="button"
              aria-haspopup="dialog"
              aria-controls="modal-cardapio"
              onClick={abrirCardapio}
            >
              Adicionar pratos
            </button>
          </div>
        </div>

        <EtapaEntrega
          tipoRecebimento={tipoRecebimento}
          onTipoRecebimentoChange={setTipoRecebimento}
          erros={erros}
        />
        <EtapaDados erros={erros} />
      </fieldset>
      <aside className="pedido-card resumo-pedido">
        <p className="resumo-pedido__rotulo">Votre commande</p>
        <div className="resumo-pedido__cabecalho">
          <h2 className="resumo-pedido__titulo">Seu pedido</h2>
          <span className="resumo-pedido__contador">
            {quantidadeTotal} itens
          </span>
        </div>
        <ul className="resumo-pedido__itens">
          {pratosPedido.length === 0 && (
            <li className="resumo-pedido__vazio">Nenhum prato selecionado.</li>
          )}
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
          {retiradaSelecionada ? <MapPin aria-hidden="true" /> : <Truck aria-hidden="true" />}
          <strong>{retiradaSelecionada ? "Retirada no bistrô" : "Entrega"}</strong>
          <span>{descricaoRecebimento}</span>
        </div>
        <div className="resumo-pedido__valores">
          <p><span>Subtotal</span><span>{moeda(subtotal)}</span></p>
          <p><span>Taxa de entrega</span><span>{moeda(taxaEntrega)}</span></p>
        </div>
        <div className="resumo-pedido__total">
          <strong>Total</strong>
          <strong>{moeda(total)}</strong>
        </div>
        <button className="resumo-pedido__botao" type="submit" disabled={bloqueado}>
          <span>{textoConfirmar}</span>
          <span className="resumo-pedido__seta"><ArrowRight aria-hidden="true" /></span>
        </button>
        <div className="resumo-pedido__mobile">
          <div>
            <span>Total · {quantidadeTotal} itens</span>
            <strong>{moeda(total)}</strong>
          </div>
          <button className="resumo-pedido__botao" type="submit" disabled={bloqueado}>
            <span>{statusEnvio === "ocioso" || statusEnvio === "erro" ? "Confirmar" : textoConfirmar}</span>
            <span className="resumo-pedido__seta"><ArrowRight aria-hidden="true" /></span>
          </button>
        </div>
        <p className="resumo-pedido__mensagem" role="status" aria-live="polite">
          {mensagemValidacao}
        </p>
        {statusEnvio === "sucesso" && (
          <button className="resumo-pedido__novo" type="button" onClick={iniciarNovoPedido}>
            Novo pedido
          </button>
        )}
      </aside>
    </form>
    <ModalPratos
      dialogRef={modalPratosRef}
      pratos={pratos}
      pratosPedido={pratosPedido}
      quantidadeTotal={quantidadeTotal}
      onAdicionar={adicionarPrato}
      onAlterarQuantidade={alterarQuantidade}
    />

       </>

);
}

export default Pedido;
