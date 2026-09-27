import Hero from "../components/Hero"
import PratosDaCasa from "../components/PratosDaCasa"
import NossaHistoria from "../components/NossaHistoria"
import Rodape from "../components/Rodape"

function Home(){
    return(
        <main>
        <Hero/>
        <PratosDaCasa/>
        <NossaHistoria />
        <Rodape/>
        </main>
    )
}

export default Home