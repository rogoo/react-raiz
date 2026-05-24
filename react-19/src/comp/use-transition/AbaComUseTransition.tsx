import { useState, useTransition } from "react";
import { LISTA_TAMANHO } from "../../util/Constantes";

const AbaComUseTransition = () => {
  const [name, setName] = useState<string>("");
  const [lista, setLista] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    startTransition(() => {
      const novaLista = Array.from(
        { length: LISTA_TAMANHO },
        (_, i) => `${e.target.value} ${i + 1}`,
      );
      setLista(novaLista);
    });
  };

  return (
    <div>
      <p>
        Esta aba utiliza o hook useTransition (no carregamento da lista). Com
        isso, a prioridade da lista é baixa e a interface permanece responsiva
        ao digitar.
      </p>
      <input value={name} onChange={handleChange} />
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {lista.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AbaComUseTransition;
