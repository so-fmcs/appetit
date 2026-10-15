import { buscarPratosApi } from "./pratosApi.js";
import { infoPratos } from "../data/infoPratos.js";

// Nome, disponibilidade e preço vêm da mesma API que confirma os pedidos.
export async function buscarPratosDetalhados({ signal, tempoLimiteMs = 10000, fetchImpl = globalThis.fetch,
  url = import.meta.env?.VITE_API_URL || "/api" } = {}) {
  const pratos = await buscarPratosApi(signal, { tempoLimiteMs, fetchImpl, url });
  return pratos.map(prato => ({
    id: prato.id, nome: prato.nome, categoria: prato.categoria,
    preco: prato.precoCentavos / 100, imagem: prato.imagemUrl,
    descricao: infoPratos[prato.id]?.resumo ?? "",
    // Compatibilidade com os cards da página inicial.
    idMeal: prato.id, strMeal: prato.nome, strMealThumb: prato.imagemUrl,
  }));
}

export async function buscarPratos(opcoes) {
  return (await buscarPratosDetalhados(opcoes)).slice(0, 8);
}

export function listarIngredientes(prato) {
  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const nome = prato[`strIngredient${i}`]?.trim();
    if (nome) ingredientes.push(nome);
  }
  return ingredientes;
}
