import { useApi } from "context/ApiContext";
import { useCallback, useEffect, useState } from "react";
import { IAuthor } from "../../../../type/types";

export const useAuthor = (pnome = "", lnome = "") => {
  const [listAuthor, setListAuthor] = useState<IAuthor[]>([]);
  const { currentApi } = useApi();

  const carregarListaAuthor = useCallback(
    (primeiroNome: string, ultimoNome: string) => {
      currentApi
        .listaAuthorServ(primeiroNome, ultimoNome)
        .then((data) => setListAuthor(data))
        .catch((e) => console.error(e));
    },
    [currentApi]
  );

  useEffect(() => {
    carregarListaAuthor(pnome, lnome);
  }, [pnome, lnome, carregarListaAuthor]);

  return { listAuthor, carregarListaAuthor };
};
