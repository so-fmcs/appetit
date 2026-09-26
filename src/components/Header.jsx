import { Link, NavLink } from "react-router-dom";

const estiloLink = ({ isActive }) =>
  "hover:text-white hover:-translate-y-1 transition duration-300 ease-out motion-reduce:transition-none " +
  (isActive
    ? "underline decoration-terracota decoration-4 underline-offset-8"
    : "");

function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 bg-marrom-escuro text-bege-areia">
      <Link
        to="/"
        className="font-titulo text-3xl font-bold uppercase tracking-wide"
      >
        Appetit
        <span className="text-terracota" aria-hidden="true">
          .
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
    </header>
  );
}

export default Header;
