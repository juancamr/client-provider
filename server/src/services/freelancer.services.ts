import {
  Freelancer,
  FreelancerModel,
  FreelancerPublic,
} from "../models/freelancer.model";
import { Response } from "../models/zglobal";
import { constants } from "../utils/errors";
import { comparePassword, encryptPassword } from "../utils/utils";

export async function freelancerRegisterService(
  freelancer: Freelancer
): Promise<Response> {
  const freelancerThatExist = await FreelancerModel.findOne({
    email: freelancer.email,
  });
  if (!freelancerThatExist) {
    new FreelancerModel({
      ...freelancer,
      password: await encryptPassword(freelancer.password),
    }).save();
    return { success: true, error: "" };
  } else {
    return { success: false, error: constants.USER_ALREADY_EXIST };
  }
}

export async function freelancerLoginService(
  emailEntered: string,
  passwordEntered: string
): Promise<Response> {
  const freelancerFound = await FreelancerModel.findOne({
    email: emailEntered,
  });
  if (freelancerFound) {
    if (await comparePassword(passwordEntered, freelancerFound?.password)) {
      return { success: true, error: "", data: freelancerFound };
    } else {
      return { success: false, error: constants.PASSWORD_NOT_MATCH };
    }
  } else {
    return { success: false, error: constants.USER_NOT_EXIST };
  }
}

export async function getAllFreelancersService(): Promise<FreelancerPublic[]> {
  const freelancers: Freelancer[] = await FreelancerModel.find();
  return freelancers.map(({ name, last_name, email, picture }) => ({
    name,
    last_name,
    email,
    picture,
  }));
}
