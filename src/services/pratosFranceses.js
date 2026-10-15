import { infoPratos } from "../data/infoPratos.js";
import { buscarPratosApi } from "./pratosApi.js";

const MEALDB_URL = "https://www.themealdb.com/api/json/v1/1";

async function buscarJson(url, signal) {
  const resposta = await fetch(url, { signal });
  if (!resposta.ok) throw new Error("Não foi possível carregar os pratos.");
  return resposta.json();
}

function resumirReceita(texto, limite = 320) {
  const receita = (texto ?? "").replace(/\s+/g, " ").trim();
  if (receita.length <= limite) return receita;
  return `${receita.slice(0, limite).replace(/\s+\S*$/, "").trimEnd()}...`;
}

export async function buscarPratosFranceses(signal) {
  const pratos = await buscarPratosApi(signal);

  const detalhes = await Promise.all(pratos.map(async (prato) => {
    try {
      const dadosDetalhe = await buscarJson(
        `${MEALDB_URL}/lookup.php?i=${encodeURIComponent(prato.id)}`,
        signal,
      );
      return dadosDetalhe.meals?.[0] ?? null;
    } catch (erro) {
      if (erro.name === "AbortError") throw erro;
      return null;
    }
  }));

  return pratos.map((prato, indice) => {
    const receita = detalhes[indice]?.strInstructions;
    return {
      id: prato.id,
      nome: prato.nome,
      imagem: prato.imagemUrl,
      categoria: prato.categoria,
      preco: prato.precoCentavos / 100,
      descricao: infoPratos[prato.id]?.resumo ?? resumirReceita(receita, 100),
      instrucoes: resumirReceita(receita),
    };
  });
}
