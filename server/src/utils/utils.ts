import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getTransporter } from "../config/nodemailer";

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

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sendEmail(receiver: string, title: string, content: string) {
  const transporter = getTransporter();
  const mailOptions = {
    from: process.env.MY_PERSONAL_EMAIL,
    to: receiver,
    subject: title,
    text: content,
  };

  transporter.sendMail(mailOptions, function (err, _) {
    if (err) {
      console.log(`No se pudo enviar el correo ${err}`);
    }
  });
}

export function generateTokenJWT(payload: object): string {
  const token = jwt.sign(payload, process.env.SECRET_KEY ?? "");
  return token;
}

export function decodeTokenJWT(token: string): any {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY ?? "");
  return decodedToken as object;
}
