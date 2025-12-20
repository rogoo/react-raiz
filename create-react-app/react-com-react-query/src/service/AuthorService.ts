import axios from "axios";
import { IAuthor } from "../type/types";

const baseAuthorUrl = "/authors";

export const listaAuthor = async (
  firstName: string | null,
  lastName: string | null
) => {
  const response = await axios.get(
    `${baseAuthorUrl}?firstName=${firstName}&lastName=${lastName}`
  );
  return await response.data;
};

export const pesquisaAuthorServ = async (idAuthor: number) => {
  return (await axios.get(`${baseAuthorUrl}/${idAuthor}`)).data;
};

export const atualizarAuthor = async (author: IAuthor) => {
  return axios.patch(`${baseAuthorUrl}/${author.id}`, author);
};

export const criarAuthor = async (author: IAuthor) => {
  return (await axios.put(`${baseAuthorUrl}`, author)).data;
};

export const excluirAuthor = async (idAuthor: number) => {
  return await axios.delete(`${baseAuthorUrl}/${idAuthor}`);
};
