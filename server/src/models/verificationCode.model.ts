import mongoose from "mongoose";

export interface VerificationCode {
  code: string;
  email: string;
  createdAt: string;
}

const verificationCodeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 100 },
});

export const VerificationCodeModel = mongoose.model<VerificationCode>(
  "verification_code",
  verificationCodeSchema
);
