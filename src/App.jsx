import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Rodape from './components/Rodape'
function App(){
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
      <Rodape/>
    </BrowserRouter>
  )
}

export default App
