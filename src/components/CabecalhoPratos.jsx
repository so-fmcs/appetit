function CabecalhoPratos() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 pb-10 pt-14 md:flex-row md:justify-between">
      <div>
        <p className="mb-3 font-titulo text-base uppercase tracking-[0.3em] md:text-lg text-terracota-escuro">
          La carte
        </p>

        <h1 className="font-titulo text-6xl font-bold uppercase leading-[0.95] text-marrom-escuro md:text-7xl lg:text-8xl">
          Nosso cardápio
        </h1>

        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-marrom-escuro/85 md:text-2xl">
          Clássicos da cozinha francesa, feitos na hora. Escolha um prato, veja
          os detalhes e monte seu pedido.
        </p>
      </div>

      <img
        src="/quadroRatatouille.png"
        alt="Quadro com uma ilustração de Ratatouille"
        className="hidden max-h-80 w-auto max-w-sm object-contain md:block"
      />
    </section>
  );
}

export default CabecalhoPratos;
