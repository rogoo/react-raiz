"use client";

import { useState } from "react";
import AbaCount from "./AbaCount";
import AbaForm from "./AbaForm";

const Aba = {
  Count: "COUNT",
  Form: "FORM",
} as const;

type Aba = (typeof Aba)[keyof typeof Aba];

const TestUseActionState = () => {
  const [aba, setAba] = useState<Aba>(Aba.Count);

  return (
    <>
      <p>
        Facilita o gerenciamento de atualizações assíncronas de estado em
        componentes React. Não precisa ter várias variáveis para gerenciar o
        carregamento, erro, etc.
      </p>
      <a
        href="#"
        onClick={() => setAba(Aba.Count)}
        style={{ margin: "0.5rem" }}
      >
        Simples Contador
      </a>
      |
      <a href="#" onClick={() => setAba(Aba.Form)} style={{ margin: "0.5rem" }}>
        Formulário
      </a>
      {aba === Aba.Count ? <AbaCount /> : <AbaForm />}
    </>
  );
};

export default TestUseActionState;
