import { useState, useEffect} from 'react';
import CardPrato from "./CardPrato";

function PratosDaCasa(){
    const [pratos, setPratos] = useState([])

    useEffect(()=>{
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=France')
        .then((resposta)=> resposta.json())
        .then((dados)=> setPratos(dados.meals.slice(0, 8)))
    }, [])
    return(
        <section className="max-w-6xl mx-auto px-8 py-16">
            <p className="font-titulo text-sm uppercase tracking-widest text-verde-oliva">La carte</p>
            <h2 className="font-titulo text-4xl font-bold uppercase">Pratos da casa</h2>
            <div className="mt-8 flex gap-6 overflow-x-auto pb-4">
                {pratos.map((prato) => (
                    <CardPrato key={prato.idMeal} nome={prato.strMeal} imagem={prato.strMealThumb}/>
                ))}
            </div>
        </section>
    )
}

export default PratosDaCasa