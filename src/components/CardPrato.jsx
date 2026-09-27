import { Star } from "lucide-react";

function CardPrato({ nome, imagem, nota, comentario, cliente }) {
  return (
    <div className="shrink-0 perspective-distant">
        
      <article className="w-60 h-full rounded-3xl border border-bege-areia bg-white p-3 transition duration-300 ease-out hover:-rotate-y-8 hover:scale-105 hover:shadow-xl motion-reduce:transition-none">         <img
          src={imagem}
          alt={nome}
          className="w-full h-52 object-cover rounded-2xl"
         />
         <h3 className="px-1 mt-3 font-titulo text-xl uppercase">{nome}</h3>

         <div className="mt-2 px-1 flex gap-1">
            {[1, 2, 3, 4, 5].map((n)=> (
                <Star
                key={n}
                aria-hidden="true"
                className={n <= nota ? 'size-4 fill-terracota text-terracota' : 'size-4 text-madeira'}
                />
            ))}
            <span className="sr-only">Nota {nota} de 5</span>
         </div>


         <p className="mt-2 px-1 text-sm italic">"{comentario}"</p>
         <p className="mt-1 px-1 text-sm font-medium">{cliente}</p>
     </article>
    </div>
  );
}

export default CardPrato;
