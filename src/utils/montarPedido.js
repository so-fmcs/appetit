// Recebe dados já validados e monta o contrato de envio.
export function montarPedido(dados, pratos) {
  const texto = (campo) => (dados[campo] ?? "").trim();
  const tipo = dados["tipo-recebimento"];

  return {
    cliente: {
      nome: texto("nome"),
      telefone: texto("telefone").replace(/\D/g, ""),
      email: texto("email") || null,
    },
    recebimento: {
      tipo,
      // Retirada não envia um endereço preenchido numa escolha anterior.
      endereco: tipo === "entrega" ? {
        cep: texto("cep").replace(/\D/g, ""),
        logradouro: texto("endereco"),
        numero: texto("numero"),
        bairro: texto("bairro"),
        complemento: texto("complemento") || null,
      } : null,
    },
    // O servidor deve calcular preços usando os IDs e as quantidades.
    itens: pratos
      .filter((prato) => prato.quantidade > 0)
      .map((prato) => ({ pratoId: prato.id, quantidade: prato.quantidade })),
    observacoes: texto("observacoes") || null,
  };
}
