import { formSchema } from "../util/schemas";

interface Props {
  nome: string;
  telefone: string;
  idade: number;
}

const FormUsandoFormDataComZod = () => {
  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form usando FormData com Zod");

    const formData = new FormData(event.currentTarget);

    console.log("FormData object:", formData);
    console.log("Nome:", formData.get("nome"));
    console.log("Telefone:", formData.get("telefone"));
    console.log("Idade:", formData.get("idade"));

    const formValues = Object.fromEntries(formData);
    const resultComZod = formSchema.safeParse(formValues);
    console.log("schema Zod:", resultComZod);

    if (resultComZod.success) {
      // Aqui temos validação do dado, com autocomplete das propriedades
      //resultComZod.data.
      const propsValues: Props = {
        nome: resultComZod.data.nome,
        telefone: resultComZod.data.telefone,
        idade: resultComZod.data.idade,
      };
      console.log("SUCESSO");
      console.log("Props typed object:", propsValues);
    } else {
      console.error(
        "Erros de validação: \n" +
          resultComZod.error.issues.map((issue) => issue.message).join("\n"),
      );
    }
  };

  return (
    <div>
      <h3>Form usando FormData COM Zod</h3>
      <form onSubmit={onSubmitForm}>
        <input type="text" placeholder="nome" name="nome" />
        <input type="text" placeholder="telefone" name="telefone" />
        <input type="text" placeholder="idade" name="idade" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormUsandoFormDataComZod;
