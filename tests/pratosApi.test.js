import assert from "node:assert/strict";
import test from "node:test";
import { buscarPratosFranceses } from "../src/services/pratosFranceses.js";

test("o cardápio usa os preços do backend mesmo quando a receita externa falha", async () => {
  const fetchOriginal = globalThis.fetch;
  const chamadas = [];
  globalThis.fetch = async (url) => {
    chamadas.push(url);
    if (url === "/api/pratos") {
      return {
        ok: true,
        json: async () => [{
          id: "52904",
          nome: "Beef Bourguignon",
          categoria: "Carnes",
          precoCentavos: 5700,
          imagemUrl: "https://example.test/prato.jpg",
        }],
      };
    }
    throw new Error("TheMealDB indisponível");
  };

  try {
    const pratos = await buscarPratosFranceses();
    assert.equal(pratos.length, 1);
    assert.equal(pratos[0].preco, 57);
    assert.equal(pratos[0].nome, "Beef Bourguignon");
    assert.equal(pratos[0].categoria, "Carnes");
    assert.equal(chamadas[0], "/api/pratos");
  } finally {
    globalThis.fetch = fetchOriginal;
  }
});
