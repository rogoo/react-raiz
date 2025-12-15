import { IApiService, IAuthor } from "../type/types";
import api from "./http-conn";

const baseAuthorUrl = "/authors";

const listaAuthorServ = async (
  firstName: string | null,
  lastName: string | null
) => {
  console.log("usando AXIOS");
  const response = await api.get(
    `${baseAuthorUrl}?firstName=${firstName}&lastName=${lastName}`
  );
  return response.data;
};

const pesquisaAuthorServ = async (idAuthor: number) => {
  console.log("usando AXIOS");
  const response = await fetch(`${baseAuthorUrl}/${idAuthor}`);
  return await response.json();
};

const atualizarAuthor = async (author: IAuthor) => {
  console.log("usando AXIOS");
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
  console.log("usando AXIOS");
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
  console.log("usando AXIOS");
  return await fetch(`${baseAuthorUrl}/${idAuthor}`, { method: "DELETE" });
};

const AuthorServiceAxios: IApiService = {
  listaAuthorServ,
  pesquisaAuthorServ,
  atualizarAuthor,
  criarAuthor,
  excluirAuthor,
};

export default AuthorServiceAxios;
