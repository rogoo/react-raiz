import type { ChangeEvent, SubmitEvent } from "react";
import { useEffect, useState } from "react";
import {
  RECIPIENT,
  SUBJECT_OPTIONS,
  getEmailErrorMessage,
  sendEmail,
  type EmailSubjectOptionType,
} from "../../api/emailApi";
import { isBlank } from "../../utils/util";
import "./EmailForm.css";

interface EmailFormValues {
  subject: EmailSubjectOptionType | "";
  title: string;
  content: string;
}

type EmailFormErrors = Partial<Record<keyof EmailFormValues, string>>;

const FEEDBACK_TIMEOUT_MS = 2500;

const EMPTY_FORM: EmailFormValues = {
  subject: "",
  title: "",
  content: "",
};

function validate(values: EmailFormValues): EmailFormErrors {
  const errors: EmailFormErrors = {};

  if (values.subject === "") {
    errors.subject = "Subject is required.";
  }

  if (isBlank(values.title)) {
    errors.title = "Title is required.";
  }

  if (isBlank(values.content)) {
    errors.content = "Content is required.";
  }

  return errors;
}

function EmailForm() {
  const [formValues, setFormValues] = useState<EmailFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<EmailFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [failure, setFailure] = useState("");

  useEffect(() => {
    if (feedback === "") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback("");
    }, FEEDBACK_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [feedback]);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;
    const nextValues = { ...formValues, [name]: value };
    setFormValues(nextValues);

    if (submitted) {
      setErrors(validate(nextValues));
    }
  }

  function handleClear() {
    setFormValues(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
    setFeedback("");
    setFailure("");
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setFeedback("");
    setFailure("");

    const nextErrors = validate(formValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || formValues.subject === "") {
      return;
    }

    setSending(true);

    try {
      await sendEmail({
        to: RECIPIENT,
        subject: formValues.subject,
        title: formValues.title.trim(),
        content: formValues.content.trim(),
      });

      setFeedback("Mensagem Enviada Sucessinho.");
      setFormValues(EMPTY_FORM);
      setErrors({});
      setSubmitted(false);
    } catch (error) {
      setFailure(
        `The e-mail could not be sent: ${getEmailErrorMessage(error)}`,
      );
    } finally {
      setSending(false);
    }
  }

  const subjectInvalid = !!errors.subject;
  const titleInvalid = !!errors.title;
  const contentInvalid = !!errors.content;

  return (
    <section className="email-form">
      <h1>Fale Conosco</h1>

      <form className="email-form__form" onSubmit={handleSubmit} noValidate>
        <div className="email-form__field">
          <label htmlFor="email-subject">Subject *</label>
          <select
            id="email-subject"
            name="subject"
            value={formValues.subject}
            onChange={handleChange}
            className={subjectInvalid ? "input--invalid" : ""}
            aria-invalid={subjectInvalid}
          >
            <option value="" selected>
              Selecione
            </option>
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {subjectInvalid && (
            <span className="email-form__error">{errors.subject}</span>
          )}
        </div>

        <div className="email-form__field">
          <label htmlFor="email-title">Title *</label>
          <input
            id="email-title"
            name="title"
            type="text"
            value={formValues.title}
            onChange={handleChange}
            className={titleInvalid ? "input--invalid" : ""}
            aria-invalid={titleInvalid}
          />
          {titleInvalid && (
            <span className="email-form__error">{errors.title}</span>
          )}
        </div>

        <div className="email-form__field">
          <label htmlFor="email-content">Content *</label>
          <textarea
            id="email-content"
            name="content"
            rows={8}
            value={formValues.content}
            onChange={handleChange}
            className={contentInvalid ? "input--invalid" : ""}
            aria-invalid={contentInvalid}
          />
          {contentInvalid && (
            <span className="email-form__error">{errors.content}</span>
          )}
        </div>

        <div className="email-form__actions">
          <button type="submit" disabled={sending}>
            {sending ? "Sending..." : "Send"}
          </button>
          <button
            type="button"
            className="button--ghost"
            onClick={handleClear}
            disabled={sending}
          >
            Limpar
          </button>
        </div>
      </form>

      {feedback && <p className="email-form__feedback">{feedback}</p>}
      {failure && <p className="email-form__failure">{failure}</p>}
    </section>
  );
}

export default EmailForm;
