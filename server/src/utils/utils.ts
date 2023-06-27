import bcrypt from "bcrypt";
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

export function sendEmail(receiver: string, title: string, content: string) {
  const transporter = getTransporter();
  const mailOptions = {
    from: process.env.MY_PERSONAL_EMAIL,
    to: receiver,
    subject: title,
    text: content,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(`No se pudo enviar el correo ${err}`);
    } else {
      console.log(`Correo enviado ${info.response}`);
    }
  });
}
