const API_BASE = "https://www.themealdb.com/api/json/v1/1";

const categorias = {
  Beef: "Carnes",
  Goat: "Carnes",
  Lamb: "Carnes",
  Pork: "Carnes",
  Pasta: "Massas",
  Salad: "Saladas",
  Vegetarian: "Vegetarianos",
  Vegan: "Vegetarianos",
  Chicken: "Aves",
  Seafood: "Peixes",
  Side: "Acompanhamentos",
  Starter: "Acompanhamentos",
  Miscellaneous: "Acompanhamentos",
  Dessert: "Sobremesas",
  Breakfast: "Café da manhã",
};

const precos = {
  Carnes: 52,
  Massas: 40,
  Saladas: 32,
  Vegetarianos: 42,
  Aves: 44,
  Peixes: 49,
  Acompanhamentos: 32,
  Sobremesas: 25,
  "Café da manhã": 28,
  Outros: 35,
};

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
  const dados = await buscarJson(`${API_BASE}/filter.php?a=France`, signal);
  const lista = dados.meals ?? [];

  const detalhes = await Promise.all(lista.map(async (prato) => {
    try {
      const dadosDetalhe = await buscarJson(
        `${API_BASE}/lookup.php?i=${prato.idMeal}`,
        signal,
      );
      return dadosDetalhe.meals?.[0] ?? null;
    } catch (erro) {
      if (erro.name === "AbortError") throw erro;
      return null;
    }
  }));

  return detalhes.filter(Boolean).map((prato) => {
    const categoria = categorias[prato.strCategory] ?? "Outros";
    return {
      id: prato.idMeal,
      nome: prato.strMeal,
      imagem: prato.strMealThumb,
      categoria,
      preco: precos[categoria],
      descricao: resumirReceita(prato.strInstructions, 100),
      instrucoes: resumirReceita(prato.strInstructions),
    };
  });
}