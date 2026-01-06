interface Props {
  nome: string;
  telefone: string;
  idade: number;
}

const FormUsandoFormDataSemZod = () => {
  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form usando FormData sem Zod");

    const formData = new FormData(event.currentTarget);

    console.log("FormData object:", formData);
    console.log("Nome:", formData.get("nome"));
    console.log("Telefone:", formData.get("telefone"));
    console.log("Idade:", formData.get("idade"));

    const formValues = Object.fromEntries(formData);
    console.log("Object fromEntries:", formValues);

    const propsValues: Props = {
      nome: String(formValues.nome),
      telefone: String(formValues.telefone),
      //idade: Number(formValues.idade),
      idade: parseInt(formValues.idade as string) || 0,
    };
    console.log("Props typed object:", propsValues);
  };

  return (
    <div>
      <h3>Form usando FormData sem Zod</h3>
      <form onSubmit={onSubmitForm}>
        <input type="text" placeholder="nome" name="nome" />
        <input type="text" placeholder="telefone" name="telefone" />
        <input type="text" placeholder="idade" name="idade" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormUsandoFormDataSemZod;
