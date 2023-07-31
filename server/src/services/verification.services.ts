import { VerificationCodeModel } from "../models/verificationCode.model";
import { Response } from "../models/zglobal";
import { sendMail } from "../utils/helper";
import { UserModel } from "../models/user.model";
import { errEmail } from "../common/errors/email.error";
import { errOther } from "../common/errors/others.error";

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
      sendMail(email, "Codigo de verificacion", `${code}`);
    }
    return { success: true };
  } else {
    return { success: false, error: errEmail.EMAIL_ALREADY_IN_USE };
  }
}

export async function verifyEmailService(
  email: string,
  code: string
): Promise<Response> {
  const codeFound = await VerificationCodeModel.findOne({ email });
  if (codeFound) {
    if (codeFound.code === code) {
      return { success: true };
    } else {
      return { success: false, error: errOther.WRONG_CODE };
    }
  } else {
    return { success: false, error: errOther.CODE_EXPIRED };
  }
}
