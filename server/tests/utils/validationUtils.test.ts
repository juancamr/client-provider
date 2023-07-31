import { isNumber, isValidEmail } from "../../src/utils/validationUtils";

test("should return false when email is invalid", () => {
  const email = "holamundo";
  expect(isValidEmail(email)).toBe(false);
  expect(isValidEmail("holamundo@holamundo.com")).toBe(true);
});

test("should return false when a param is not a number", () => {
  expect(isNumber("holamundo")).toBe(false);
  expect(isNumber(10)).toBe(true);
});
