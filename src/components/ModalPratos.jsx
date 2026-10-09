import { useState } from "react";
import { X } from "lucide-react";
import PratoItem from "./PratoItem";

function ModalPratos({ dialogRef, pratos, statusCatalogo, onTentarNovamente, pratosPedido, quantidadeTotal, onAdicionar, onAlterarQuantidade }) {
  const [mensagem, setMensagem] = useState("");

  function fechar() {
    dialogRef.current.close();
  }

  function fecharPeloFundo(evento) {
    if (evento.target !== evento.currentTarget) return;
    const limites = evento.currentTarget.getBoundingClientRect();
    // Só fecha fora da janela, sem confundir o espaçamento interno com o fundo.
    if (evento.clientX < limites.left || evento.clientX > limites.right ||
      evento.clientY < limites.top || evento.clientY > limites.bottom) fechar();
  }

  function alterarQuantidade(id, variacao) {
    const prato = pratos.find((item) => item.id === id);
    if (!prato) return;
    const quantidade = pratosPedido.find((item) => item.id === id)?.quantidade ?? 0;
    if (quantidade === 0 && variacao > 0) {
      onAdicionar(id);
    } else {
      onAlterarQuantidade(id, variacao);
    }
    const novaQuantidade = Math.max(0, quantidade + variacao);
    setMensagem(`${prato.nome}: ${novaQuantidade} ${novaQuantidade === 1 ? "unidade" : "unidades"} no pedido.`);
  }

  return (
    <dialog
      id="modal-cardapio"
      className="pedido-modal prato-container"
      ref={dialogRef}
      aria-labelledby="modal-cardapio-titulo"
      aria-describedby="modal-cardapio-descricao"
      onClick={fecharPeloFundo}
      onClose={() => setMensagem("")}
    >
      <div className="pedido-modal__cabecalho">
        <div>
          <h2 id="modal-cardapio-titulo">Adicionar pratos</h2>
          <p id="modal-cardapio-descricao">Escolha os pratos para incluir no seu pedido.</p>
        </div>
        <button
          className="pedido-modal__fechar"
          type="button"
          aria-label="Fechar cardápio"
          onClick={fechar}
        >
          <X aria-hidden="true" />
        </button>
      </div>
      <p className="pedido-modal__aviso" role="status" aria-live="polite">{mensagem}</p>
      {statusCatalogo === "carregando" && (
        <p className="pedido-modal__estado" role="status">Carregando pratos...</p>
      )}
      {(statusCatalogo === "erro" || statusCatalogo === "indisponivel") && (
        <div className="pedido-modal__estado" role={statusCatalogo === "erro" ? "alert" : "status"}>
          <p>
            {statusCatalogo === "erro"
              ? "Não foi possível carregar o cardápio. Verifique sua conexão e tente de novo."
              : "Nenhum prato está disponível no momento."}
          </p>
          <button className="pedido-cardapio__alternar" type="button" onClick={onTentarNovamente}>
            Tentar novamente
          </button>
        </div>
      )}
      <div className="pedido-modal__lista">
        {pratos.map((prato) => (
          <PratoItem
            key={prato.id}
            prato={prato}
            // A quantidade vem do mesmo estado que alimenta o resumo.
            quantidade={pratosPedido.find((item) => item.id === prato.id)?.quantidade ?? 0}
            mostrarQuantidade
            onAlterarQuantidade={alterarQuantidade}
          />
        ))}
      </div>
      <div className="pedido-modal__rodape">
        <span>{quantidadeTotal} {quantidadeTotal === 1 ? "item no pedido" : "itens no pedido"}</span>
        <button className="pedido-cardapio__alternar" type="button" onClick={fechar}>
          Concluir seleção
        </button>
      </div>
    </dialog>
  );
}

export default ModalPratos;
