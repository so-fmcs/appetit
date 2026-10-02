// Preços e taxa são recebidos de fora para permitir trocar a origem por uma API.
export function calcularResumoPedido(pratos, tipoRecebimento, taxaEntregaConfigurada) {
  const itens = pratos.filter((prato) => prato.quantidade > 0);
  const quantidadeTotal = itens.reduce((soma, prato) => soma + prato.quantidade, 0);
  // Arredonda cada preço unitário em centavos antes de multiplicar.
  const subtotalCentavos = itens.reduce(
    (soma, prato) => soma + Math.round(prato.preco * 100) * prato.quantidade,
    0,
  );
  // Pedido vazio e retirada não recebem taxa de entrega.
  const taxaCentavos = tipoRecebimento === "entrega" && quantidadeTotal > 0
    ? Math.round(taxaEntregaConfigurada * 100)
    : 0;

  return {
    quantidadeTotal,
    subtotal: subtotalCentavos / 100,
    taxaEntrega: taxaCentavos / 100,
    total: (subtotalCentavos + taxaCentavos) / 100,
  };
}
