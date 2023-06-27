import { checkRequestParams } from "../utils/utils";
import { Request, Response } from "express";
import {
  freelancerLoginService,
  freelancerRegisterService,
  getAllFreelancersService,
} from "../services/freelancer.services";
import { Freelancer } from "../models/freelancer.model";

export function freelancerRegister(req: Request, res: Response): void {
  const params: string[] = ["name", "last_name", "email", "password"];
  if (checkRequestParams(req.body, params)) {
    const freelancer: Freelancer = req.body;
    freelancerRegisterService(freelancer).then((response) => {
      if (response.success) {
        res.json({ success: true, message: "Usuario creado con exito" });
      } else {
        res.json({ success: false, message: response.error });
      }
    });
  } else {
    res.json({
      success: false,
      message: "Parametros insuficientes",
    });
  }
}

export function freelancerLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  freelancerLoginService(email, password).then((response) => {
    if (response.success) {
      res.json({ success: true, user: response.data });
    } else {
      res.json({ success: false, error: response.error });
    }
  });
}

export function getAllFreelancers(_: Request, res: Response) {
  getAllFreelancersService().then((freelancers) => {
    res.json(freelancers);
  });
}
