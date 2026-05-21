export const removeCircularReplacer = () => {
  const seen = new WeakSet();
  return (_key: unknown, value: unknown) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

/**
 * Extracts all digits from the input string and returns them concatenated.
 * Example: "a1b23" => "123". Returns empty string if no digits found.
 */
export function onlyNumbers(input: string): string {
  return (input.match(/\d+/g) || []).join("");
}

/**
 * Formats a telephone number using the patterns:
 * - (XX) XXXXX-XXXX for 11-digit numbers
 * - (XX) XXXX-XXXX for 10-digit numbers
 * Returns the original input if it cannot be formatted.
 */
export function formatPhone(input: string): string {
  const onlyNumber = onlyNumbers(input);
  let d = onlyNumber;

  if (input.slice(-1) === ")") {
    d = d.slice(0, -1);
  }

  if (d.length == 0) {
    return "";
  }

  if (d.length < 2) {
    return `(${d}`;
  } else if (d.length <= 7) {
    return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  } else if (d.length <= 9) {
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  }

  if (d.length === 11) {
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  } else if (d.length === 10) {
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  }

  return input;
}
