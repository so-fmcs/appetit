async function simularEnvio() {
  // Não persiste dados nem faz requisições. O atraso permite ver o carregamento.
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { id: `SIM-${crypto.randomUUID()}`, simulado: true };
}

export function criarServicoPedidos({
  url = "",
  fetchImpl = globalThis.fetch,
  envioSimulado = simularEnvio,
  tempoLimiteMs = 10000,
} = {}) {
  const baseUrl = url.trim().replace(/\/+$/, "");

  return async function enviarPedido(pedido) {
    // Sem API configurada, usa somente a simulação local.
    if (!baseUrl) return envioSimulado(pedido);

    const controller = new AbortController();
    const temporizador = setTimeout(() => controller.abort(), tempoLimiteMs);

    try {
      const resposta = await fetchImpl(`${baseUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
        signal: controller.signal,
      });

      if (!resposta.ok) {
        throw new Error("Não foi possível confirmar o pedido. Tente novamente.");
      }

      const dados = await resposta.json();
      // Contrato provisório: a API devolve { id: "identificador" }.
      if (!dados || !["string", "number"].includes(typeof dados.id) || !String(dados.id).trim()) {
        throw new Error("O serviço não retornou uma confirmação válida. Verifique o pedido antes de tentar novamente.");
      }

      return { id: String(dados.id), simulado: false };
    } catch (erro) {
      if (controller.signal.aborted) {
        throw new Error("O envio demorou demais. Verifique se o pedido foi recebido antes de tentar novamente.", { cause: erro });
      }
      if (erro instanceof TypeError) {
        throw new Error("Não foi possível conectar ao serviço. Verifique sua conexão e tente novamente.", { cause: erro });
      }
      if (erro instanceof SyntaxError) {
        throw new Error("O serviço não retornou uma confirmação válida. Verifique o pedido antes de tentar novamente.", { cause: erro });
      }
      throw erro;
    } finally {
      // Limpa o timeout tanto no sucesso quanto na falha.
      clearTimeout(temporizador);
    }
  };
}
