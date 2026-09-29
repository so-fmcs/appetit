import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flower2, ArrowRight } from "lucide-react";

const flores = [
  "text-terracota",
  "text-verde-oliva",
  "text-terracota",
  "text-verde-oliva",
  "text-terracota",
  "text-verde-oliva",
];

function Hero() {
  const [aberta, setAberta] = useState(false);

  useEffect(() => {
    const abrir = () => setAberta(true);

    window.addEventListener("scroll", abrir, { once: true });

    const tempo = setTimeout(abrir, 2000);

    return () => {
      window.removeEventListener("scroll", abrir);
      clearTimeout(tempo);
    };
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center gap-10 max-w-7xl mx-auto px-8 py-16">
      <div className="flex-1">
        <p className="font-titulo text-sm uppercase tracking-widest text-verde-oliva">
          Bistrô francês
        </p>
        <h1 className="font-titulo text-6xl md:text-7xl xl:text-8xl font-bold uppercase leading-none">
          Bon appétit.
        </h1>
        <p className="mt-4 text-lg xl:text-xl">
          Receitas clássicas da França, feitas sem pressa, com ingredientes da
          região.
        </p>
        <Link
          to="/pratos"
          className="group-hover inline-block mt-6 px-6 py-3 rounded-full bg-marrom-escuro text-creme font-medium transition duration-300 ease-out hover:bg-madeira hover:-translate-y-1 motion-reduce:transition-none"
        >
          Ver la carte
          <ArrowRight aria-hidden="true" className="inline size-4 ml-2 transition-transform group-hover:translate-x-l motion-reduce:transition-none"/>
        </Link>
      </div>
      <div className="relative isolate flex-1 flex flex-col items-center">
        <div aria-hidden="true" className="tijolos absolute -z-10 left-1/2 -translate-x-1/2 w-[min(24rem,100%)] top-6 bottom-0 rounded-t-[4rem] shadow-inner"></div>
        <svg
          aria-hidden="true"
          viewBox="0 0 70 300"
          className="absolute z-10 top-6 left-[calc(50%-12rem)] w-16 h-72 text-verde-oliva"
          >
            <path
            d="M40 300 C 20 250, 55 210, 35 160 S 50 70, 30 10"
            fill="none"
            stroke="#4d5a2b"
            strokeWidth="3"
            />
            {/*folhas alternando lado a lado*/}
            <g fill="currentColor">
              <ellipse cx='26' cy="270" rx="10" ry="6" transform="rotate(-30 26 270)" />
              <ellipse cx='50' cy="235" rx="10" ry="6" transform="rotate(30 50 235)" />
              <ellipse cx='28' cy="195" rx="10" ry="6" transform="rotate(-30 28 195)" />
              <ellipse cx='48' cy="150" rx="10" ry="6" transform="rotate(30 48 150)" />
              <ellipse cx='30' cy="110" rx="10" ry="6" transform="rotate(-30 30 110)" />
              <ellipse cx='44' cy="70" rx="9" ry="5.5" transform="rotate(30 44 70)" />
              <ellipse cx='28' cy="35" rx="8" ry="5" transform="rotate(-30 28 35)" />
            </g>

          </svg>
        <div className="relative w-72 h-96 border-[12px] border-madeira rounded-t-full overflow-hidden">
          <img
            src="/ratatouille.jpg"
            alt="Ratatouille com legumes em camadas, servido em prato de cerâmica"
            className="w-full h-full object-cover"
          />

          <div
            aria-hidden="true"
            className={
              "absolute inset-y-0 left-0 w-1/2 bg-[repeating-linear-gradient(0deg,var(--color-madeira)_0_10px,var(--color-marrom-escuro)_10px_12px)] transition-transform duration-1000 ease-out motion-reduce:hidden " +
              (aberta ? "-translate-x-full" : "translate-x-0")
            }
          ></div>

          <div
            aria-hidden="true"
            className={
              "absolute inset-y-0 right-0 w-1/2 bg-[repeating-linear-gradient(0deg,var(--color-madeira)_0_10px,var(--color-marrom-escuro)_10px_12px)] transition-transform duration-1000 ease-out motion-reduce:hidden " +
              (aberta ? "translate-x-full" : "translate-x-0")
            }
          ></div>

          <div
            className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-madeira"
            aria-hidden="true"
          ></div>
          <div
            className="absolute inset-x-0 top-1/2 h-2 bg-madeira"
            aria-hidden="true"
          ></div>
        </div>

        <div
          className="w-80 h-4 rounded-sm bg-marrom-escuro"
          aria-hidden="true"
        ></div>
        <div
          className="relative w-72 h-9 rounded-b-md bg-madeira"
          aria-hidden="true"
        >
          <div className="absolute -top-11 inset-x-3 flex justify-between">
            {flores.map((cor, i) => (
              <Flower2
                key={i}
                aria-hidden="true"
                className={
                  cor + " size-7 motion-safe:animate-balanca origin-bottom"
                }
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))} 
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
