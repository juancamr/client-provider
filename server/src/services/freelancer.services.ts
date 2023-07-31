import { errEmail } from "../common/errors/email.error";
import { errPass } from "../common/errors/password.error";
import { errUser } from "../common/errors/user.error";
import {
  Freelancer,
  FreelancerModel,
  FreelancerPublic,
} from "../models/freelancer.model";
import { Response } from "../models/zglobal";
import { comparePassword, encryptPassword } from "../utils/encryptionUtils";
import { res } from "../utils/helper";

async function findByUsername(username: string) {
  return await FreelancerModel.findOne({ username });
}
async function findByEmail(email: string) {
  return await FreelancerModel.findOne({ email });
}

export async function freelancerRegisterService(
  freelancer: Freelancer
): Promise<Response> {
  const freelancerFoundByUsername = await findByUsername(freelancer.username);
  if (freelancerFoundByUsername) {
    return res(false, errUser.USERNAME_ALREADY_IN_USE);
  } else {
    const freelancerFoundByEmail = await findByEmail(freelancer.email);
    if (freelancerFoundByEmail) {
      return res(false, errEmail.EMAIL_ALREADY_IN_USE);
    } else {
      const newFreelancer = await new FreelancerModel({
        ...freelancer,
        password: await encryptPassword(freelancer.password),
      }).save();
      return res(true, newFreelancer);
    }
  }
}

export async function freelancerLoginService(
  usernameEntered: string,
  passwordEntered: string
): Promise<Response> {
  const freelancerFoundByUsername = await findByUsername(usernameEntered);
  if (freelancerFoundByUsername) {
    const password = freelancerFoundByUsername.password;
    if (await comparePassword(passwordEntered, password)) {
      return res(true, freelancerFoundByUsername);
    } else return res(false, errPass.INCORRECT_PASSWORD);
  } else {
    const freelancerFoundByEmail = await findByEmail(usernameEntered);
    if (freelancerFoundByEmail) {
      const password = freelancerFoundByEmail.password;
      if (await comparePassword(passwordEntered, password)) {
        return res(true, freelancerFoundByEmail);
      } else return res(false, errPass.INCORRECT_PASSWORD);
    } else {
      return res(false, errUser.USER_NOT_EXIST);
    }
  }
}

export async function getAllFreelancersService(): Promise<FreelancerPublic[]> {
  const freelancers: Freelancer[] = await FreelancerModel.find();
  return freelancers.map(({ name, last_name, username, email, picture }) => ({
    name,
    last_name,
    username,
    email,
    picture,
  }));
}
