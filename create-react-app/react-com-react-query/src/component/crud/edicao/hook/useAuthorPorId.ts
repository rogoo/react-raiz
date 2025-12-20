import { useCallback, useEffect, useState } from "react";
import { pesquisaAuthorServ } from "service/AuthorService";
import { IAuthor } from "../../../../type/types";

export const useAuthorPorId = (idAuthor: number) => {
  const [author, setAuthor] = useState<IAuthor>({} as IAuthor);

  const carregaAuthorPorId = useCallback((id: number) => {
    try {
      pesquisaAuthorServ(id)
        .then((data: any) => setAuthor(data))
        .catch((e) => console.error(e));
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    carregaAuthorPorId(idAuthor);
  }, [idAuthor, carregaAuthorPorId]);

  return { author, setAuthor };
};
