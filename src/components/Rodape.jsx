import { Link } from 'react-router-dom'
import { MapPin, Clock, Phone } from 'lucide-react'
import { enderecoRestaurante } from '../data/restaurante'

const estiloLink = 'hover:text-white transition duration-300'

function Rodape() {
  return (
    <footer className="bg-marrom-escuro text-bege-areia">
      <div className="toldo h-4 border-t-4 border-marrom-escuro" aria-hidden="true"></div>

      <div className="grid gap-10 md:grid-cols-3 largura-site mx-auto px-8 py-12">
        <div>
          <p className="font-titulo text-3xl font-bold uppercase tracking-wide">
            Appetit<span className="text-terracota" aria-hidden="true">.</span>
          </p>
          <p className="mt-3">Bistrô francês, feito sem pressa.</p>
        </div>

        <address className="not-italic space-y-3">
          <p className="flex items-center gap-2"><MapPin className="size-4" aria-hidden="true" /> {enderecoRestaurante}</p>
          <p className="flex items-center gap-2"><Clock className="size-4" aria-hidden="true" /> Terça a domingo, 11h30 às 22h</p>
          <p className="flex items-center gap-2"><Phone className="size-4" aria-hidden="true" /> (55) 3333-0000</p>
        </address>

        <nav aria-label="Rodapé" className="flex flex-col gap-2 font-titulo uppercase tracking-widest">
          <Link to="/" className={estiloLink}>Início</Link>
          <Link to="/pratos" className={estiloLink}>Pratos</Link>
          <Link to="/pedidos" className={estiloLink}>Pedidos</Link>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className={estiloLink}>Instagram</a>
        </nav>
      </div>

      <p className="border-t border-bege-areia/20 py-4 text-center text-sm">
        © {new Date().getFullYear()} Appetit. Projeto acadêmico.
      </p>
    </footer>
  )
}

export default Rodape