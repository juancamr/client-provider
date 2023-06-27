import { VerificationCodeModel } from "../models/verificationCode.model";
import { Response } from "../models/zglobal";
import { errors } from "../utils/errors";
import { sendEmail } from "../utils/utils";

export async function generateEmailVerificationCodeService(
  email: string
): Promise<boolean> {
  const code = Math.floor(1000 + Math.random() * 9000);
  const verificationCodeFound = await VerificationCodeModel.findOne({ email });
  if (!verificationCodeFound) {
    await new VerificationCodeModel({
      code,
      email,
    }).save();
    sendEmail(email, "Codigo de verificacion", `${code}`);
  }
  return true;
}

export async function verifyEmailService(
  email: string,
  code: string
): Promise<Response> {
  const codeFound = await VerificationCodeModel.findOne({ email });
  if (codeFound) {
    if (codeFound.code === code) {
      return { success: true, error: "" };
    } else {
      return { success: false, error: errors.WRONG_CODE };
    }
  } else {
    return { success: false, error: errors.CODE_EXPIRED };
  }
}
