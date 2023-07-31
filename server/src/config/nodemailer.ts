import nodemailer, { Transporter } from "nodemailer";

let transporter: Transporter;

export function startMailerService() {
  transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MY_PERSONAL_EMAIL,
      pass: process.env.MY_PERSONAL_PASSWORD,
    },
  });
  console.log("Mailer service started");
}

export function getTransporter() {
  if (!transporter) startMailerService();
  return transporter;
}
