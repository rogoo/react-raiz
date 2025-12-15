import { IApiService, IAuthor } from "../type/types";

const baseAuthorUrl = "/authors";

const listaAuthorServ = async (
  firstName: string | null,
  lastName: string | null
) => {
  console.log("usando FETCH");
  const response = await fetch(
    `${baseAuthorUrl}?firstName=${firstName}&lastName=${lastName}`
  );
  return await response.json();
};

const pesquisaAuthorServ = async (idAuthor: number) => {
  console.log("usando FETCH");
  const response = await fetch(`${baseAuthorUrl}/${idAuthor}`);
  return await response.json();
};

const atualizarAuthor = async (author: IAuthor) => {
  console.log("usando FETCH");
  const response = await fetch(`${baseAuthorUrl}/${author.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(author),
  });
  return await response.json();
};

const criarAuthor = async (author: IAuthor) => {
  console.log("usando FETCH");
  const response = await fetch(`${baseAuthorUrl}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(author),
  });
  return response;
};

export const excluirAuthor = async (idAuthor: number) => {
  console.log("usando FETCH");
  return await fetch(`${baseAuthorUrl}/${idAuthor}`, { method: "DELETE" });
};

const AuthorServiceFetch: IApiService = {
  listaAuthorServ,
  pesquisaAuthorServ,
  atualizarAuthor,
  criarAuthor,
  excluirAuthor,
};

export default AuthorServiceFetch;
