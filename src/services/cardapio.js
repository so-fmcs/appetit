// Mesma fonte usada na página Início, na página Pratos e no modal de Pedido.
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const QUANTIDADE_PRATOS = 8;
const TEMPO_LIMITE_MS = 10000;

// Junta o cancelamento de quem chamou com um tempo limite,
// para que uma API que não responde vire erro em vez de carregar para sempre.
function criarSinal(signalExterno, tempoLimiteMs) {
  const controller = new AbortController();
  const temporizador = setTimeout(() => controller.abort(), tempoLimiteMs);
  const repassar = () => controller.abort();

  if (signalExterno?.aborted) controller.abort();
  signalExterno?.addEventListener("abort", repassar, { once: true });

  return {
    signal: controller.signal,
    limpar() {
      clearTimeout(temporizador);
      signalExterno?.removeEventListener("abort", repassar);
    },
  };
}

// Só em desenvolvimento: ?api=erro | vazia | lenta simula a API fora do ar.
function modoSimulado() {
  if (!import.meta.env.DEV) return null;
  return new URLSearchParams(location.search).get("api");
}

async function buscarLista(signal) {
  const modo = modoSimulado();
  if (modo === "erro") throw new Error("Falha simulada");
  if (modo === "vazia") return [];
  if (modo === "lenta") {
    // Nunca responde: só termina quando o tempo limite cancela.
    await new Promise((_, rejeitar) =>
      signal.addEventListener("abort", () => rejeitar(new Error("Tempo esgotado"))),
    );
  }

  const resposta = await fetch(`${BASE_URL}/filter.php?a=France`, { signal });
  if (!resposta.ok) throw new Error("Falha ao carregar os pratos");
  const dados = await resposta.json();
  return dados.meals?.slice(0, QUANTIDADE_PRATOS) ?? [];
}

async function buscarDetalhes(prato, signal) {
  try {
    const resposta = await fetch(`${BASE_URL}/lookup.php?i=${prato.idMeal}`, {
      signal,
    });
    if (!resposta.ok) return prato;
    const dados = await resposta.json();
    return dados.meals?.[0] ?? prato;
  } catch (erro) {
    if (signal.aborted) throw erro;
    // Sem detalhes, o card ainda mostra nome e foto.
    return prato;
  }
}

export async function buscarPratos({ signal, tempoLimiteMs = TEMPO_LIMITE_MS } = {}) {
  const sinal = criarSinal(signal, tempoLimiteMs);
  try {
    return await buscarLista(sinal.signal);
  } finally {
    sinal.limpar();
  }
}

// A listagem não traz categoria nem ingredientes, por isso busca os detalhes.
export async function buscarPratosDetalhados({ signal, tempoLimiteMs = TEMPO_LIMITE_MS } = {}) {
  const sinal = criarSinal(signal, tempoLimiteMs);
  try {
    const pratos = await buscarLista(sinal.signal);
    return await Promise.all(
      pratos.map((prato) => buscarDetalhes(prato, sinal.signal)),
    );
  } finally {
    sinal.limpar();
  }
}

export function listarIngredientes(prato) {
  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const nome = prato[`strIngredient${i}`]?.trim();
    if (nome) ingredientes.push(nome);
  }
  return ingredientes;
}
