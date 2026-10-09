import test from 'node:test';
import assert from 'node:assert/strict';
import { criarDetalhesPedido, lerDetalhesPedido, salvarDetalhesPedido } from '../src/utils/detalhesPedidoStorage.js';

const pratos = [{ id: 'abc', nome: 'Prato', imagem: '/ratatouille.jpg', preco: 25, quantidade: 2 }];
const envio = { cliente: { nome: 'Teste', telefone: '11999990000', email: null }, recebimento: { tipo: 'entrega', endereco: { cep: '01310000', logradouro: 'Rua', numero: '1', bairro: 'Centro', complemento: null } }, observacoes: 'Sem cebola' };
const valores = { quantidadeTotal: 2, subtotal: 50, taxaEntrega: 10, total: 60 };

test('detalhes guardam o envio sem serem reescritos por alterações no carrinho ou endereço', () => {
  const itens = structuredClone(pratos);
  const dados = structuredClone(envio);
  const resumo = { ...valores };
  const detalhes = criarDetalhesPedido(dados, itens, { id: 'SIM-1', simulado: true }, resumo);
  itens[0].quantidade = 10;
  dados.cliente.nome = 'Outro';
  dados.recebimento.endereco.numero = '200';
  resumo.total = 999;
  assert.equal(detalhes.itens[0].quantidade, 2);
  assert.equal(detalhes.cliente.nome, 'Teste');
  assert.equal(detalhes.recebimento.endereco.numero, '1');
  assert.equal(detalhes.valores.total, 60);
  assert.equal(detalhes.simulado, true);
});

test('retirada preserva endereço nulo e confirmação real não vira simulação', () => {
  const detalhes = criarDetalhesPedido({ ...envio, recebimento: { tipo: 'retirada', endereco: null } }, pratos, { id: 12, simulado: false }, { ...valores, taxaEntrega: 0, total: 50 });
  assert.equal(detalhes.id, '12');
  assert.equal(detalhes.simulado, false);
  assert.equal(detalhes.recebimento.endereco, null);
  assert.equal(detalhes.valores.taxaEntrega, 0);
});

test('salva e lê confirmação da sessão, tratando pedido ausente e JSON inválido', () => {
  const anterior = globalThis.window;
  const registros = new Map();
  globalThis.window = { sessionStorage: { setItem: (chave, valor) => registros.set(chave, valor), getItem: (chave) => registros.get(chave) ?? null } };
  try {
    const detalhes = criarDetalhesPedido(envio, pratos, { id: 'SIM-2', simulado: true }, valores);
    salvarDetalhesPedido(detalhes);
    assert.deepEqual(lerDetalhesPedido('SIM-2'), detalhes);
    assert.equal(lerDetalhesPedido('ausente'), null);
    registros.set('appetit-pedido-confirmado:quebrado', '{');
    assert.equal(lerDetalhesPedido('quebrado'), null);
    registros.set('appetit-pedido-confirmado:incompleto', JSON.stringify({ id: 'incompleto' }));
    assert.equal(lerDetalhesPedido('incompleto'), null);
  } finally {
    if (anterior === undefined) delete globalThis.window;
    else globalThis.window = anterior;
  }
});

test('armazenamento indisponível não interrompe a navegação', () => {
  const anterior = globalThis.window;
  globalThis.window = { sessionStorage: { setItem: () => { throw new Error('Indisponível'); }, getItem: () => { throw new Error('Indisponível'); } } };
  try {
    assert.doesNotThrow(() => salvarDetalhesPedido(criarDetalhesPedido(envio, pratos, { id: 'SIM-3' }, valores)));
    assert.equal(lerDetalhesPedido('SIM-3'), null);
  } finally {
    if (anterior === undefined) delete globalThis.window;
    else globalThis.window = anterior;
  }
});
