import { User } from "../models/user.model";
import bcrypt from "bcrypt";

export function checkRequestParams(body: any, params: string[]): boolean {
  const paramsEmpty = params.filter((param) => {
    return !body[param];
  });
  return paramsEmpty.length === 0;
}

export async function encryptPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// export function checkSessionToken(headers: object) {
//   const type = {
//     1: "User",
//     2: "Freelancer",
//   };

//   const Table = type[headers.type];
// }
