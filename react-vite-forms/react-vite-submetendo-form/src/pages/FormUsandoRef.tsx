import { useRef } from "react";

const FormUsandoRef = () => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputTelefoneRef = useRef<HTMLInputElement>(null);

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form usando useRef");
    console.log("Nome:", inputNameRef.current?.value);
    console.log("Telefone:", inputTelefoneRef.current?.value);
  };

  return (
    <div>
      <h3>Form usando useRef</h3>
      <form onSubmit={onSubmitForm}>
        <input ref={inputNameRef} type="text" placeholder="nome" name="nome" />
        <input
          ref={inputTelefoneRef}
          type="text"
          placeholder="telefone"
          name="telefone"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormUsandoRef;
