import { useQuery } from "@tanstack/react-query";
import { listaAuthor } from "service/AuthorService";

const useQueryListaAuthor = (pnome = "", lnome = "") => {
  return useQuery({
    queryKey: ["listAuthor", pnome, lnome],
    queryFn: () => listaAuthor(pnome ?? "", lnome ?? ""),
    staleTime: 30000,
  });
};

export default useQueryListaAuthor;
