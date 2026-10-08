import { Plus } from "lucide-react";

function CardCardapio({ prato }) {
  return (
    <article
      className="h-full rounded-3xl border border-bege-areia
            bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <img
        src={prato.strMealThumb}
        alt={prato.strMeal}
        className="h-56 w-full rounded-2xl object-cover"
      />

      <div className="px-1 pb-1 pt-3">
        <h2 className="mt-1 font-titulo text-2xl font-bold uppercase leading-tight text-marrom-escuro">
          {prato.strMeal}
        </h2>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            className="flex-1 rounded-full border
                 border-bege-areia px-4 py-3 text-base font-semibold text-marrom-escuro transition
                  hover:border-terracota hover:text-terracota"
          >
            Ver detalhes
          </button>

          <button
            type="button"
            aria-label={`Adicionar ${prato.strMeal} ao pedido`}
            className="flex size-12 items-center justify-center rounded-full bg-terracota
                   text-white transition hover:bg-marrom-escuro"
          >
            <Plus aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default CardCardapio;