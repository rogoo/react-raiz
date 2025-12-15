import { useState } from "react";
import { IMensagemSistema } from "../../type/types";

const useMensagemErro = () => {
  const [mensagem, setMensagem] = useState<IMensagemSistema>(
    {} as IMensagemSistema
  );

  const criarMensagemSucesso = (mensagem: string) => {
    setMensagem({
      texto: mensagem,
      tipo: "SUCCESS",
    });
  };

  const criarMensagemErro = (mensagem: string) => {
    setMensagem({
      texto: mensagem,
      tipo: "ERROR",
    });
  };

  const apagarMensagemErro = (mensagem: string) => {
    setMensagem({} as IMensagemSistema);
  };

  const mensagemCSS = () => {
    switch (mensagem.tipo) {
      case "ERROR":
        return "msg-erro";
      case "SUCCESS":
        return "msg-sucesso";
      case "WARN":
        return "msg-warn";
      default:
        return "";
    }
  };

  return {
    mensagem,
    criarMensagemErro,
    criarMensagemSucesso,
    mensagemCSS,
    apagarMensagemErro,
  };
};

export default useMensagemErro;
