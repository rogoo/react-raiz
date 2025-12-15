import { useApi } from "context/ApiContext";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import useMensagemErro from "../../../../shared/hook/useMensagemErro";
import Mensagem from "../../../../shared/mensagem/Mensagem";
import { IAuthor } from "../../../../type/types";
import { VALOR_COMBO_SEXO } from "../../../../utils/contantes";
import { campoVazio, recuperaPrimeiraLetra } from "../../../../utils/utils";

const FetchCompCriacaoForm = () => {
  const [author, setAuthor] = useState<IAuthor>({} as IAuthor);
  const { criarMensagemErro, mensagem, mensagemCSS } = useMensagemErro();
  const navigate = useNavigate();
  const { currentApi } = useApi();

  const handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setAuthor({ ...author, [target.name]: value });
  };

  const algumCampoObrigatorioNaoPreenchido = () => {
    return (
      campoVazio(author.firstName) ||
      campoVazio(author.lastName) ||
      campoVazio(author.birthday) ||
      campoVazio(author.sexo)
    );
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (algumCampoObrigatorioNaoPreenchido()) {
      criarMensagemErro("Campo obrigatório não preenchido");
    } else {
      try {
        currentApi
          .criarAuthor(author)
          .then((resp: any) => {
            if (!resp.ok) {
              resp
                .text()
                .then((data: any) =>
                  criarMensagemErro(JSON.parse(data).message)
                );
            } else {
              navigate("/fetchComp");
            }
          })
          .catch((err: any) => criarMensagemErro(err));
      } catch (error: unknown) {
        if (error instanceof Error) {
          criarMensagemErro(error.message);
        }
      }
    }
  };

  return (
    <>
      <Mensagem mensagem={mensagem} mensagemCSS={mensagemCSS} />
      <form onSubmit={(e) => onSubmit(e)} className="form-container">
        <div>
          <label htmlFor="firstName">Primeiro Nome</label>
          <input
            type="text"
            name="firstName"
            value={author.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Último Nome</label>
          <input
            type="text"
            name="lastName"
            value={author.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="birthday">Data Nascimento</label>
          <input
            type="text"
            name="birthday"
            value={author.birthday}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="active">Ativo?</label>
          <input
            type="checkbox"
            name="active"
            checked={author.active}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="sexo">Sexo</label>
          <select
            name="sexo"
            value={recuperaPrimeiraLetra(author.sexo)}
            onChange={handleInputChange}
          >
            <option value="">::selecione::</option>
            {VALOR_COMBO_SEXO.map((e) => (
              <option key={e.valor} value={e.valor}>
                {e.texto}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button>Criar</button>
        <button type="button" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </form>
    </>
  );
};

export default FetchCompCriacaoForm;
