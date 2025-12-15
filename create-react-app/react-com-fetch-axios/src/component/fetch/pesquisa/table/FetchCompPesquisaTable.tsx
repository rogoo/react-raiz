import useMensagemErro from "../../../../shared/hook/useMensagemErro";
import Mensagem from "../../../../shared/mensagem/Mensagem";
import { IAuthor } from "../../../../type/types";
import {
  TXT_ACAO,
  TXT_ATIVO,
  TXT_DATA_NASCIMENTO,
  TXT_NOME,
  TXT_SEM_DADOS,
  TXT_SEXO,
} from "../../../../utils/contantes";
import ItemAuthor from "./item/ItemAuthor";

type FetchCompTableProps = {
  listAuthor: IAuthor[];
  handleCarregarListaAuthor: () => void;
};

const FetchCompTable = ({
  listAuthor,
  handleCarregarListaAuthor,
}: FetchCompTableProps) => {
  const { mensagem, criarMensagemErro, criarMensagemSucesso, mensagemCSS } =
    useMensagemErro();
  return (
    <>
      <Mensagem mensagem={mensagem} mensagemCSS={mensagemCSS} />
      {listAuthor && listAuthor.length > 0 ? (
        <table>
          <caption>Author</caption>
          <thead>
            <tr>
              <th>{TXT_NOME}</th>
              <th>{TXT_DATA_NASCIMENTO}</th>
              <th>{TXT_ATIVO}</th>
              <th>{TXT_SEXO}</th>
              <th>{TXT_ACAO}</th>
            </tr>
          </thead>
          <tbody>
            {listAuthor.map((e) => (
              <ItemAuthor
                key={e.id}
                author={e}
                criarMensagemErro={criarMensagemErro}
                criarMensagemSucesso={criarMensagemSucesso}
                handleCarregarListaAuthor={handleCarregarListaAuthor}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div
          style={{ textAlign: "center", marginTop: "3em", fontWeight: "bold" }}
        >
          {TXT_SEM_DADOS}
        </div>
      )}
    </>
  );
};

export default FetchCompTable;
