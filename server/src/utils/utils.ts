import bcrypt from "bcrypt";

export function checkRequestParams(body: any, params: string[]): boolean {
  const paramsEmpty = params.filter((param) => {
    return !body[param];
  });
  return paramsEmpty.length === 0;
}

export async function encryptPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  password: string,
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, enteredPassword);
}
