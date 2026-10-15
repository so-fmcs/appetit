export function sincronizarPratosPedido(itens, catalogo) {
  const porId = new Map(catalogo.map((prato) => [prato.id, prato]));
  return itens.flatMap((item) => {
    const prato = porId.get(item.id);
    return prato ? [{
      ...item,
      nome: prato.nome,
      imagem: prato.imagemUrl,
      categoria: prato.categoria,
      preco: prato.precoCentavos / 100,
    }] : [];
  });
}
