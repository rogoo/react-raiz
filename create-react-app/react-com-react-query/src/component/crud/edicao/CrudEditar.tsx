import { useParams } from "react-router";
import FetchCompEditarForm from "./form/CrudEditarForm";

const CrudEditar = () => {
  const params = useParams();

  return (
    <>
      <h2>
        Uso do fetch API - <b>edição</b> - {params.idAuthor}
      </h2>

      <FetchCompEditarForm idAuthor={parseInt(params.idAuthor ?? "-1")} />
    </>
  );
};

export default CrudEditar;
