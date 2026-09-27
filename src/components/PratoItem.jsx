import { useState } from "react";

function PratoItem({ prato }) {
  const [quantidade, setQuantidade] = useState(0);

  return (

    
    <article className="prato-item bg-white">
      <img src={prato.imagem} alt={prato.nome} />

      <div className="prato-item__info">
        <h3>{prato.nome}</h3>
        <p>{prato.descricao}</p>
      </div>

      <div className="preco-quantidade">
 <span className="prato-item__preco">
        {prato.preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </span>

      <div className="quantidade">
        <button
          type="button"
          aria-label={`Diminuir quantidade de ${prato.nome}`}
          onClick={() => setQuantidade((atual) => Math.max(0, atual - 1))}
          disabled={quantidade === 0}
        >
          −
        </button>

        <span aria-live="polite">{quantidade}</span>

        <button className="adicao-botao"
          type="button"
          aria-label={`Aumentar quantidade de ${prato.nome}`}
          onClick={() => setQuantidade((atual) => atual + 1)}
        >
          +
        </button>
      </div>
     
      </div>
    </article>
  );
}

export default PratoItem;   