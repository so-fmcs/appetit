import assert from "node:assert/strict";
import test from "node:test";
import { sincronizarPratosPedido } from "../src/utils/sincronizarPratosPedido.js";

test("atualiza o preço de itens salvos e remove pratos indisponíveis", () => {
  const itens = [
    { id: "52904", nome: "Nome antigo", preco: 52, quantidade: 2 },
    { id: "99999", nome: "Prato removido", preco: 30, quantidade: 1 },
  ];
  const catalogo = [{
    id: "52904",
    nome: "Beef Bourguignon",
    categoria: "Carnes",
    precoCentavos: 5700,
    imagemUrl: "https://example.test/prato.jpg",
  }];

  assert.deepEqual(sincronizarPratosPedido(itens, catalogo), [{
    id: "52904",
    nome: "Beef Bourguignon",
    categoria: "Carnes",
    preco: 57,
    quantidade: 2,
    imagem: "https://example.test/prato.jpg",
  }]);
});
