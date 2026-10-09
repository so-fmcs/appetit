import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function HeaderPedido() {
  return (
    <div className="app-container texto-header-pedido">
      <Link to="/pratos" className="texto-header-pedido__voltar"><ArrowLeft aria-hidden="true" /> Voltar ao cardápio</Link>
      <span>Commande</span>
      <h1>Finalize seu pedido</h1>
      <p>Revise os pratos e escolha como receber.</p>
    </div>
  );
}

export default HeaderPedido;
