import { useEffect, useRef } from "react";
import { X } from "lucide-react";

function ModalDetalhesPrato({ prato, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (prato && !dialog.open) dialog.showModal();
    if (!prato && dialog.open) dialog.close();
  }, [prato]);

  function fecharPeloFundo(evento) {
    if (evento.target !== evento.currentTarget) return;
    const limites = evento.currentTarget.getBoundingClientRect();
    if (
      evento.clientX < limites.left || evento.clientX > limites.right ||
      evento.clientY < limites.top || evento.clientY > limites.bottom
    ) dialogRef.current.close();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={fecharPeloFundo}
      aria-labelledby="detalhes-prato-titulo"
      className="m-auto max-h-[90vh] w-[min(92vw,48rem)] overflow-y-auto rounded-2xl bg-creme p-0 text-marrom-escuro shadow-2xl backdrop:bg-black/60"
    >
      {prato && (
        <article>
          <div className="relative">
            <img
              src={prato.imagem}
              alt={prato.nome}
              className="h-64 w-full object-cover sm:h-80"
            />
            <button
              type="button"
              onClick={() => dialogRef.current.close()}
              aria-label="Fechar detalhes do prato"
              className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-creme text-marrom-escuro shadow hover:bg-white"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-terracota">
              {prato.categoria}
            </p>
            <h2
              id="detalhes-prato-titulo"
              className="mt-1 font-titulo text-3xl font-bold uppercase"
            >
              {prato.nome}
            </h2>
            <p className="mt-2 text-xl font-semibold">
              {prato.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <h3 className="mt-6 font-semibold">Preparo</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-marrom-escuro/80">
              {prato.instrucoes || "Preparo não informado."}
            </p>
          </div>
        </article>
      )}
    </dialog>
  );
}

export default ModalDetalhesPrato;
