import z from "zod";

export const formSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  telefone: z.string(),
  idade: z.coerce
    .number()
    .min(1, "Idade deve ser maior do que 1")
    .max(120, "Idade deve ser menor ou igual a 120"),
});
