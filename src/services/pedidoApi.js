const API_URL = (import.meta.env?.VITE_API_URL?.trim() || "/api").replace(/\/+$/, "");

export function converterPedidoApi(dados) {
  if (!dados?.id || !dados?.cliente || !dados?.recebimento || !Array.isArray(dados.itens)) {
    throw new Error("O pedido recebido é inválido.");
  }

  const itens = dados.itens.map((item) => {
    if (!item?.pratoId || !Number.isInteger(item.quantidade) || item.quantidade <= 0
      || !Number.isInteger(item.precoUnitarioCentavos) || item.precoUnitarioCentavos < 0) {
      throw new Error("Os itens do pedido recebido são inválidos.");
    }
    return {
      id: item.pratoId,
      nome: item.nomePrato,
      imagem: item.imagemUrl || "/ratatouille.jpg",
      quantidade: item.quantidade,
      preco: item.precoUnitarioCentavos / 100,
    };
  });

  const valoresCentavos = [dados.subtotalCentavos, dados.taxaEntregaCentavos, dados.totalCentavos];
  if (valoresCentavos.some((valor) => !Number.isInteger(valor) || valor < 0)) {
    throw new Error("Os valores do pedido recebido são inválidos.");
  }

  return {
    id: dados.id,
    status: dados.status,
    simulado: false,
    criadoEm: dados.criadoEm,
    cliente: dados.cliente,
    recebimento: dados.recebimento,
    itens,
    observacoes: dados.observacoes,
    valores: {
      quantidadeTotal: itens.reduce((soma, item) => soma + item.quantidade, 0),
      subtotal: dados.subtotalCentavos / 100,
      taxaEntrega: dados.taxaEntregaCentavos / 100,
      total: dados.totalCentavos / 100,
    },
  };
}

export async function buscarPedidoApi(id, signal, fetchImpl = globalThis.fetch) {
  const resposta = await fetchImpl(`${API_URL}/pedidos/${encodeURIComponent(id)}`, { signal });
  if (!resposta.ok) {
    throw new Error(resposta.status === 404 ? "Pedido não encontrado." : "Não foi possível atualizar o pedido.");
  }
  return converterPedidoApi(await resposta.json());
}
