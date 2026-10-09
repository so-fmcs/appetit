import { createContext, useContext } from "react";

export const PedidoContext = createContext(null);

export function usePedido() {
  const contexto = useContext(PedidoContext);
  if (!contexto) throw new Error("usePedido precisa estar dentro de PedidoProvider");
  return contexto;
}
