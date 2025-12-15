import { useApi } from "context/ApiContext";
import { useCallback, useEffect, useState } from "react";
import { IAuthor } from "../../../../type/types";

export const useAuthorPorId = (idAuthor: number) => {
  const [author, setAuthor] = useState<IAuthor>({} as IAuthor);
  const { currentApi } = useApi();

  const carregaAuthorPorId = useCallback(
    (id: number) => {
      try {
        currentApi
          .pesquisaAuthorServ(id)
          .then((data: any) => setAuthor(data))
          .catch((e) => console.error(e));
      } catch (err) {
        console.error(err);
      }
    },
    [currentApi]
  );

  useEffect(() => {
    carregaAuthorPorId(idAuthor);
  }, [idAuthor, carregaAuthorPorId]);

  return { author, setAuthor };
};
