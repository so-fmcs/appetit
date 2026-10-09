import { useEffect, useState } from "react";
import { PedidoContext } from "./PedidoContext";

const CHAVE = "appetit:pedido";

function lerPedidoSalvo() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    return Array.isArray(salvo) ? salvo : [];
  } catch {
    return [];
  }
}

// Guarda os pratos escolhidos para que Pratos e Pedido vejam o mesmo pedido.
function PedidoProvider({ children }) {
  const [pratosPedido, setPratosPedido] = useState(lerPedidoSalvo);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(pratosPedido));
    } catch {
      // Sem armazenamento (ex.: navegação privada), o pedido vive só na sessão.
    }
  }, [pratosPedido]);

  return (
    <PedidoContext.Provider value={{ pratosPedido, setPratosPedido }}>
      {children}
    </PedidoContext.Provider>
  );
}

export default PedidoProvider;
