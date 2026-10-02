import { criarServicoPedidos } from "./pedidos";

// VITE_API_URL é a URL base; o serviço acrescenta /pedidos.
export const enviarPedido = criarServicoPedidos({
  url: import.meta.env.VITE_API_URL ?? "",
});
