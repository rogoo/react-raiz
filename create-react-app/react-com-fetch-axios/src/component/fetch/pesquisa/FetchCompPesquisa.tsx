import { useRef } from "react";
import FetchCompForm from "./form/FetchCompPesquisaForm";
import { useAuthor } from "./hook/useAuthor";
import FetchCompTable from "./table/FetchCompPesquisaTable";

const FetchCompPesquisa = () => {
  const { listAuthor, carregarListaAuthor } = useAuthor();
  const inputFirstNameRef = useRef<HTMLInputElement>(null);
  const inputLastNameRef = useRef<HTMLInputElement>(null);

  const handleCarregarListaAuthor = () => {
    const pnome = inputFirstNameRef.current
      ? inputFirstNameRef.current.value
      : "";
    const lnome = inputLastNameRef.current
      ? inputLastNameRef.current.value
      : "";
    try {
      carregarListaAuthor(pnome, lnome);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <FetchCompForm
        handleCarregarListaAuthor={handleCarregarListaAuthor}
        inputFirstNameRef={inputFirstNameRef}
        inputLastNameRef={inputLastNameRef}
      />
      <FetchCompTable
        listAuthor={listAuthor}
        handleCarregarListaAuthor={handleCarregarListaAuthor}
      />
    </>
  );
};

export default FetchCompPesquisa;
