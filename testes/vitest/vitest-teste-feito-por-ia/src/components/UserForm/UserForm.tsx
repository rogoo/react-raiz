import type { ChangeEvent, SubmitEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUser, updateUser } from "../../api/userApi";
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  type UserFormErrors,
  type UserFormValues,
} from "../../types/user";
import { isBlank, isValidEmail } from "../../utils/util";
import "./UserForm.css";

const EMPTY_FORM: UserFormValues = { name: "", email: "" };

function validate(values: UserFormValues): UserFormErrors {
  const errors: UserFormErrors = {};

  if (isBlank(values.name)) {
    errors.name = "Name is required.";
  } else if (values.name.trim().length > NAME_MAX_LENGTH) {
    errors.name = `Name must have at most ${NAME_MAX_LENGTH} characters.`;
  }

  if (isBlank(values.email)) {
    errors.email = "E-mail is required.";
  } else if (values.email.trim().length > EMAIL_MAX_LENGTH) {
    errors.email = `E-mail must have at most ${EMAIL_MAX_LENGTH} characters.`;
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please inform a valid e-mail address.";
  }

  return errors;
}

function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const editingId = id === undefined ? null : Number(id);

  const [values, setValues] = useState<UserFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<UserFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [failure, setFailure] = useState("");

  useEffect(() => {
    if (editingId === null) {
      setValues(EMPTY_FORM);
      return;
    }

    let active = true;
    setLoading(true);
    setFailure("");

    getUser(editingId)
      .then((user) => {
        if (active) {
          setValues({ name: user.name, email: user.email });
        }
      })
      .catch(() => {
        if (active) {
          setFailure(`Could not load user #${editingId}.`);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [editingId]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    if (submitted) {
      setErrors(validate(nextValues));
    }
  }

  function handleCancel() {
    void navigate("/users");
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setFailure("");

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload: UserFormValues = {
      name: values.name.trim(),
      email: values.email.trim(),
    };

    setSaving(true);

    try {
      if (editingId === null) {
        await createUser(payload);
        void navigate("/users");
      } else {
        await updateUser(editingId, payload);
        void navigate("/users", {
          state: { feedback: `User #${editingId} updated.` },
        });
      }
    } catch {
      setFailure("The request failed. Check if the API is running.");
    } finally {
      setSaving(false);
    }
  }

  const nameInvalid = Boolean(errors.name);
  const emailInvalid = Boolean(errors.email);

  return (
    <section className="user-form">
      <h1>{editingId === null ? "New user" : `Edit user #${editingId}`}</h1>

      {loading && <p>Loading...</p>}

      {!loading && (
        <form className="user-form__form" onSubmit={handleSubmit} noValidate>
          <div className="user-form__field">
            <label htmlFor="user-name">Name *</label>
            <input
              id="user-name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              maxLength={NAME_MAX_LENGTH}
              className={nameInvalid ? "input--invalid" : ""}
              aria-invalid={nameInvalid}
            />
            {nameInvalid && (
              <span className="user-form__error">{errors.name}</span>
            )}
          </div>

          <div className="user-form__field">
            <label htmlFor="user-email">E-mail *</label>
            <input
              id="user-email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              maxLength={EMAIL_MAX_LENGTH}
              className={emailInvalid ? "input--invalid" : ""}
              aria-invalid={emailInvalid}
            />
            {emailInvalid && (
              <span className="user-form__error">{errors.email}</span>
            )}
          </div>

          <div className="user-form__actions">
            <button type="submit" disabled={saving}>
              {editingId === null ? "Create" : "Update"}
            </button>
            <button
              type="button"
              className="button--ghost"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {failure && <p className="user-form__failure">{failure}</p>}
    </section>
  );
}

export default UserForm;
