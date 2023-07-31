import { User, UserModel } from "../models/user.model";
import { comparePassword, encryptPassword } from "../utils/encryptionUtils";
import { Response } from "../models/zglobal";
import { errUser } from "../common/errors/user.error";
import { errPass } from "../common/errors/password.error";
import { errEmail } from "../common/errors/email.error";
import { res } from "../utils/helper";

async function findByUsername(username: string) {
  return await UserModel.findOne({ username });
}
async function findByEmail(email: string) {
  return await UserModel.findOne({ email });
}

export async function userRegisterService(user: User): Promise<Response> {
  const userFoundByUsername = await findByUsername(user.username);
  if (userFoundByUsername) {
    return res(false, errUser.USERNAME_ALREADY_IN_USE);
  } else {
    const userFoundByEmail = await findByEmail(user.email);
    if (userFoundByEmail) {
      return res(false, errEmail.EMAIL_ALREADY_IN_USE);
    } else {
      const newUser = await new UserModel({
        ...user,
        password: await encryptPassword(user.password),
      }).save();
      return res(true, newUser);
    }
  }
}

export async function userLoginService(
  usernameEntered: string,
  passwordEntered: string
): Promise<Response> {
  const userFoundByUsername = await findByUsername(usernameEntered);
  if (userFoundByUsername) {
    if (await comparePassword(passwordEntered, userFoundByUsername?.password)) {
      return res(true, userFoundByUsername);
    } else return res(false, errPass.INCORRECT_PASSWORD);
  } else {
    const userFoundByEmail = await findByEmail(usernameEntered);
    if (userFoundByEmail) {
      if (await comparePassword(passwordEntered, userFoundByEmail?.password)) {
        return res(true, userFoundByEmail);
      } else return res(false, errPass.INCORRECT_PASSWORD);
    } else return res(false, errUser.USER_NOT_EXIST);
  }
}

export async function forgotPasswordService(email: string): Promise<Response> {
  const userFound = await UserModel.findOne({ email: { $eq: email } });
  if (userFound) {
    return { success: true, data: userFound };
  } else {
    return { success: false, error: errEmail.EMAIL_NOT_REGISTERED };
  }
}

export async function resetPasswordService(
  id: string,
  password: string
): Promise<Response> {
  const userFound = await UserModel.findById(id);
  if (userFound) {
    userFound.password = await encryptPassword(password);
    userFound.save();
    return { success: true };
  } else {
    return {
      success: false,
      error: errUser.USER_NOT_EXIST,
    };
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
