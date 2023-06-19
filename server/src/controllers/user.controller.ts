import { checkRequestParams } from "../utils/utils";
import {
  userRegisterService,
  getAllUsersService,
} from "../services/user.services";
import { Request, Response } from "express";
import { user } from "../models/user.model";

export async function userRegister(req: Request, res: Response): Promise<void> {
  const params: string[] = ["name", "last_name", "email", "password"];
  if (checkRequestParams(req.body, params)) {
    const user: user = req.body;
    const success = await userRegisterService(user);
    if (success) {
      res.json({
        success,
        message: "Usuario registrado con exito",
      });
    } else {
      res.json({
        success: false,
        message: "El correo se encuentra en uso",
      });
    }
  } else {
    res.json({
      success: false,
      message: "Parametros insuficientes",
    });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  const listUsers = await getAllUsersService();
  res.json(listUsers);
}
