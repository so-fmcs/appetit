import test from "node:test";
import assert from "node:assert/strict";
import { calcularResumoPedido } from "../src/utils/calcularResumoPedido.js";

const pratos = [{ preco: 48, quantidade: 1 }, { preco: 44, quantidade: 2 }];

test("entrega soma preços por quantidade e aplica a taxa uma vez", () => {
  assert.deepEqual(calcularResumoPedido(pratos, "entrega", 10), {
    quantidadeTotal: 3, subtotal: 136, taxaEntrega: 10, total: 146,
  });
});

test("retirada elimina a taxa sem alterar o subtotal", () => {
  assert.deepEqual(calcularResumoPedido(pratos, "retirada", 10), {
    quantidadeTotal: 3, subtotal: 136, taxaEntrega: 0, total: 136,
  });
});

test("pedido vazio e itens zerados não recebem taxa", () => {
  for (const itens of [[], [{ preco: 48, quantidade: 0 }]]) {
    assert.deepEqual(calcularResumoPedido(itens, "entrega", 10), {
      quantidadeTotal: 0, subtotal: 0, taxaEntrega: 0, total: 0,
    });
  }
});

test("nova quantidade recalcula o total sem modificar a lista original", () => {
  const antes = structuredClone(pratos);
  const atualizado = [{ preco: 48, quantidade: 2 }, pratos[1]];
  assert.equal(calcularResumoPedido(atualizado, "entrega", 10).total, 194);
  assert.deepEqual(pratos, antes);
});

test("soma preços com centavos sem acumular erro decimal", () => {
  assert.deepEqual(calcularResumoPedido([
    { preco: 0.1, quantidade: 1 }, { preco: 0.2, quantidade: 1 },
  ], "entrega", 0.1), {
    quantidadeTotal: 2, subtotal: 0.3, taxaEntrega: 0.1, total: 0.4,
  });
});

test("aceita entrega gratuita como outra configuração", () => {
  assert.equal(calcularResumoPedido(pratos, "entrega", 0).total, 136);
});
