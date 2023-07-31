import { Request, Response } from "express";
import * as services from "../services/freelancer.services";
import { created, errorByType, ok } from "../utils/requestUtils";
import {
  DocumentFreelancer,
  Freelancer,
  FreelancerModel,
} from "../models/freelancer.model";
import { generateTokenJWT } from "../utils/encryptionUtils";
import { TYPE_MODEL } from "../common/constants";

export function freelancerRegister(req: Request, res: Response): void {
  const freelancer: Freelancer = req.body;
  services.freelancerRegisterService(freelancer).then((response) => {
    if (response.success) {
      const accessToken = generateTokenJWT({
        id: response.data._id,
        type: TYPE_MODEL.FREELANCER,
      });
      created(res, response.data, accessToken);
    } else errorByType(res, response.error);
  });
}

export function freelancerLogin(req: Request, res: Response): void {
  const freelancer: Freelancer = req.body;
  services
    .freelancerLoginService(freelancer.username, freelancer.password)
    .then((response) => {
      if (response.success) {
        const accessToken = generateTokenJWT({
          id: response.data._id,
          type: TYPE_MODEL.FREELANCER,
        });
        ok(res, { data: response.data, accessToken });
      } else errorByType(res, response.error);
    });
}

export async function deleteFreelancer(
  req: Request,
  res: Response
): Promise<void> {
  const username = req.params.username as string;
  await FreelancerModel.deleteOne({ username });
  res.status(204).end();
}

export function getAllFreelancers(_: Request, res: Response): void {
  services.getAllFreelancersService().then((freelancers) => {
    ok(res, freelancers);
  });
}

export function updateProfile(req: Request, res: Response): void {
  const freelancer = req.body.data as DocumentFreelancer;
  console.log(freelancer);
  ok(res, freelancer);
}
