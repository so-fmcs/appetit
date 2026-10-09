import { LoaderCircle } from "lucide-react";

function CarregamentoPedido() {
  return (
    <section className="pedido-transicao" role="status" aria-live="polite" aria-label="Abrindo detalhes do pedido">
      <LoaderCircle aria-hidden="true" className="pedido-carregamento__icone" />
      <h2>Abrindo os detalhes do pedido…</h2>
      <p>Você poderá revisar os itens e a forma de recebimento.</p>
    </section>
  );
}

export default CarregamentoPedido;
