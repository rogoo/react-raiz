import MensagemSistema from "shared/component/MensagemSistema";
import { IAuthor } from "../../../../type/types";
import {
  TXT_ACAO,
  TXT_ATIVO,
  TXT_DATA_NASCIMENTO,
  TXT_NOME,
  TXT_SEM_DADOS,
  TXT_SEXO,
} from "../../../../utils/contantes";
import useQueryDeleteAuthor from "../../hook/useQueryDeleteAuthor";
import ItemAuthor from "./item/ItemAuthor";

type FetchCompTableProps = {
  listAuthor: IAuthor[];
  handleCarregarListaAuthor: () => void;
};

const CrudTable = ({
  listAuthor,
  handleCarregarListaAuthor,
}: FetchCompTableProps) => {
  const {
    mutate: excluirAuthor,
    isPending,
    isSuccess,
    error,
  } = useQueryDeleteAuthor();

  return (
    <>
      <MensagemSistema
        isLoading={isPending}
        isSucesso={isSuccess}
        err={error}
      />
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
                handleCarregarListaAuthor={handleCarregarListaAuthor}
                excluirAuthor={excluirAuthor}
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

export default CrudTable;
