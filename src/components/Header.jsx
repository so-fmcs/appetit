import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Rat, Menu, X } from 'lucide-react'

const links = [
  { texto: 'Home', caminho: '/', end: true },
  { texto: 'Pratos', caminho: '/pratos' },
  { texto: 'Pedidos', caminho: '/pedido' },
]

const estiloLink = ({ isActive }) =>
  'hover:text-white hover:-translate-y-1 transition duration-300 ease-out motion-reduce:transition-none ' +
  (isActive ? 'underline decoration-terracota decoration-4 underline-offset-8' : '')

function Header() {
  const [aberto, setAberto] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-5 bg-marrom-escuro text-bege-areia">
        <Link to="/" className="group flex flex-col items-center font-titulo text-3xl font-bold uppercase tracking-wide leading-none">
          <Rat aria-hidden="true" className="size-6 transition duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none" />
          <span>
            Appetit<span className="text-terracota" aria-hidden="true">.</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden md:flex gap-12 font-titulo text-lg uppercase tracking-widest">
          {links.map((link) => (
            <NavLink key={link.caminho} to={link.caminho} end={link.end} className={estiloLink}>
              {link.texto}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setAberto(!aberto)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          className="md:hidden p-2 rounded-full transition hover:bg-white/10"
        >
          {aberto ? <X className="size-7" aria-hidden="true" /> : <Menu className="size-7" aria-hidden="true" />}
        </button>
      </div>

      {aberto && (
        <nav id="menu-mobile" aria-label="Menu" className="md:hidden flex flex-col gap-5 px-8 pb-6 bg-marrom-escuro text-bege-areia font-titulo text-xl uppercase tracking-widest">
          {links.map((link) => (
            <NavLink key={link.caminho} to={link.caminho} end={link.end} className={estiloLink} onClick={() => setAberto(false)}>
              {link.texto}
            </NavLink>
          ))}
        </nav>
      )}

      <div className="toldo h-4 border-b-4 border-marrom-escuro" aria-hidden="true"></div>
    </header>
  )
}

export default Header