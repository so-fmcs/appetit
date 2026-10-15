const API_URL = (import.meta.env?.VITE_API_URL?.trim() || "/api").replace(/\/+$/, "");

export async function buscarPratosApi(signal) {
  const resposta = await fetch(`${API_URL}/pratos`, { signal });
  if (!resposta.ok) throw new Error("Não foi possível carregar o cardápio.");

  const pratos = await resposta.json();
  if (!Array.isArray(pratos)) throw new Error("O cardápio recebido é inválido.");
  return pratos;
}
