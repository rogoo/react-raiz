export interface IAuthor {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  active: boolean;
  sexo: string;
  naoPossuiPosts: boolean;
}

export interface ITextoValor {
  valor: string;
  texto: string;
}

export interface IMensagemSistema {
  texto: string;
  tipo: "WARN" | "SUCCESS" | "ERROR";
}

export interface IApiService {
  listaAuthorServ: (
    firstName: string | null,
    lastName: string | null
  ) => Promise<any[]>;
  pesquisaAuthorServ: (idAuthor: number) => Promise<any>;
  atualizarAuthor: (author: IAuthor) => Promise<any>;
  criarAuthor: (author: IAuthor) => Promise<any>;
  excluirAuthor: (idAuthor: number) => Promise<any>;
}
