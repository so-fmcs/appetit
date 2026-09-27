import Hero from "../components/Hero"
import PratoDaCasa from "../components/PratoDaCasa"
import NossaHistoria from "../components/NossaHistoria"
import Rodape from "../components/Rodape"

function Home(){
    return(
        <main>
        <Hero/>
        <PratoDaCasa/>
        <NossaHistoria />
        <Rodape/>
        </main>
    )
}

export default Home