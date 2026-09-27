import { Link } from "react-router-dom";


const flores = [
    'size-5 rounded-full bg-terracota',
    'size-4 mt-1 rounded-full bg-verde-oliva',
    'size-5 rounded-full bg-terracota',
    'size-4 mt-1 rounded-full bg-verde-oliva',
    'size-5 rounded-full bg-terracota',
    'size-4 mt-1 rounded-full bg-verde-oliva',
]

function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto px-8 py-16">
      <div className="flex-1">
        <p className="font-titulo text-sm uppercase tracking-widest text-verde-oliva">
          Bistrô francês
        </p>
        <h1 className="font-titulo text-6xl font-bold uppercase leading-none">
          Bon appétit.
        </h1>
        <p className="mt-4 text-lg">
          Receitas clássicas da França, feitas sem pressa, com ingredientes da
          região.
        </p>
        <Link
          to="/pratos"
          className="inline-block mt-6 px-6 py-3 rounded-full bg-marrom-escuro text-creme font-medium transition duration-300 ease-out hover:bg-madeira hover:-translate-y-1 motion-reduce:transition-none"
        >
          Ver la carte
        </Link>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div className="relative w-72 h-96 border-[12px] border-madeira rounded-t-full overflow-hidden">
            <img
            src="/ratatouille.jpg"
            alt="Ratatouille com legumes em camadas, servido em prato de cerâmica"
            className="w-full h-full object-cover"
            />

            <div className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-madeira" aria-hidden="true"></div>
            <div className="absolute inset-x-0 top-1/2 h-2 bg-madeira" aria-hidden="true"></div>
        </div>

        <div className="w-80 h-4 rounded-sm bg-marrom-escuro" aria-hidden="true"></div>
        <div className="relative w-72 h-9 rounded-b-md bg-madeira" aria-hidden="true">
            <div className="absolute -top-3 inset-x-3 flex justify-between">
                {flores.map((classes, i) =>(
                    <span key={i} className={classes}></span>
                ))}
            </div>
        </div>
        
      </div>
    </section>
  );
}

export default Hero;
