const API_URL = (import.meta.env?.VITE_API_URL?.trim() || "/api").replace(/\/+$/, "");

// Uma única consulta de catálogo atende home, carrinho e checkout.
export async function buscarPratosApi(signal, { fetchImpl = globalThis.fetch, url = API_URL, tempoLimiteMs = 10000 } = {}) {
  const limite = AbortSignal.timeout(tempoLimiteMs);
  const resposta = await fetchImpl(`${url.replace(/\/+$/, "")}/pratos`, {
    signal: signal ? AbortSignal.any([signal, limite]) : limite,
    cache: "no-store",
  });
  if (!resposta.ok) throw new Error("Não foi possível carregar o cardápio.");
  const pratos = await resposta.json();
  if (!Array.isArray(pratos)) throw new Error("O cardápio recebido é inválido.");
  return pratos;
}
