import { useState } from "react";
import { LISTA_TAMANHO } from "../../util/Constantes";

const AbaSemUseTransition = () => {
  const [name, setName] = useState<string>("");
  const [lista, setLista] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    const novaLista = Array.from(
      { length: LISTA_TAMANHO },
      (_, i) => `${e.target.value} ${i + 1}`,
    );
    setLista(novaLista);
  };

  return (
    <div>
      <p>
        Esta aba não utiliza o hook useTransition. Portanto a prioridade da
        lista é alta e a interface pode ficar lenta ao digitar.
      </p>
      <input value={name} onChange={handleChange} />
      <ul>
        {lista.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default AbaSemUseTransition;
