import {Link} from 'react-router-dom'

function Header(){
    return(
        <header className="flex items-center justify-between px-6 py-4 bg-terracota text-white">
            <h1 className="text-xl font-bold">Appetit</h1>
            <nav className="flex gap-6">
                <Link to="/">Home</Link>
                <Link to="/pratos">Pratos</Link>
                <Link to="/pedidos">Pedidos</Link>
            </nav>
        </header>
    )
}

export default Header