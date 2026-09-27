import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Pedido from "./pages/Pedido";
import Pratos from "./pages/Pratos";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/pratos" element={<Pratos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
