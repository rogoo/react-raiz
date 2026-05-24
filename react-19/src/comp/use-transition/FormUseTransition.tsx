import { useState } from "react";
import AbaComUseTransition from "./AbaComUseTransition";
import AbaSemUseTransition from "./AbaSemUseTransition";

const Aba = {
  SemUseTransition: "SemUseTransition",
  ComUseTransition: "ComUseTransition",
} as const;

type Aba = (typeof Aba)[keyof typeof Aba];

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
