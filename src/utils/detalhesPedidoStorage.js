const PREFIXO = "appetit-pedido-confirmado:";

// Guarda um retrato do envio: editar o carrinho depois não altera esse pedido.
export function criarDetalhesPedido(pedido, pratos, resposta, valores) {
  return {
    id: String(resposta.id),
    simulado: Boolean(resposta.simulado),
    criadoEm: new Date().toISOString(),
    cliente: { ...pedido.cliente },
    recebimento: { ...pedido.recebimento, endereco: pedido.recebimento.endereco ? { ...pedido.recebimento.endereco } : null },
    observacoes: pedido.observacoes,
    itens: pratos.filter((prato) => prato.quantidade > 0).map((prato) => ({
      id: prato.id, nome: prato.nome, imagem: prato.imagem,
      preco: prato.preco, quantidade: prato.quantidade,
    })),
    valores: { ...valores },
  };
}

export function salvarDetalhesPedido(pedido) {
  try {
    window.sessionStorage.setItem(`${PREFIXO}${pedido.id}`, JSON.stringify(pedido));
  } catch {
    // A navegação também carrega o retrato caso o armazenamento esteja indisponível.
  }
}

export function lerDetalhesPedido(id) {
  try {
    const pedido = JSON.parse(window.sessionStorage.getItem(`${PREFIXO}${id}`) || "null");
    if (pedido?.id !== id || !Array.isArray(pedido.itens) || !pedido.valores || !pedido.cliente || !pedido.recebimento) return null;
    return pedido;
  } catch {
    return null;
  }
}
