// Textos para o cliente, por idMeal. A TheMealDB só traz receita em inglês.
// Alergênicos deduzidos da lista de ingredientes da API: confirmar com a cozinha.
export const infoPratos = {
  52904: {
    resumo: "Carne cozida lentamente no vinho tinto, com bacon e cogumelos.",
    descricao:
      "Clássico da Borgonha: carne bovina cozida por horas no vinho tinto com bacon, cebolas, cogumelos e ervas, até ficar macia.",
    acompanha: "Purê de salsão com ervas",
    ingredientes: ["Carne bovina", "Vinho tinto", "Bacon", "Cogumelos", "Cebola", "Ervas"],
    alergenicos: ["Carne suína", "Aipo", "Vinho"],
  },
  52914: {
    resumo: "Batatas em camadas com cebola e tomilho, assadas até dourar.",
    descricao:
      "Batatas fatiadas em camadas com cebola refogada e tomilho, assadas no caldo de legumes até ficarem macias por dentro e crocantes por cima.",
    ingredientes: ["Batata", "Cebola", "Tomilho", "Caldo de legumes"],
    alergenicos: [],
    vegetariano: true,
  },
  52913: {
    resumo: "Queijo brie envolto em presunto cru e massa de brioche.",
    descricao:
      "Queijo brie envolvido em presunto cru e assado dentro de uma massa de brioche amanteigada. Servido morno, com o queijo derretendo.",
    ingredientes: ["Queijo brie", "Presunto cru", "Brioche"],
    alergenicos: ["Glúten", "Lactose", "Ovo", "Carne suína"],
  },
  52934: {
    resumo: "Frango assado com arroz, pimentões, chorizo e azeitonas.",
    descricao:
      "Receita do País Basco: frango dourado assado sobre arroz com pimentões, chorizo, tomate seco, páprica, limão e azeitonas pretas.",
    ingredientes: ["Frango", "Arroz", "Pimentões", "Chorizo", "Tomate seco", "Azeitonas"],
    alergenicos: ["Lactose", "Carne suína", "Vinho"],
  },
  52920: {
    resumo: "Coxas de frango ao molho de tomate com cogumelos e azeitonas.",
    descricao:
      "Coxas de frango cozidas em molho de tomate com cogumelos e azeitonas pretas, finalizadas com salsinha fresca.",
    ingredientes: ["Frango", "Molho de tomate", "Cogumelos", "Azeitonas", "Salsinha"],
    alergenicos: [],
  },
  52879: {
    resumo: "Frango desfiado coberto com purê cremoso e gruyère gratinado.",
    descricao:
      "Frango desfiado em molho de tomate com legumes, coberto por purê de batata cremoso e queijo gruyère gratinado no forno.",
    ingredientes: ["Frango", "Batata", "Queijo gruyère", "Tomate", "Cenoura", "Azeitonas"],
    alergenicos: ["Lactose", "Ovo", "Aipo", "Vinho"],
  },
  52910: {
    resumo: "Torta fina de maçã caramelizada com calda de vinho tinto.",
    descricao:
      "Massa folhada crocante coberta com lâminas de maçã caramelizada e pincelada com calda de vinho tinto e especiarias.",
    acompanha: "Creme fraîche com cardamomo",
    ingredientes: ["Maçã", "Massa folhada", "Calda de vinho tinto", "Cardamomo"],
    alergenicos: ["Glúten", "Lactose", "Vinho"],
  },
  52776: {
    resumo: "Bolo de chocolate denso e úmido, assado lentamente.",
    descricao:
      "Bolo de chocolate amargo, denso e úmido, feito com manteiga e assado lentamente.",
    ingredientes: ["Chocolate amargo", "Manteiga", "Ovos", "Farinha"],
    alergenicos: ["Glúten", "Lactose", "Ovo"],
  },
};
