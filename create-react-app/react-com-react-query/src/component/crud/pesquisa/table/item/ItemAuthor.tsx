import { useNavigate } from "react-router";
import IconActiveInactive from "../../../../../shared/icon/IconActiveInactive";
import IconDelete from "../../../../../shared/icon/IconDelete";
import IconEdit from "../../../../../shared/icon/IconEdit";
import { IAuthor } from "../../../../../type/types";
import { apenasPrimeiraLetraMaiuscula } from "../../../../../utils/utils";

interface ItemAuthorProps {
  author: IAuthor;
  handleCarregarListaAuthor: () => void;
  excluirAuthor: (id: number) => void;
}

const ItemAuthor = ({
  author,
  handleCarregarListaAuthor,
  excluirAuthor,
}: ItemAuthorProps) => {
  const navigate = useNavigate();

  const handleEditarAuthor = () => {
    navigate(`/crud/editar/${author.id}`);
  };

  const handleDeletarAuthor = (id: number) => {
    excluirAuthor(id);
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
