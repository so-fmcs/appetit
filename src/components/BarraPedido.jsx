import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";

function BarraPedido({ totalItens }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-4 bottom-5 z-40 flex justify-center"
      aria-live="polite"
    >
      {totalItens > 0 && (
        <Link
          to="/pedido"
          className="pointer-events-auto flex min-h-15 w-full max-w-md items-center justify-between gap-4 rounded-full bg-marrom-escuro py-2 pl-5 pr-2 text-creme shadow-[0_16px_36px_-14px_rgba(74,55,40,0.7)] sm:w-auto"
        >
          <span className="flex items-center gap-2.5">
            <ShoppingBag aria-hidden="true" className="size-5.5" />
            <span className="text-lg">
              <strong>{totalItens}</strong>{" "}
              {totalItens === 1 ? "item" : "itens"} no pedido
            </span>
          </span>
          <span className="flex h-11 items-center gap-2 rounded-full bg-terracota-escuro px-5 text-lg font-bold text-white transition hover:bg-terracota">
            Ver pedido
            <ArrowRight aria-hidden="true" className="size-4.5" />
          </span>
        </Link>
      )}
    </div>
  );
}

export default BarraPedido;
