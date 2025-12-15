import { useApi } from "context/ApiContext";
import { useNavigate } from "react-router";
import IconActiveInactive from "../../../../../shared/icon/IconActiveInactive";
import IconDelete from "../../../../../shared/icon/IconDelete";
import IconEdit from "../../../../../shared/icon/IconEdit";
import { IAuthor } from "../../../../../type/types";
import { apenasPrimeiraLetraMaiuscula } from "../../../../../utils/utils";

interface ItemAuthorProps {
  author: IAuthor;
  criarMensagemErro: (texto: string) => void;
  criarMensagemSucesso: (texto: string) => void;
  handleCarregarListaAuthor: () => void;
}

const ItemAuthor = ({
  author,
  criarMensagemErro,
  criarMensagemSucesso,
  handleCarregarListaAuthor,
}: ItemAuthorProps) => {
  const navigate = useNavigate();
  const { currentApi } = useApi();

  const handleEditarAuthor = () => {
    navigate(`/fetchComp/editar/${author.id}`);
  };

  const handleDeletarAuthor = (id: number) => {
    currentApi
      .excluirAuthor(id)
      .then(async (resp: any) => {
        if (resp.ok) {
          criarMensagemSucesso("Excluido com sucesso papaiiiiiii");
          handleCarregarListaAuthor();
        } else {
          const data = await resp.text();

          criarMensagemErro(JSON.parse(data).message);
        }
      })
      .catch((err: any) => criarMensagemErro(err.message));
  };

  return (
    <>
      <tr>
        <td>
          {author.firstName} {author.lastName}{" "}
          {!author.naoPossuiPosts && (
            <span style={{ fontWeight: "bold", color: "red" }}>**</span>
          )}
        </td>
        <td>{author.birthday}</td>
        <td>
          <IconActiveInactive ativo={author.active} />
        </td>
        <td>{apenasPrimeiraLetraMaiuscula(author.sexo) || "Não se aplica"}</td>
        <td>
          <span onClick={handleEditarAuthor}>
            <IconEdit />
          </span>
          <span onClick={() => handleDeletarAuthor(author.id)}>
            <IconDelete />
          </span>
        </td>
      </tr>
    </>
  );
};

export default ItemAuthor;
