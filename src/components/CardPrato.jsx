function CardPrato({nome, imagem}){
    return(
        <article className="w-56 shrink-0">
            <img src={imagem} alt={nome} className="w-56 h-56 object-cover  rounded-2xl"/>
            <h3 className="mt-3 font-titulo text-xl uppercase">{nome}</h3>
        </article>
    )
}

export default CardPrato