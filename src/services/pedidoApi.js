import { buscarPedido, normalizarPedido } from "./pedidos.js";

// Mantém o contrato do PR reutilizando transporte, validação e timeout comuns.
export const converterPedidoApi = normalizarPedido;
export function buscarPedidoApi(id, signal, fetchImpl = globalThis.fetch) {
  return buscarPedido(id, { signal, fetchImpl, url: import.meta.env?.VITE_API_URL || "/api" });
}
