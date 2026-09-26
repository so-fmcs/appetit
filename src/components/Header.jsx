import { Link, NavLink } from "react-router-dom";
import { Rat } from "lucide-react";

const estiloLink = ({ isActive }) =>
  "hover:text-white hover:-translate-y-1 transition duration-300 ease-out motion-reduce:transition-none " +
  (isActive
    ? "underline decoration-terracota decoration-4 underline-offset-8"
    : "");

function Header() {
  return (
    <header className="sticky top-0 z-50">
    <div className="flex items-center justify-between px-8 py-5 bg-marrom-escuro text-bege-areia">
      <Link
        to="/"
        className="group flex flex-col items-center font-titulo text-3xl font-bold uppercase tracking-wide leading-none"
      >
        <Rat
          aria-hidden="true"
          className="size-6 transition duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none"
        />
        <span>
          Appetit
          <span className="text-terracota" aria-hidden="true">
            .
          </span>
        </span>
      </Link>
      <nav className="flex gap-12 font-titulo text-lg uppercase tracking-widest">
        <NavLink to="/" end className={estiloLink}>
          Home
        </NavLink>
        <NavLink to="/pratos" className={estiloLink}>
          Pratos
        </NavLink>
        <NavLink to="/pedidos" className={estiloLink}>
          Pedidos
        </NavLink>
      </nav>
    </div>
    <div className="toldo h-4 border-b-4 border-marrom-escuro" aria-hidden="true"></div>
    </header>
  );
}

export default Header;
