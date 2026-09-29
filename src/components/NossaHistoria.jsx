import { useEffect, useRef, useState } from "react";

function NossaHistoria() {


  const polaroidRef = useRef(null);
  const [apareceu, setApareceu] = useState(false);

  useEffect(() => {
    const vigia = new IntersectionObserver(
      ([entrada]) => {
        setApareceu(entrada.isIntersecting);
      },
      {threshold: 0.5}
    );

    vigia.observe(polaroidRef.current);

    return () => vigia.disconnect();
  },[]);

  return (
    <section className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto px-8 py-20">
      <div className="flex-1 flex justify-center">
        <figure
          ref={polaroidRef}
          className={"bg-white p-3 shadow-lg transition duration-700 ease-out hover:rotate-0 motion-reduce:transition-none " + (apareceu ? "-rotate-2" : "rotate-6")
          }
        >
          <img
            src="/chefe.jpg"
            alt="Chef Bimmel preparando um prato na cozinha do restaurante"
            className="w-72 h-80 object-cover"
          />
          <figcaption className="mt-3 mb-1 text-center text-sm italic">Chef Bimmel, na cozinha do Appetit</figcaption>
        </figure>
      </div>

      <div className="flex-1">
        <p className="font-titulo text-sm uppercase tracking-widest text-verde-oliva">Notre histoire</p>
        <h2 className="font-titulo text-4xl font-bold uppercase">Nossa história</h2>
        <p className="mt-4 text-lg">
          O Appetit nasceu quando o chef Bimmel trocou Lyon pelo Sul do Brasil e trouxe na bagagem as receitas da avó.
        </p>
        <p className="mt-4">
          Até hoje, tudo é feito como numa cozinha de casa francesa: pão assado pela manhã, molhos que cozinham devagar e ingredientes comprados de produtores da região.
        </p>
      </div>
    </section>
  )
}

export default NossaHistoria