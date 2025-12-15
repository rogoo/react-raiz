import { FormEvent, RefObject } from "react";
import { useNavigate } from "react-router";

interface FetchCompFormProp {
  inputFirstNameRef: RefObject<HTMLInputElement | null>;
  inputLastNameRef: RefObject<HTMLInputElement | null>;
  handleCarregarListaAuthor: () => void;
}
const FetchCompForm = ({
  inputFirstNameRef,
  inputLastNameRef,
  handleCarregarListaAuthor,
}: FetchCompFormProp) => {
  const navigate = useNavigate();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCarregarListaAuthor();
  };

  const handleLimparCampos = () => {
    if (inputFirstNameRef) {
      inputFirstNameRef.current!.value = "";
    }
    if (inputLastNameRef) {
      inputLastNameRef.current!.value = "";
    }
  };

  const handleCriacaoAuthor = () => {
    navigate("/fetchComp/criar");
  };

  return (
    <>
      <h2>
        Uso do fetch API - <b>pesquisa</b>
      </h2>
      <form onSubmit={(e) => onSubmit(e)} className="form-container">
        <div>
          <label htmlFor="firstName">Primeiro Nome</label>
          <input ref={inputFirstNameRef} type="text" name="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Último Nome</label>
          <input ref={inputLastNameRef} type="text" name="lastName" />
        </div>
        <br />
        <button>Pesquisar</button>
        <button type="button" onClick={handleLimparCampos}>
          Limpar
        </button>
        <button
          type="button"
          className="btt-blue"
          onClick={handleCriacaoAuthor}
        >
          Criar
        </button>
      </form>
    </>
  );
};

export default FetchCompForm;
