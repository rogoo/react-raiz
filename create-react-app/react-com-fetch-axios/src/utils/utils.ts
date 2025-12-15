export const converteDateToString = (data: Date) => {
  return data && data instanceof Date
    ? adicionaZeroEsqueda(data.getDate(), 2) +
        "/" +
        adicionaZeroEsqueda(data.getMonth(), 2) +
        "/" +
        data.getFullYear()
    : "";
};

export const adicionaZeroEsqueda = (valor: any, size: number) => {
  return valor
    ? String(valor).padStart(size, "0")
    : String("0").padStart(size, "0");
};

export const apenasPrimeiraLetraMaiuscula = (texto: string) => {
  if (!texto || texto.length <= 1) {
    return texto;
  }

  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

export const recuperaPrimeiraLetra = (texto: string) => {
  return texto && texto.length > 0 ? texto.charAt(0) : "";
};

export const campoVazio = (valor: any) => {
  return (
    valor === null ||
    valor === undefined ||
    (typeof valor === "string" && valor.trim().length === 0)
  );
};
