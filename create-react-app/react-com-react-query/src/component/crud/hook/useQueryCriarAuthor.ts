import { useMutation, useQueryClient } from "@tanstack/react-query";
import { criarAuthor } from "service/AuthorService";

const useQueryCriarAuthor = () => {
  const qclient = useQueryClient();
  return useMutation({
    mutationFn: criarAuthor,
    onSuccess: () => qclient.invalidateQueries({ queryKey: ["listAuthor"] }),
  });
};

export default useQueryCriarAuthor;
