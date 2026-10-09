import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PedidoProvider from "./context/PedidoProvider";
import Home from "./pages/Home";
import Pedido from "./pages/Pedido";
import Pratos from "./pages/Pratos";

function App() {
  return (
    <BrowserRouter>
      <PedidoProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/pratos" element={<Pratos />} />
        </Routes>
      </PedidoProvider>
    </BrowserRouter>
  );
}

export default App;
