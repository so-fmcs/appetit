function ErroCampo({ campo, mensagem }) {
  if (!mensagem) return null;

  return (
    <p className="campo__erro" id={`${campo}-erro`}>
      {mensagem}
    </p>
  );
}

export default ErroCampo;
