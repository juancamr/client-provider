import { checkRequestParams, generateTokenJWT } from "../utils/utils";
import {
  userRegisterService,
  userLoginService,
  isUsernameExistService,
} from "../services/user.services";
import { Request, Response } from "express";
import { User } from "../models/user.model";
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
        const token = generateTokenJWT({ id: response.data._id, type: 1 });
        res.json({ success: true, message: "Usuario creado con exito" });
      } else {
        res.json({ success: false, error: response.error });
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
      const token = generateTokenJWT({ id: response.data._id, type: 1 });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: response.error });
    }
  });
}

export function isUsernameExist(req: Request, res: Response): void {
  const { username } = req.body;

  isUsernameExistService(username).then((response) => {
    if (response.success) {
      res.json({ success: true });
    } else {
      res.json({
        success: false,
      });
    }
  });
}
