import { user, User } from "../models/user.model";

export async function userRegisterService(user: user): Promise<boolean> {
  const existingUser = await User.findOne({ email: { $eq: user.email } });
  if (!existingUser) {
    new User(user).save();
return true
  } else {
return false
  }
}

export async function getUserService(
  userId: string
): Promise<user | undefined> {
  const userFound = await User.findById(userId);
  return userFound ? userFound : undefined;
}

export async function getAllUsersService(): Promise<user[]> {
  const listUsers: user[] = await User.find();
  return listUsers;
}
