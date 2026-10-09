function MensagemPratos({ icone: Icone, titulo, texto, alerta = false, children }) {
  return (
    <div
      role={alerta ? "alert" : "status"}
      className={`flex flex-col items-center gap-3 rounded-3xl border bg-white px-6 py-12 text-center ${
        alerta ? "border-bege-areia" : "border-dashed border-bege-fendi"
      }`}
    >
      <div
        className={`flex size-18 items-center justify-center rounded-full ${
          alerta ? "bg-terracota/15" : "bg-creme"
        }`}
      >
        <Icone aria-hidden="true" className="size-8 text-terracota-escuro" />
      </div>
      <h3 className="font-titulo text-3xl font-bold uppercase">{titulo}</h3>
      <p className="max-w-md text-lg text-marrom-escuro/80">{texto}</p>
      <div className="flex flex-wrap justify-center gap-2.5 pt-1.5">
        {children}
      </div>
    </div>
  );
}

export default MensagemPratos;
