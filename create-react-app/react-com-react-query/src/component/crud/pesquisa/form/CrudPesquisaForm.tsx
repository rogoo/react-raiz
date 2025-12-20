import { FormEvent } from "react";
import { useNavigate } from "react-router";

interface FetchCompFormProp {
  primeiroNome: string;
  segundoNome: string;
  setPrimeiroNome: (n: string) => void;
  setSegundoNome: (n: string) => void;
  handleCarregarListaAuthor: () => void;
}
const CrudPesquisaForm = ({
  primeiroNome,
  segundoNome,
  setPrimeiroNome,
  setSegundoNome,
  handleCarregarListaAuthor,
}: FetchCompFormProp) => {
  const navigate = useNavigate();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCarregarListaAuthor();
  };

  const handleLimparCampos = () => {
    handleCarregarListaAuthor();
  };

  const handleCriacaoAuthor = () => {
    navigate("/crud/criar");
  };

  return (
    <>
      <h2>
        Uso do fetch API - <b>pesquisa</b>
      </h2>
      <form onSubmit={(e) => onSubmit(e)} className="form-container">
        <div>
          <label htmlFor="firstName">Primeiro Nome</label>
          <input
            type="text"
            name="firstName"
            value={primeiroNome}
            onChange={(e) => setPrimeiroNome(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Último Nome</label>
          <input
            value={segundoNome}
            type="text"
            name="lastName"
            onChange={(e) => setSegundoNome(e.target.value)}
          />
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

export default CrudPesquisaForm;
