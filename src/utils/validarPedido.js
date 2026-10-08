// Função pura: recebe dados e devolve erros, sem alterar o formulário.
export function validarPedido(dados) {
  const erros = {};
  const nome = (dados.nome ?? "").trim();
  const telefone = (dados.telefone ?? "").trim();
  const email = (dados.email ?? "").trim();
  // Remove a formatação, mas a regra abaixo ainda rejeita letras.
  const digitosTelefone = telefone.replace(/\D/g, "");

  if (!nome) {
    erros.nome = "Informe seu nome completo.";
  } else if (nome.length < 3 || !/\p{L}/u.test(nome)) {
    erros.nome = "Informe um nome com pelo menos 3 caracteres e alguma letra.";
  }

  if (!telefone) {
    erros.telefone = "Informe seu telefone com DDD.";
  } else if (
    !/^[\d\s()-]+$/.test(telefone) ||
    !/^[1-9]\d(?:\d{8}|9\d{8})$/.test(digitosTelefone)
  ) {
    erros.telefone = "Informe um telefone com DDD e 10 ou 11 dígitos. Ex.: (11) 99999-9999.";
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    erros.email = "Informe um e-mail válido ou deixe o campo vazio.";
  }

  if (!["entrega", "retirada"].includes(dados["tipo-recebimento"])) {
    erros["tipo-recebimento"] = "Escolha entrega ou retirada.";
  }

  // Na retirada, o endereço não participa da validação.
  if (dados["tipo-recebimento"] === "entrega") {
    const cep = (dados.cep ?? "").trim();
    if (!cep) {
      erros.cep = "Informe o CEP da entrega.";
    } else if (!/^\d{5}-?\d{3}$/.test(cep)) {
      erros.cep = "Informe um CEP com 8 dígitos. Ex.: 01001-000.";
    }

    const obrigatorios = {
      endereco: "Informe a rua ou avenida da entrega.",
      numero: "Informe o número ou S/N para um endereço sem número.",
      bairro: "Informe o bairro da entrega.",
    };
    for (const [campo, mensagem] of Object.entries(obrigatorios)) {
      if (!(dados[campo] ?? "").trim()) erros[campo] = mensagem;
    }
  }

  return erros;
}
