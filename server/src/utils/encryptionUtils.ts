import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

export function generateTokenJWT(payload: object): string {
  const token = jwt.sign(payload, process.env.SECRET_KEY ?? "");
  return token;
}

export function decodeTokenJWT(token: string): any {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY ?? "");
  return decodedToken as object;
}