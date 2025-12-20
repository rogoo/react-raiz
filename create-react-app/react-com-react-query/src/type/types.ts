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
