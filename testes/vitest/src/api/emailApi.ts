import axios from "axios";

export const EMAIL_API_URL = "http://localhost:8080/api/email";

export const RECIPIENT = "yofoo@gmail.com";

export type EmailSubjectOptionType =
  | "congrats"
  | "not received"
  | "error"
  | "doubt";

export const SUBJECT_OPTIONS: EmailSubjectOptionType[] = [
  "congrats",
  "not received",
  "error",
  "doubt",
];

export interface EmailPayload {
  to: string;
  subject: EmailSubjectOptionType;
  title: string;
  content: string;
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  await axios.post(EMAIL_API_URL, payload, {
    headers: { "Content-Type": "application/json" },
  });
}

function extractDetail(data: unknown): string {
  if (typeof data === "string") {
    return data.trim();
  }

  if (data !== null && typeof data === "object") {
    const record = data as Record<string, unknown>;
    const detail = record.message ?? record.error;

    if (typeof detail === "string") {
      return detail.trim();
    }
  }

  return "";
}

/** Turns whatever `sendEmail` threw into a message that can be shown to the user. */
export function getEmailErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const { response } = error;

    if (!response) {
      return error.message;
    }

    const status = `${response.status} ${response.statusText}`.trim();
    const detail = extractDetail(response.data);

    if (detail !== "") {
      return `${status}: ${detail}`;
    } else {
      return status;
    }
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return String(error);
  }
}
