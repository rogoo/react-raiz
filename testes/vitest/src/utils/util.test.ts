import { isBlank, isValidEmail } from "./util";

describe("isValidEmail", () => {
  it.for<[string, boolean]>([
    ["", false],
    ["  ", false],
    ["asdf", false],
    ["asdf@", false],
    [" @asdf.com", false],
    [" @@asdf.com", false],
    ["a@asdf.com", true],
    ["a@asdf.", false],
    ["a@asdf.c", false],
    ["a@asdf.cc", true],
    ["asdf@asdf", false],
    ["asdf@asdf.com", true],
    ["asdf_asdf.com", false],
    ["asdfasdfasdf@asdfasdfasdf.craaaaaaaaaaaaaaa", true],
  ])('recebe string "%s" e retorna %s', ([input, expected]) => {
    expect(isValidEmail(input)).toBe(expected);
  });
});

describe("isBlank", () => {
  it.for<[string, boolean]>([
    ["", true],
    ["  ", true],
    ["asdf", false],
    ["   asdf    ", false],
  ])('recebe string "%s" e retorna %s', ([input, expected]) => {
    expect(isBlank(input)).toBe(expected);
  });

  test("teste", () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });
});
