import { getTransporter } from "../config/nodemailer";
import { ErrorResponse, Response } from "../models/zglobal";

export function sendMail(receiver: string, title: string, content: string) {
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

export function res(...values: any[]): Response {
  let success: boolean | undefined = undefined;
  let error: ErrorResponse | undefined = undefined;
  let data: any | undefined = undefined;
  let dataList: any[] | undefined = undefined;

  values.forEach((value) => {
    if (typeof value === "boolean") {
      success = value;
    } else if (typeof value.status === 'number') {
      error = value;
    } else if (value instanceof Array) {
      dataList = value;
    } else {
      data = value;
    }
  });
  return { success, error, data, dataList };
}
