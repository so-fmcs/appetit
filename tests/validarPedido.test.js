import test from "node:test";
import assert from "node:assert/strict";
import { validarPedido } from "../src/utils/validarPedido.js";

const retirada = {
  "tipo-recebimento": "retirada",
  nome: "Ana Silva",
  telefone: "(11) 99999-9999",
};
const entrega = {
  ...retirada,
  "tipo-recebimento": "entrega",
  cep: "01001-000",
  endereco: "Praça da Sé",
  numero: "10",
  bairro: "Sé",
};

test("retirada dispensa endereço e campos opcionais", () => {
  assert.deepEqual(validarPedido(retirada), {});
});

test("entrega com todos os campos válidos", () => {
  assert.deepEqual(validarPedido(entrega), {});
});

test("campos ausentes devolvem erros sem lançar exceção", () => {
  assert.deepEqual(Object.keys(validarPedido({})).sort(),
    ["nome", "telefone", "tipo-recebimento"]);
});

test("nome vazio, espaços, curto ou só números é inválido", () => {
  for (const nome of ["", "   ", "Al", "123"]) {
    assert.ok(validarPedido({ ...retirada, nome }).nome);
  }
  assert.deepEqual(validarPedido({ ...retirada, nome: "  Ána  " }), {});
});

test("telefone aceita fixo/celular com ou sem formatação", () => {
  for (const telefone of ["(11) 3333-4444", "1133334444", "11999999999"]) {
    assert.deepEqual(validarPedido({ ...retirada, telefone }), {});
  }
});

test("telefone rejeita vazio, letras, falta de DDD e tamanhos inválidos", () => {
  for (const telefone of ["", "   ", "999999999", "119999999999", "ab11999999999", "01999999999", "11888888888"]) {
    assert.ok(validarPedido({ ...retirada, telefone }).telefone);
  }
});

test("email é opcional e valida o formato quando informado", () => {
  for (const email of ["", "   ", "ana@example.com"]) {
    assert.deepEqual(validarPedido({ ...retirada, email }), {});
  }
  for (const email of ["ana", "ana@", "ana@example", "ana @example.com"]) {
    assert.ok(validarPedido({ ...retirada, email }).email);
  }
});

test("entrega exige cada campo do endereço, inclusive contra espaços", () => {
  for (const campo of ["cep", "endereco", "numero", "bairro"]) {
    for (const valor of ["", "   "]) {
      const erros = validarPedido({ ...entrega, [campo]: valor });
      assert.deepEqual(Object.keys(erros), [campo]);
    }
  }
});

test("CEP aceita 8 dígitos com ou sem hífen e rejeita formatos inválidos", () => {
  for (const cep of ["01001-000", "01001000", " 01001-000 "]) {
    assert.deepEqual(validarPedido({ ...entrega, cep }), {});
  }
  for (const cep of ["123", "01001-0000", "abcdefgh", "01001 000"]) {
    assert.ok(validarPedido({ ...entrega, cep }).cep);
  }
});

test("retirada ignora endereço inválido de uma entrega anterior", () => {
  assert.deepEqual(validarPedido({ ...retirada, cep: "errado", endereco: " " }), {});
});

test("número aceita S/N e complemento/observações são opcionais", () => {
  assert.deepEqual(validarPedido({ ...entrega, numero: "S/N", complemento: "", observacoes: "" }), {});
});

test("tipo de recebimento inválido é rejeitado", () => {
  assert.ok(validarPedido({ ...retirada, "tipo-recebimento": "outro" })["tipo-recebimento"]);
});
