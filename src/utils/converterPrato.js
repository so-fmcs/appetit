import { infoPratos } from "../data/infoPratos.js";
import { precoPadrao, precosPorPrato } from "../data/precos.js";
import { listarIngredientes } from "../services/cardapio.js";

// Converte o prato da TheMealDB para o formato usado na página de pedido.
export function converterPrato(pratoApi) {
  const ingredientes = listarIngredientes(pratoApi);
  const descricao = infoPratos[pratoApi.idMeal]?.resumo ?? (
    ingredientes.length > 3
      ? `${ingredientes.slice(0, 3).join(", ")}...`
      : ingredientes.join(", ")
  );

  return {
    id: pratoApi.idMeal,
    nome: pratoApi.strMeal,
    preco: precosPorPrato[pratoApi.idMeal] ?? precoPadrao,
    descricao,
    imagem: pratoApi.strMealThumb,
  };
}
