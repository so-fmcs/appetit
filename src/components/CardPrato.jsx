function CardPrato({ nome, imagem }) {
  return (
    <div className="shrink-0 perspective-distant">
        
        <article className="w-60 rounded-3xl border border-bege-areia bg-white p-3 transition duration-300 ease-out hover:-rotate-y-8 hover:scale-105 hover:shadow-xl motion-reduce:transition-none">
         <img
          src={imagem}
          alt={nome}
          className="w-full h-52 object-cover rounded-2xl"
         />
         <h3 className="mt-3 font-titulo text-xl uppercase">{nome}</h3>
     </article>
    </div>
  );
}

export default CardPrato;
