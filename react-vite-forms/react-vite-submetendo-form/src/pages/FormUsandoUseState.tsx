import { useState } from "react";

const FormUsandoUseState = () => {
  const [name, setName] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form usando useState");
    console.log("Nome:", name);
    console.log("Telefone:", telefone);
  };

  return (
    <div>
      <h3>Form usando useState</h3>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="nome"
          name="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="telefone"
          name="telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormUsandoUseState;
