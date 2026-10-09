import { useEffect, useRef } from "react";
import { Leaf, Minus, Plus, TriangleAlert, X } from "lucide-react";
import { infoPratos } from "../data/infoPratos";

function ModalDetalhesPrato({
  prato,
  categoria,
  quantidade,
  onAlterarQuantidade,
  onFechar,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (prato && !dialog.open) dialog.showModal();
    if (!prato && dialog.open) dialog.close();
  }, [prato]);

  function fechar() {
    dialogRef.current.close();
  }

  function fecharPeloFundo(evento) {
    if (evento.target !== evento.currentTarget) return;
    const limites = evento.currentTarget.getBoundingClientRect();
    // Só fecha fora da janela, sem confundir o espaçamento interno com o fundo.
    if (evento.clientX < limites.left || evento.clientX > limites.right ||
      evento.clientY < limites.top || evento.clientY > limites.bottom) fechar();
  }

  function adicionarEFechar() {
    onAlterarQuantidade(1);
    fechar();
  }

  // Sem texto em português, o modal mostra só foto, nome e pedido.
  const info = prato ? infoPratos[prato.idMeal] : null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="detalhes-prato-titulo"
      onClick={fecharPeloFundo}
      onClose={onFechar}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(60rem,calc(100%-2rem))] overflow-hidden rounded-[1.75rem] bg-white text-marrom-escuro shadow-2xl backdrop:bg-marrom-escuro/55"
    >
      {prato && (
        <div className="relative grid max-h-[calc(100dvh-2rem)] md:grid-cols-2">
          <img
            src={prato.strMealThumb}
            alt={prato.strMeal}
            className="h-56 w-full object-cover md:h-full"
          />

          <div className="flex min-h-0 flex-col">
            <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-6 pb-4 pt-7 md:px-8">
              <div className="pr-12">
                <p className="mb-2 font-titulo text-sm uppercase tracking-[0.25em] text-terracota-escuro">
                  {[categoria, "Cozinha francesa"].filter(Boolean).join(" · ")}
                </p>
                <h2
                  id="detalhes-prato-titulo"
                  className="font-titulo text-4xl font-bold uppercase leading-none md:text-5xl"
                >
                  {prato.strMeal}
                </h2>
              </div>

              {info && (
                <>
                  <p className="text-lg leading-relaxed text-marrom-escuro/90">
                    {info.descricao}
                  </p>

                  {info.acompanha && (
                    <p className="text-base">
                      <strong>Acompanha:</strong> {info.acompanha}
                    </p>
                  )}

                  <section aria-labelledby="detalhes-ingredientes">
                    <h3 id="detalhes-ingredientes" className="mb-2.5 text-lg font-bold">
                      Principais ingredientes
                    </h3>
                    <ul className="flex flex-wrap gap-1.5">
                      {info.ingredientes.map((ingrediente) => (
                        <li
                          key={ingrediente}
                          className="rounded-full bg-creme px-3.5 py-1.5 text-base"
                        >
                          {ingrediente}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {(info.vegetariano || info.alergenicos.length > 0) && (
                    <section aria-labelledby="detalhes-alergenicos">
                      <h3 id="detalhes-alergenicos" className="mb-2.5 text-lg font-bold">
                        Restrições alimentares
                      </h3>
                      <ul className="flex flex-wrap gap-1.5">
                        {info.vegetariano && (
                          <li className="flex items-center gap-1.5 rounded-full border border-verde-oliva px-3.5 py-1.5 text-base font-medium text-verde-oliva">
                            <Leaf aria-hidden="true" className="size-4" />
                            Vegetariano
                          </li>
                        )}
                        {info.alergenicos.map((alergenico) => (
                          <li
                            key={alergenico}
                            className="flex items-center gap-1.5 rounded-full border border-terracota-escuro/40 px-3.5 py-1.5 text-base font-medium text-terracota-escuro"
                          >
                            <TriangleAlert aria-hidden="true" className="size-4" />
                            Contém {alergenico.toLowerCase()}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2.5 text-sm text-marrom-escuro/75">
                        Tem alguma alergia? Fale com o restaurante antes de pedir.
                      </p>
                    </section>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-3 border-t border-creme px-6 pb-6 pt-4 md:px-8">
              {quantidade > 0 ? (
                <>
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
                      className="flex size-11 items-center justify-center rounded-full border border-bege-areia bg-white transition hover:border-terracota-escuro"
                    >
                      <Plus aria-hidden="true" className="size-4.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={fechar}
                    className="h-14 flex-1 rounded-full bg-terracota-escuro px-5 text-lg font-bold text-white transition hover:bg-marrom-escuro"
                  >
                    Concluir
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={adicionarEFechar}
                  className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-terracota-escuro px-5 text-lg font-bold text-white transition hover:bg-marrom-escuro"
                >
                  <Plus aria-hidden="true" className="size-5" />
                  Adicionar ao pedido
                </button>
              )}
            </div>
          </div>

          <button
            type="button"
            aria-label="Fechar detalhes"
            onClick={fechar}
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-creme transition hover:bg-bege-areia"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
      )}
    </dialog>
  );
}

export default ModalDetalhesPrato;
