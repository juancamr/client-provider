import { VerificationCodeModel } from "../models/verificationCode.model";
import { Response } from "../models/zglobal";
import { errors } from "../utils/errors";
import { sendEmail } from "../utils/utils";
import { UserModel } from "../models/user.model";

export async function generateEmailVerificationCodeService(
  email: string
): Promise<Response> {
  const userFound = await UserModel.findOne({ email });
  if (!userFound) {
    const code = Math.floor(1000 + Math.random() * 9000);
    const verificationCodeFound = await VerificationCodeModel.findOne({
      email,
    });
    if (!verificationCodeFound) {
      await new VerificationCodeModel({
        code,
        email,
      }).save();
      sendEmail(email, "Codigo de verificacion", `${code}`);
    }
    return { success: true, error: ""}
  } else {
    return { success: false, error: "El correo ya se encuentra en uso"}
  }
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
