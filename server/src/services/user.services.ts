import { User, UserModel } from "../models/user.model";
import { errors } from "../utils/constants";
import { comparePassword, encryptPassword } from "../utils/utils";
import { Response } from "../models/zglobal";

export async function userRegisterService(user: User): Promise<Response> {
  const existingUsername = await UserModel.findOne({
    username: { $eq: user.username },
  });
  if (!existingUsername) {
    const newUser = await new UserModel({
      ...user,
      password: await encryptPassword(user.password),
    }).save();
    return { success: true, error: "", data: newUser };
  } else {
    return { success: false, error: errors.USERNAME_ALREADY_IN_USE };
  }
}

export async function userLoginService(
  usernameEntered: string,
  passwordEntered: string
): Promise<Response> {
  const userFoundByUsername = await UserModel.findOne({
    username: { $eq: usernameEntered },
  });
  if (userFoundByUsername) {
    if (await comparePassword(passwordEntered, userFoundByUsername?.password)) {
      return { success: true, error: "", data: userFoundByUsername };
    } else {
      return { error: errors.INCORRECT_PASSWORD };
    }
  } else {
    const userFoundByEmail = await UserModel.findOne({
      email: usernameEntered,
    });
    if (userFoundByEmail) {
      if (await comparePassword(passwordEntered, userFoundByEmail?.password)) {
        return { success: true, error: "", data: userFoundByEmail };
      } else {
        return { error: errors.INCORRECT_PASSWORD };
      }
    } else {
      return { error: errors.USER_NOT_EXIST };
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
  const userFound = await UserModel.findOne({ username: { $eq: username } });
  if (userFound) {
    return { success: true };
  } else {
    return { success: false };
  }
}

export async function forgotPasswordService(email: string): Promise<Response> {
  const userFound = await UserModel.findOne({ email: { $eq: email } });
  if (userFound) {
    return { success: true, data: userFound };
  } else {
    return { success: false, error: errors.EMAIL_NOT_REGISTERED };
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
      error: errors.USER_NOT_EXIST,
    };
  }
}
