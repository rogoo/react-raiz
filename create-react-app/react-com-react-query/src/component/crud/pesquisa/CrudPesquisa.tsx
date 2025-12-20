import { useState } from "react";
import MensagemSistema from "shared/component/MensagemSistema";
import useQueryListaAuthor from "../hook/useQueryListaAuthor";
import FetchCompForm from "./form/CrudPesquisaForm";
import FetchCompTable from "./table/CrudPesquisaTable";

const CrudPesquisa = () => {
  const [primeiroNome, setPrimeiroNome] = useState<string>("");
  const [segundoNome, setSegundoNome] = useState<string>("");
  const { data, error, isLoading, refetch } = useQueryListaAuthor(
    primeiroNome,
    segundoNome
  );

  const handlePesquisarListaAuthor = () => {
    refetch();
  };

  return (
    <>
      <FetchCompForm
        primeiroNome={primeiroNome}
        segundoNome={segundoNome}
        handleCarregarListaAuthor={handlePesquisarListaAuthor}
        setPrimeiroNome={setPrimeiroNome}
        setSegundoNome={setSegundoNome}
      />
      <MensagemSistema isLoading={isLoading} err={error} />
      <FetchCompTable
        listAuthor={data}
        handleCarregarListaAuthor={handlePesquisarListaAuthor}
      />
    </>
  );
};

export default CrudPesquisa;
