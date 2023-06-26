import { User, UserModel } from "../models/user.model";
import { constants } from "../utils/errors";
import { comparePassword, encryptPassword } from "../utils/utils";
import { Response } from "../models/zglobal";

export async function userRegisterService(user: User): Promise<Response> {
  const existingUsername = await UserModel.findOne({ username: user.username });
  if (!existingUsername) {
    new UserModel({
      ...user,
      password: await encryptPassword(user.password),
    }).save();
    return { success: true, error: "" };
  } else {
    return { success: false, error: constants.USERNAME_ALREADY_IN_USE };
  }
}

export async function userLoginService(
  usernameEntered: string,
  passwordEntered: string
): Promise<Response> {
  const userFoundByUsername = await UserModel.findOne({
    username: usernameEntered,
  });
  if (userFoundByUsername) {
    if (await comparePassword(passwordEntered, userFoundByUsername?.password)) {
      return { success: true, error: "", data: userFoundByUsername };
    } else {
      return { error: constants.PASSWORD_NOT_MATCH };
    }
  } else {
    const userFoundByEmail = await UserModel.findOne({
      email: usernameEntered,
    });
    if (userFoundByEmail) {
      if (await comparePassword(passwordEntered, userFoundByEmail?.password)) {
        return { success: true, error: "", data: userFoundByEmail };
      } else {
        return { error: constants.PASSWORD_NOT_MATCH };
      }
    } else {
      return { error: constants.USER_NOT_EXIST };
    }
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

export async function isUsernameExistService(
  username: string
): Promise<Response> {
  const userFound = await UserModel.findOne({ username: username });
  if (userFound) {
    return { success: true, error: "" };
  } else {
    return {
      success: false,
      error: "",
    };
  }
}
