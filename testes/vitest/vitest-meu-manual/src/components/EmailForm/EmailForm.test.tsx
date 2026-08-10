import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { sendEmail } from "../../api/emailApi";
import { TestCreateDeferred } from "../../setupTests";
import EmailForm from "./EmailForm";

// só `sendEmail` é mockada — o resto do módulo (SUBJECT_OPTIONS, RECIPIENT…)
// continua real, senão o <select> fica sem opções.
vi.mock("../../api/emailApi", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../api/emailApi")>();

  return {
    ...actual,
    sendEmail: vi.fn(),
  };
});

test("renders ok", () => {
  render(<EmailForm />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Fale Conosco",
  );
});

test("renders - check first render", () => {
  const { container } = render(<EmailForm />);

  const comboSubject = screen.getByRole("combobox", { name: "Subject *" });
  expect(comboSubject).toHaveValue("");

  const inputTitle = screen.getByLabelText("Title *");
  expect(inputTitle).toHaveAttribute("type", "text");
  expect(inputTitle).not.toHaveValue();

  const inputContent = screen.getByLabelText("Content *");
  expect(inputContent).not.toHaveValue();
  expect(inputContent.tagName).toBe("TEXTAREA");
  expect(inputContent).toHaveAttribute("rows", "8");

  // formas de verificar se span com css email-form__error não existe na página
  expect(
    container.querySelector("span.email-form__error"),
  ).not.toBeInTheDocument();
  expect(container.querySelector("span.email-form__error")).toBeNull();
  expect(container.querySelector("span.email-form__feedback")).toBeNull();
  expect(container.querySelector("span.email-form__failure")).toBeNull();

  expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Send" })).toHaveAttribute(
    "type",
    "submit",
  );
  expect(screen.getByRole("button", { name: "Limpar" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /limpar/i })).toHaveAttribute(
    "type",
    "button",
  );
});

test("renders - botão limpar - preenche campos e apaga campos", async () => {
  const user = userEvent.setup();
  render(<EmailForm />);

  // preenche campos
  const comboSubject = screen.getByRole("combobox", { name: "Subject *" });
  expect(comboSubject).toHaveValue("");
  await user.selectOptions(comboSubject, "congrats");
  expect(comboSubject).toHaveValue("congrats");

  const inputTitle = screen.getByLabelText("Title *");
  await user.type(inputTitle, "título");
  expect(inputTitle).toHaveValue("título");
  const inputContent = screen.getByLabelText("Content *");
  await user.type(inputContent, "conteúdo");
  expect(inputContent).toHaveValue("conteúdo");

  // apaga
  await user.click(screen.getByRole("button", { name: /limpar/i }));

  // valida se foi apagado
  expect(comboSubject).toHaveValue("");
  expect(inputTitle).not.toHaveValue();
  expect(inputContent).not.toHaveValue();
});

describe("Botão Send", () => {
  test("campos vazios - gera erros todos campos", async () => {
    const user = userEvent.setup();
    const { container } = render(<EmailForm />);

    // valida campos vazios
    const comboSubject = screen.getByRole("combobox", { name: "Subject *" });
    expect(comboSubject).toHaveValue("");
    const inputTitle = screen.getByLabelText("Title *");
    expect(inputTitle).toHaveValue("");
    const inputContent = screen.getByLabelText("Content *");
    expect(inputContent).toHaveValue("");

    // envia
    await user.click(screen.getByRole("button", { name: /send/i }));

    // valida todos campos
    expect(
      container.querySelector("span.email-form__error"),
    ).toBeInTheDocument();
    expect(screen.getByText(/subject is required./i)).toBeInTheDocument();
    expect(screen.getByText(/title is required./i)).toBeInTheDocument();
    expect(screen.getByText(/content is required./i)).toBeInTheDocument();
    expect(container.querySelectorAll("span.email-form__error")).toHaveLength(
      3,
    );
  });

  test("campos vazios - gera erro apenas campo content", async () => {
    const user = userEvent.setup();
    const { container } = render(<EmailForm />);

    // valida campos vazios
    const comboSubject = screen.getByRole("combobox", { name: "Subject *" });
    await user.selectOptions(comboSubject, "congrats");
    const inputTitle = screen.getByLabelText("Title *");
    await user.type(inputTitle, "titulo");
    const inputContent = screen.getByLabelText("Content *");
    expect(inputContent).toHaveValue("");

    // envia
    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(
      container.querySelector("span.email-form__error"),
    ).toBeInTheDocument();
    expect(screen.queryByText(/subject is required./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/title is required./i)).not.toBeInTheDocument();
    expect(screen.getByText(/content is required./i)).toBeInTheDocument();
  });

  test("campos vazios - gera erro apenas campo title", async () => {
    const user = userEvent.setup();
    const { container } = render(<EmailForm />);

    // valida campos vazios
    const comboSubject = screen.getByRole("combobox", { name: "Subject *" });
    await user.selectOptions(comboSubject, "congrats");
    const inputTitle = screen.getByLabelText("Title *");
    expect(inputTitle).toHaveValue("");
    const inputContent = screen.getByLabelText("Content *");
    await user.type(inputContent, "titulo");

    // envia
    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(
      container.querySelector("span.email-form__error"),
    ).toBeInTheDocument();
    expect(screen.queryByText(/subject is required./i)).not.toBeInTheDocument();
    expect(screen.getByText(/title is required./i)).toBeInTheDocument();
    expect(screen.queryByText(/content is required./i)).not.toBeInTheDocument();
  });

  test("campos vazios - gera erro apenas campo subject", async () => {
    const user = userEvent.setup();
    const { container } = render(<EmailForm />);

    // valida campos vazios
    const inputTitle = screen.getByLabelText("Title *");
    await user.type(inputTitle, "titulo");
    const inputContent = screen.getByLabelText("Content *");
    await user.type(inputContent, "titulo");

    // envia
    await user.click(screen.getByRole("button", { name: /send/i }));

    // valida todos campos
    expect(
      container.querySelector("span.email-form__error"),
    ).toBeInTheDocument();
    expect(screen.getByText(/subject is required./i)).toBeInTheDocument();
    expect(screen.queryByText(/title is required./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/content is required./i)).not.toBeInTheDocument();
  });

  test("todos campos preenchidos - botao troca label para 'Sending...' e ficar desabilitado", async () => {
    const user = userEvent.setup();
    const deferred = TestCreateDeferred();
    vi.mocked(sendEmail).mockReturnValue(deferred.promise);

    render(<EmailForm />);

    // carrega campos para passar valicação botão send
    const comboSubject = screen.getByRole("combobox", { name: "Subject *" });
    await user.selectOptions(comboSubject, "congrats");
    const inputTitle = screen.getByLabelText("Title *");
    await user.type(inputTitle, "titulo");
    const inputContent = screen.getByLabelText("Content *");
    await user.type(inputContent, "titulo");

    const bttSend = screen.getByRole("button", { name: "Send" });

    // envia — a promise fica pendente, então o form continua "sending"
    await user.click(bttSend);

    // valida label trocada (é o mesmo nó, só o texto muda)
    expect(bttSend).toHaveTextContent("Sending...");
    expect(bttSend).toBeDisabled();
    expect(screen.getByRole("button", { name: "Limpar" })).toBeDisabled();

    // conclui o envio e valida a volta ao estado normal
    deferred.resolve();

    expect(
      await screen.findByText("Mensagem Enviada Sucessinho."),
    ).toBeVisible();

    expect(bttSend).toHaveTextContent("Send");
    expect(bttSend).toBeEnabled();
  });

  test("rejeitado com erro", async () => {
    const user = userEvent.setup();
    const def = TestCreateDeferred();
    vi.mocked(sendEmail).mockReturnValue(def.promise);

    render(<EmailForm />);

    const comboSubject = screen.getByRole("combobox", { name: "Subject *" });
    await user.selectOptions(comboSubject, "congrats");
    const inputTitle = screen.getByLabelText("Title *");
    await user.type(inputTitle, "titulo");
    const inputContent = screen.getByLabelText("Content *");
    await user.type(inputContent, "titulo");

    await user.click(screen.getByRole("button", { name: /send/i }));

    def.reject(new Error("caca"));

    expect(
      await screen.findByText(/The e-mail could not be sent: caca/i),
    ).toBeVisible();
  });
});
