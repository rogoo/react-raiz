interface ErrorProps {
  isLoading?: boolean;
  isSucesso?: boolean;
  mensagem?: string;
  err?: Error | null;
}

const MensagemSistema = ({
  err,
  isLoading,
  isSucesso = false,
  mensagem,
}: ErrorProps) => {
  const recuperaMensagemErro = (error: any) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    return error.message;
  };

  if (mensagem) {
    return <div className="loading-error">{mensagem}</div>;
  }

  return (
    <div className="loading-error">
      {isLoading && "Loading..."}
      {isSucesso && "Sucessoooooooo!!"}
      {err && recuperaMensagemErro(err)}
    </div>
  );
};

export default MensagemSistema;
