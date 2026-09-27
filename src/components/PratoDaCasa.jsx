import { useState, useEffect} from 'react';
import CardPrato from "./CardPrato";
import { Pause, Play} from 'lucide-react'

function PratosDaCasa(){
    const [pratos, setPratos] = useState([])
    const [pausado, setPausado] = useState(false)

    useEffect(()=>{
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=France')
        .then((resposta)=> resposta.json())
        .then((dados)=> setPratos(dados.meals.slice(0, 8)))
    }, [])
    return(
        <section className="max-w-6xl mx-auto px-8 py-16">
            <div className='flex items-end justify-between gap-4'>
                <div>
                <p className="font-titulo text-sm uppercase tracking-widest text-verde-oliva">La carte</p>
                <h2 className="font-titulo text-4xl font-bold uppercase">Pratos da casa</h2>
                </div>
                <button
                    type="button"
                    onClick={()=> setPausado(!pausado)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-marrom-escuro font-medium transition hover:bg-marrom-escuro hover:text-creme"
                >
                    {pausado ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
                    {pausado ? 'Continuar'  : 'Pausar'}
                </button>
            </div>


            <div className="mt-4 py-4 overflow-hidden">
                <div className={'flex w-max animate-carrossel hover:[animation-play-state:paused] ' + (pausado ? '[animation-play-state:paused]' : '')}>
                    <div className="flex gap-6 pr-6">
                        {pratos.map((prato)=>(
                            <CardPrato key={prato.idMeal} nome={prato.strMeal} imagem={prato.strMealThumb}/>
                        ))}
                    </div>
                    <div className="flex gap-6 pr-6" aria-hidden="true">
                        {pratos.map((prato) => (
                    <CardPrato key={prato.idMeal} nome={prato.strMeal} imagem={prato.strMealThumb}/>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PratosDaCasa