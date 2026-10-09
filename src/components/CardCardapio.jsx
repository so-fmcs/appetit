import { Minus, Plus } from "lucide-react";
import { infoPratos } from "../data/infoPratos";

function CardCardapio({
  prato,
  categoria,
  preco,
  quantidade,
  onAlterarQuantidade,
  onVerDetalhes,
}) {
  const resumo = infoPratos[prato.idMeal]?.resumo;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-bege-areia bg-white transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(74,55,40,0.35)] motion-reduce:transition-none">
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={prato.strMealThumb}
          alt={prato.strMeal}
          className="size-full object-cover transition duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />
        {categoria && (
          <span className="absolute left-3 top-3 rounded-full bg-creme/95 px-3.5 py-1.5 text-sm font-bold">
            {categoria}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-5 pb-5 pt-5">
        <h3 className="font-titulo text-3xl font-bold uppercase leading-tight text-marrom-escuro">
          {prato.strMeal}
        </h3>
        {resumo && (
          <p className="text-base leading-snug text-marrom-escuro/80">{resumo}</p>
        )}
        <button
          type="button"
          onClick={onVerDetalhes}
          aria-haspopup="dialog"
          className="self-start py-2 text-base font-bold underline decoration-bege-areia underline-offset-4 transition hover:text-terracota-escuro hover:decoration-terracota-escuro"
        >
          Ver detalhes
          <span className="sr-only"> de {prato.strMeal}</span>
        </button>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-bege-areia pt-3">
          <span className="font-titulo text-3xl font-bold">
            {preco.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>

          {quantidade > 0 ? (
            <div className="flex items-center gap-1 rounded-full bg-creme p-0.5">
              <button
                type="button"
                aria-label={`Diminuir quantidade de ${prato.strMeal}`}
                onClick={() => onAlterarQuantidade(-1)}
                className="flex size-11 items-center justify-center rounded-full border border-bege-areia bg-white transition hover:border-terracota-escuro"
              >
                <Minus aria-hidden="true" className="size-4.5" />
              </button>
              <span className="min-w-8 text-center text-lg font-bold" aria-live="polite">
                {quantidade}
              </span>
              <button
                type="button"
                aria-label={`Aumentar quantidade de ${prato.strMeal}`}
                onClick={() => onAlterarQuantidade(1)}
                className="flex size-11 items-center justify-center rounded-full bg-terracota-escuro text-white transition hover:bg-marrom-escuro"
              >
                <Plus aria-hidden="true" className="size-4.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              aria-label={`Adicionar ${prato.strMeal} ao pedido`}
              onClick={() => onAlterarQuantidade(1)}
              className="flex h-12 items-center gap-1.5 rounded-full bg-terracota-escuro px-5 text-base font-bold text-white transition hover:bg-marrom-escuro"
            >
              <Plus aria-hidden="true" className="size-4.5" />
              Adicionar
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default CardCardapio;
