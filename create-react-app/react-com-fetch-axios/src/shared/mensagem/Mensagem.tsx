import { IMensagemSistema } from "../../type/types";

interface MensagemProps {
  mensagem: IMensagemSistema;
  mensagemCSS: () => string;
}
const Mensagem = ({ mensagem, mensagemCSS }: MensagemProps) => {
  return (
    <>
      {" "}
      {mensagem && (
        <div className={mensagemCSS()}>{mensagem ? mensagem.texto : ""}</div>
      )}
    </>
  );
};

export default Mensagem;
