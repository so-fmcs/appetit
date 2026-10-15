import assert from "node:assert/strict";
import test from "node:test";
import { buscarPedidoApi, converterPedidoApi } from "../src/services/pedidoApi.js";

const pedidoDaApi = {
  id: "d23e0f6f-72fb-423b-b7f3-89879f05a838",
  status: "EM_PREPARO",
  criadoEm: "2026-10-14T22:00:00Z",
  cliente: { nome: "Ana Silva", telefone: "11999999999", email: null },
  recebimento: { tipo: "entrega", endereco: { cep: "01001000", logradouro: "Rua das Flores", numero: "123", bairro: "Centro", complemento: null } },
  itens: [{ pratoId: "52904", nomePrato: "Beef Bourguignon", quantidade: 2, precoUnitarioCentavos: 5200, imagemUrl: null }],
  observacoes: null,
  subtotalCentavos: 10400,
  taxaEntregaCentavos: 1000,
  totalCentavos: 11400,
};

test("converte o pedido salvo para os dados exibidos na confirmação", () => {
  const pedido = converterPedidoApi(pedidoDaApi);

  assert.equal(pedido.status, "EM_PREPARO");
  assert.equal(pedido.simulado, false);
  assert.equal(pedido.itens[0].preco, 52);
  assert.equal(pedido.itens[0].imagem, "/ratatouille.jpg");
  assert.deepEqual(pedido.valores, { quantidadeTotal: 2, subtotal: 104, taxaEntrega: 10, total: 114 });
});

test("consulta um pedido pelo ID e trata 404", async () => {
  let urlConsultada;
  const pedido = await buscarPedidoApi(pedidoDaApi.id, undefined, async (url) => {
    urlConsultada = url;
    return { ok: true, json: async () => pedidoDaApi };
  });

  assert.equal(urlConsultada, `/api/pedidos/${pedidoDaApi.id}`);
  assert.equal(pedido.id, pedidoDaApi.id);
  await assert.rejects(
    buscarPedidoApi(pedidoDaApi.id, undefined, async () => ({ ok: false, status: 404 })),
    /Pedido não encontrado/,
  );
});
