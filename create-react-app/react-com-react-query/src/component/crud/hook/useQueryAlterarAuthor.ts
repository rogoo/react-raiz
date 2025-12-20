import { useMutation, useQueryClient } from "@tanstack/react-query";
import { atualizarAuthor } from "service/AuthorService";

const useQueryAlterarAuthor = () => {
  const qclient = useQueryClient();
  return useMutation({
    mutationFn: atualizarAuthor,
    onSuccess: () => qclient.invalidateQueries({ queryKey: ["listAuthor"] }),
  });
};

export default useQueryAlterarAuthor;
