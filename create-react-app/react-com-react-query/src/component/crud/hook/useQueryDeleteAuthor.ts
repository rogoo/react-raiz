import { useMutation, useQueryClient } from "@tanstack/react-query";
import { excluirAuthor } from "service/AuthorService";

const useQueryDeleteAuthor = () => {
  const qclient = useQueryClient();
  return useMutation({
    mutationFn: excluirAuthor,
    onSuccess: () => qclient.invalidateQueries({ queryKey: ["listAuthor"] }),
  });
};

export default useQueryDeleteAuthor;
