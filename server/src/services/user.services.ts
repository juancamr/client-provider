import { User, UserModel } from "../models/user.model";
import { constants } from "../utils/errors";
import { comparePassword, encryptPassword } from "../utils/utils";
import { Response } from "../models/zglobal";

export async function userRegisterService(user: User): Promise<Response> {
  const filter = { email: { $eq: user.email } };
  const existingUser = await UserModel.findOne(filter);
  if (!existingUser) {
    new UserModel({
      ...user,
      password: await encryptPassword(user.password),
    }).save();
    return { success: true, error: "" };
  } else {
    return { error: constants.USER_ALREADY_EXIST };
  }
}

export async function userLoginService(
  emailEntered: string,
  passwordEntered: string
): Promise<Response> {
  const userFound = await UserModel.findOne({ email: emailEntered });
  if (userFound) {
    if (await comparePassword(passwordEntered, userFound?.password)) {
      return { success: true, error: "", data: userFound };
    } else {
      return { error: constants.PASSWORD_NOT_MATCH };
    }
  } else {
    return { error: constants.USER_NOT_EXIST };
  }
}

export async function getUserService(
  userId: string
): Promise<User | undefined> {
  const userFound = await UserModel.findById(userId);
  return userFound ? userFound : undefined;
}

export async function getAllUsersService(): Promise<User[]> {
  const listUsers: User[] = await UserModel.find();
  return listUsers;
}
