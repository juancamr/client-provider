import nodemailer, { Transporter } from "nodemailer";

let transporter: Transporter;

export function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MY_PERSONAL_EMAIL,
        pass: process.env.MY_PERSONAL_PASSWORD,
      },
    });
  }
  return transporter;
}
