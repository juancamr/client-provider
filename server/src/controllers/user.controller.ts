import {
  checkRequestParams,
  decodeTokenJWT,
  generateTokenJWT,
  isValidEmail,
  sendEmail,
} from "../utils/utils";
import {
  userRegisterService,
  userLoginService,
  isUsernameExistService,
  resetPasswordService,
  forgotPasswordService,
} from "../services/user.services";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import { BASE_URL, errors } from "../utils/constants";
export function userRegister(req: Request, res: Response): void {
  const params: string[] = [
    "name",
    "last_name",
    "username",
    "email",
    "password",
  ];
  if (checkRequestParams(req.body, params)) {
    const user: User = req.body;
    userRegisterService(user).then((response) => {
      if (response.success) {
        const token = generateTokenJWT({ id: response.data._id, type: "user" });
        res.status(201).json({ success: true, token });
      } else {
        res.status(200).json({ success: false, error: response.error });
      }
    });
  } else {
    res.json({
      success: false,
      message: "Parametros insuficientes",
    });
  }
}

export function userLogin(req: Request, res: Response): void {
  const { username, password } = req.body;
  userLoginService(username, password).then((response) => {
    if (response.success) {
      const token = generateTokenJWT({ id: response.data._id });
      res.status(200).json({ success: true, token, type: "user" });
    } else {
      res.status(200).json({ success: false, error: response.error });
    }
  });
}

export function isUsernameExist(req: Request, res: Response): void {
  const { username } = req.body;

  isUsernameExistService(username).then((response) => {
    if (response.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({
        success: false,
      });
    }
  });
}

export function forgotPassword(req: Request, res: Response): void {
  const { email } = req.body;
  if (isValidEmail(email)) {
    forgotPasswordService(email).then((response) => {
      if (response.success) {
        const token = generateTokenJWT({ id: response.data.id });
        sendEmail(
          email,
          "Reset password",
          `${BASE_URL}/api/public/user/reset_password?secret=${token}`
        );
        res.status(200).json({ success: true });
      } else {
        res.status(200).json({ success: false, error: response.error });
      }
    });
  } else {
    res.status(200).json({ success: false, error: errors.EMAIL_INVALID });
  }
}

export function resetPassword(req: Request, res: Response): void {
  const token: string = req.query.secret?.toString() ?? "";
  const { password, confirmPassword } = req.body;
  try {
    const data = decodeTokenJWT(token);
    const id = data.id;
    if (password === confirmPassword) {
      resetPasswordService(id, password).then((response) => {
        if (response.success) {
          res.status(200).json({
            success: true,
            message: "Contrase&ntilde;ia cambiada con &eacute;xito",
          });
        } else {
          res.status(200).json({ success: false, error: response.error });
        }
      });
    } else {
      res
        .status(200)
        .json({ success: false, error: errors.PASSWORD_NOT_MATCH });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: "Expirado" });
  }
}
