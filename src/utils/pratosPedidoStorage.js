const CHAVE_PRATOS_PEDIDO = "appetit-pratos-api";

export function lerPratosPedidoSalvos() {
  try {
    const salvos = JSON.parse(window.localStorage.getItem(CHAVE_PRATOS_PEDIDO) || "[]");
    return Array.isArray(salvos) ? salvos : [];
  } catch {
    return [];
  }
}

export function salvarPratosPedido(pratos) {
  try {
    window.localStorage.setItem(CHAVE_PRATOS_PEDIDO, JSON.stringify(pratos));
  } catch {
    // O pedido continua disponível na sessão mesmo sem acesso ao armazenamento.
  }
}