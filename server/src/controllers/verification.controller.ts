import { VerificationCode } from "../models/verificationCode.model";
import { Request, Response } from "express";
import {
  generateEmailVerificationCodeService,
  verifyEmailService,
} from "../services/verification.services";

export function generateEmailVerificationCode(
  req: Request,
  res: Response
): void {
  const verificationCode: VerificationCode = req.body;
  generateEmailVerificationCodeService(verificationCode.email).then(() => {
    res.json({
      success: true,
    });
  });
}

export function verifyEmail(req: Request, res: Response): void {
  const verificationCode: VerificationCode = req.body;

  verifyEmailService(verificationCode.email, verificationCode.code).then(
    (response) => {
      if (response.success) {
        res.json({
            success: true,
        })
      } else {
        res.json({
            success: false,
            error: response.error
        })
      }
    }
  );
}
