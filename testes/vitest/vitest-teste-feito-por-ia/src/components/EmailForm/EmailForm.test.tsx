import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RECIPIENT, sendEmail } from "../../api/emailApi";
import { deferred } from "../../test/utils";
import EmailForm from "./EmailForm";

// Only the network call is faked; the real error formatter stays in place.
vi.mock("../../api/emailApi", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../../api/emailApi")>()),
  sendEmail: vi.fn(),
}));

function subjectField() {
  return screen.getByLabelText("Subject *");
}

function titleField() {
  return screen.getByLabelText("Title *");
}

function contentField() {
  return screen.getByLabelText("Content *");
}

function sendButton() {
  return screen.getByRole("button", { name: /send/i });
}

async function fillIn(user: ReturnType<typeof userEvent.setup>) {
  await user.selectOptions(subjectField(), "doubt");
  await user.type(titleField(), "  Where is my order?  ");
  await user.type(contentField(), "  It never arrived.  ");
}

beforeEach(() => {
  vi.mocked(sendEmail).mockResolvedValue(undefined);
});

describe("the form", () => {
  it("renders the placeholder plus every supported subject", () => {
    render(<EmailForm />);

    const options = Array.from(subjectField().querySelectorAll("option")).map(
      (option) => option.textContent,
    );

    expect(options).toEqual([
      "Selecione",
      "congrats",
      "not received",
      "error",
      "doubt",
    ]);
    expect(subjectField()).toHaveValue("");
  });

  it("renders the heading and the two action buttons", () => {
    render(<EmailForm />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Fale Conosco" }),
    ).toBeInTheDocument();
    expect(sendButton()).toBeEnabled();
    expect(screen.getByRole("button", { name: "Limpar" })).toBeEnabled();
  });
});

describe("validation", () => {
  it("requires all three fields", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    await user.click(sendButton());

    expect(screen.getByText("Subject is required.")).toBeInTheDocument();
    expect(screen.getByText("Title is required.")).toBeInTheDocument();
    expect(screen.getByText("Content is required.")).toBeInTheDocument();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("marks every invalid field", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    await user.click(sendButton());

    for (const field of [subjectField(), titleField(), contentField()]) {
      expect(field).toHaveClass("input--invalid");
      expect(field).toHaveAttribute("aria-invalid", "true");
    }
  });

  it("treats whitespace-only text as missing", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    await user.selectOptions(subjectField(), "error");
    await user.type(titleField(), "   ");
    await user.type(contentField(), "   ");
    await user.click(sendButton());

    expect(screen.queryByText("Subject is required.")).toBeNull();
    expect(screen.getByText("Title is required.")).toBeInTheDocument();
    expect(screen.getByText("Content is required.")).toBeInTheDocument();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("stays quiet until the first submit", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    await user.type(titleField(), "Hi");

    expect(screen.queryByText("Content is required.")).toBeNull();
    expect(contentField()).not.toHaveClass("input--invalid");
  });

  it("re-validates on every change once submitted", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    await user.click(sendButton());
    await user.type(titleField(), "Hi");

    expect(screen.queryByText("Title is required.")).toBeNull();
    expect(screen.getByText("Content is required.")).toBeInTheDocument();
  });
});

describe("sending", () => {
  it("posts the trimmed message to the fixed recipient", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    await fillIn(user);
    await user.click(sendButton());

    expect(sendEmail).toHaveBeenCalledWith({
      to: RECIPIENT,
      subject: "doubt",
      title: "Where is my order?",
      content: "It never arrived.",
    });
  });

  it("confirms and empties the form on success", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    await fillIn(user);
    await user.click(sendButton());

    expect(
      await screen.findByText("Message sent successfully."),
    ).toBeInTheDocument();
    expect(subjectField()).toHaveValue("");
    expect(titleField()).toHaveValue("");
    expect(contentField()).toHaveValue("");
    expect(subjectField()).not.toHaveClass("input--invalid");
  });

  it("disables the buttons and relabels while in flight", async () => {
    const user = userEvent.setup();
    const request = deferred<void>();
    vi.mocked(sendEmail).mockReturnValue(request.promise);

    render(<EmailForm />);

    await fillIn(user);
    await user.click(sendButton());

    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Limpar" })).toBeDisabled();

    await act(async () => {
      request.resolve();
    });

    expect(screen.getByRole("button", { name: "Send" })).toBeEnabled();
  });

  it("shows the formatted API error and keeps what was typed", async () => {
    const user = userEvent.setup();
    const config = { headers: {} } as InternalAxiosRequestConfig;
    const failure = new AxiosError(
      "Request failed with status code 500",
      "ERR_BAD_RESPONSE",
      config,
      {},
      {
        status: 500,
        statusText: "Internal Server Error",
        data: { message: "SMTP refused the message" },
        headers: {},
        config,
      } as AxiosResponse,
    );
    vi.mocked(sendEmail).mockRejectedValue(failure);

    render(<EmailForm />);

    await fillIn(user);
    await user.click(sendButton());

    expect(
      await screen.findByText(
        "The e-mail could not be sent: 500 Internal Server Error: SMTP refused the message",
      ),
    ).toBeInTheDocument();
    expect(titleField()).toHaveValue("  Where is my order?  ");
    expect(screen.queryByText("Message sent successfully.")).toBeNull();
  });

  it("falls back to the message of a plain error", async () => {
    const user = userEvent.setup();
    vi.mocked(sendEmail).mockRejectedValue(new Error("offline"));

    render(<EmailForm />);

    await fillIn(user);
    await user.click(sendButton());

    expect(
      await screen.findByText("The e-mail could not be sent: offline"),
    ).toBeInTheDocument();
  });
});

describe("the Limpar button", () => {
  it("empties the fields and drops the validation errors", async () => {
    const user = userEvent.setup();
    render(<EmailForm />);

    await user.click(sendButton());
    await user.type(titleField(), "Something");
    await user.click(screen.getByRole("button", { name: "Limpar" }));

    expect(titleField()).toHaveValue("");
    expect(screen.queryByText("Content is required.")).toBeNull();
    expect(contentField()).not.toHaveClass("input--invalid");
  });

  it("clears a failure message too", async () => {
    const user = userEvent.setup();
    vi.mocked(sendEmail).mockRejectedValue(new Error("offline"));

    render(<EmailForm />);

    await fillIn(user);
    await user.click(sendButton());
    await screen.findByText("The e-mail could not be sent: offline");

    await user.click(screen.getByRole("button", { name: "Limpar" }));

    expect(screen.queryByText(/could not be sent/)).toBeNull();
  });
});

describe("the feedback timeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("clears the success message after 2.5 seconds", async () => {
    render(<EmailForm />);

    // fireEvent instead of user-event: it never waits on the faked clock.
    fireEvent.change(subjectField(), { target: { value: "congrats" } });
    fireEvent.change(titleField(), { target: { value: "Nice work" } });
    fireEvent.change(contentField(), { target: { value: "Really nice work" } });

    await act(() => fireEvent.submit(titleField().closest("form")!));

    expect(screen.getByText("Message sent successfully.")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2499);
    });
    expect(screen.getByText("Message sent successfully.")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.queryByText("Message sent successfully.")).toBeNull();
  });
});
