import {Link} from 'react-router-dom'

function Header(){
    return(
        <header className="flex items-center justify-between px-6 py-4 bg-bege-areia text-marrom-escuro">
            <Link to="/" className="font-titulo text-3xl font-bold uppercase tracking-wide">Appetit</Link>
            <nav className="flex gap-8 font-titulo text-2xl uppercase">
                <Link to="/">Home</Link>
                <Link to="/pratos">Pratos</Link>
                <Link to="/pedidos">Pedidos</Link>
            </nav>
        </header>
    )
}

export default Header