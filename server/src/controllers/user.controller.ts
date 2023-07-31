import * as services from "../services/user.services";
import { Request, Response } from "express";
import { DocumentUser, User, UserModel } from "../models/user.model";
import { BASE_URL, TYPE_MODEL } from "../common/constants";
import { created, errorByType, ok } from "../utils/requestUtils";
import { decodeTokenJWT, generateTokenJWT } from "../utils/encryptionUtils";
import { sendMail } from "../utils/helper";
import { errOther } from "../common/errors/others.error";

export function userRegister(req: Request, res: Response): void {
  const user: User = req.body;
  services.userRegisterService(user).then((response) => {
    if (response.success) {
      const accessToken = generateTokenJWT({
        id: response.data._id,
        type: TYPE_MODEL.USER,
      });
      created(res, response.data, accessToken);
    } else errorByType(res, response.error);
  });
}

export function userLogin(req: Request, res: Response): void {
  const user: User = req.body;
  services.userLoginService(user.username, user.password).then((response) => {
    if (response.success) {
      const accessToken = generateTokenJWT({
        id: response.data._id,
        type: TYPE_MODEL.USER,
      });
      ok(res, { data: response.data, accessToken });
    } else errorByType(res, response.error);
  });
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const username = req.params.username as string;
  await UserModel.deleteOne({ username });
  res.status(204).end();
}

export function forgotPassword(req: Request, res: Response): void {
  const { email } = req.body;
  services.forgotPasswordService(email).then((response) => {
    if (response.success) {
      const token = generateTokenJWT({ id: response.data.id });
      sendMail(
        email,
        "Reset password",
        `${BASE_URL}/api/public/user/reset_password?secret=${token}`
      );
      ok(res);
    } else errorByType(res, response.error);
  });
}

export function resetPassword(req: Request, res: Response): void {
  const { password, confirmPassword, token } = req.body;
  try {
    const data = decodeTokenJWT(token);
    const id = data.id;
    if (password === confirmPassword) {
      services.resetPasswordService(id, password).then((response) => {
        response.success ? ok(res) : errorByType(res, response.error);
      });
    } else errorByType(res, errOther.CODE_EXPIRED);
  } catch (error) {
    res.status(400).json({ success: false, error: "Expirado" });
  }
}

export function updateProfile(req: Request, res: Response): void {
  const user = req.body.data as DocumentUser;
  ok(res, { data: user });
}
