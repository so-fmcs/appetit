function CardPrato({ nome, imagem }) {
  return (
    <article className="group w-56 shrink-0 perpective-distant">
      <img
        src={imagem}
        alt={nome}
        className="w-56 h-56 object-cover  rounded-2xl transition duration-300 ease-out group-hover:-rotate-y-8 group-hover:scale-105 group-hover:shadow-xl motion-reduce:transition-none"
      />
      <h3 className="mt-3 font-titulo text-xl uppercase">{nome}</h3>
    </article>
  );
}

export default CardPrato;
