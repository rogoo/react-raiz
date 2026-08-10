const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Checks whether the given value is a well formed e-mail address.
 */
export function isValidEmail(value: string): boolean {
  const email = value.trim();

  if (email.length === 0) {
    return false;
  }

  return EMAIL_PATTERN.test(email);
}

/**
 * Returns true when a required text field was left empty.
 */
export function isBlank(value: string): boolean {
  return value.trim().length === 0;
}
