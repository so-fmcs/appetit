import EtapaDados from "../components/DadosForm";
import EtapaEntrega from "../components/EtapaEntrega";
import HeaderPedido from "../components/HeaderPedido";
import PratoItem from "../components/PratoItem";
import ResumoPedido from "../components/ResumoPedido";
import { pratos } from "../data/pratos";

function Pedido() {
  return (
    <>
    <HeaderPedido />

      {pratos.map((prato) => (
        <div key={prato.id} className="mb-4">
          <PratoItem prato={prato} />
        </div>
      ))}

    <ResumoPedido />

    <EtapaEntrega /> 

    <EtapaDados />


       </>

);
}

export default Pedido;