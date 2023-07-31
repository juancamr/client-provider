import { NextFunction, Request, Response } from "express";
import { TYPE_MODEL } from "../common/constants";
import { FreelancerModel } from "../models/freelancer.model";
import { UserModel } from "../models/user.model";
import { errorByType, genericRes } from "../utils/requestUtils";
import { errUser } from "../common/errors/user.error";

export async function sessionDetail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id, type } = req.body.data;
    switch (type) {
      case TYPE_MODEL.USER:
        const userFound = (await UserModel.findById(id)) as any;
        if (userFound) {
          req.body.data = userFound;
          next();
        } else errorByType(res, errUser.USER_NOT_EXIST);
        break;
      case TYPE_MODEL.FREELANCER:
        const freelancerFound = (await FreelancerModel.findById(id)) as any;
        if (freelancerFound) {
          req.body.data = freelancerFound;
          next();
        } else errorByType(res, errUser.USER_NOT_EXIST);
        break;
      default:
        genericRes(res, 400, false, "Something went wrong");
        break;
    }
  } catch (err) {
    console.log(err);
    genericRes(res, 500, false, "Internal server error");
  }
}
