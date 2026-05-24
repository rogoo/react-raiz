import { useActionState } from "react";
import { z } from "zod";

interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  data?: {
    name?: string;
    email?: string;
  };
}

const FormSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
});

type FormDataType = z.infer<typeof FormSchema>;

const submitForm = async (_: ActionResult, formData: FormData) => {
  const raw = Object.fromEntries(formData.entries());
  const parsed = FormSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((iss) => {
      errors[iss.path[0] as string] = iss.message;
    });
    return {
      success: false,
      message: "Erro! Por favor, corrija os erros no formulário.",
      data: {
        name: String(raw.name || ""),
        email: String(raw.email || ""),
      },
      errors,
    };
  }

  await new Promise((res) => setTimeout(res, 1000));

  const data: FormDataType = parsed.data;

  return {
    success: true,
    message: `Sucesso! Para ${data.name} foi cadastrado o email ${data.email}.`,
    data: { name: "", email: "" },
  };
};

const initialState: ActionResult = {
  success: false,
  message: "",
};

const AbaForm = () => {
  const [state, formAction, isPending] = useActionState<ActionResult, FormData>(
    submitForm,
    initialState,
  );

  return (
    <form action={formAction}>
      {state.message && <p>{state.message}</p>}
      <div>
        <input
          name="name"
          placeholder="Name"
          type="text"
          autoComplete="off"
          defaultValue={state.data?.name}
          className={state.errors?.name && "redBorder"}
        />
        {state.errors?.name && (
          <>
            <br />
            <span style={{ color: "red" }}>{state.errors.name}</span>
          </>
        )}
      </div>
      <div>
        <input
          name="email"
          placeholder="Email"
          type="text"
          autoComplete="off"
          defaultValue={state.data?.email}
          className={state.errors?.email && "redBorder"}
        />
        {state.errors?.email && (
          <>
            <br />
            <span style={{ color: "red" }}>{state.errors.email}</span>
          </>
        )}
      </div>

      <button disabled={isPending} className={isPending ? "gray" : ""}>
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AbaForm;
