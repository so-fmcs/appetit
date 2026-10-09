function CabecalhoPratos() {
  return (
    <section className="app-container mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-12 lg:grid-cols-2">
      <div>
        <p className="mb-2 font-titulo text-sm uppercase tracking-[0.2em] text-terracota">
          La carte
        </p>
        <h1 className="font-titulo text-6xl font-bold uppercase text-marrom-escuro">
          Nosso cardápio
        </h1>
        <p className="mt-3 max-w-2xl text-base text-marrom-escuro/80">
          Clássicos da cozinha francesa, feitos na hora. Escolha um prato,
          veja os detalhes e monte seu pedido.
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
