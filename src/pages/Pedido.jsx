import EtapaDados from "../components/DadosForm";
import EtapaEntrega from "../components/EtapaEntrega";
import HeaderPedido from "../components/HeaderPedido";
import PratoItem from "../components/PratoItem";
import ResumoPedido from "../components/ResumoPedido";
import { pratos } from "../data/pratos";
import "../assets/styles/pedido.css";

function Pedido() {
  return (
    <>
    <HeaderPedido />
    
    <div className="pedido-conteudo">
      <div className="pedido-secoes">
        <div className="pedido-card prato-container">
          <div className="texto-escolha-pratos">
            <span>01 · LES PLATS</span>
            <h2>Escolha os pratos</h2>
          </div>
          {pratos.map((prato) => (
            <div key={prato.id} className="mb-4">
              <PratoItem prato={prato} />
            </div>
          ))}
        </div>

        <EtapaEntrega />
        <EtapaDados />
      </div>
      <ResumoPedido />
    </div>

       </>

);
}

export default Pedido;