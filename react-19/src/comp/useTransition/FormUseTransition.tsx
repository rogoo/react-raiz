import { useState } from "react";
import AbaComUseTransition from "./AbaComUseTransition";
import AbaSemUseTransition from "./AbaSemUseTransition";

enum Aba {
  SemUseTransition,
  ComUseTransition,
}

const FormUseTransition = () => {
  const [aba, setAba] = useState<Aba>(Aba.SemUseTransition);

  return (
    <div>
      <a
        href="#"
        onClick={() => setAba(Aba.SemUseTransition)}
        style={{ margin: ".5rem" }}
      >
        Sem useTransition
      </a>
      |
      <a
        href="#"
        onClick={() => setAba(Aba.ComUseTransition)}
        style={{ margin: ".5rem" }}
      >
        Com useTransition
      </a>
      {aba === Aba.SemUseTransition ? (
        <AbaSemUseTransition />
      ) : (
        <AbaComUseTransition />
      )}
    </div>
  );
};

export default FormUseTransition;
