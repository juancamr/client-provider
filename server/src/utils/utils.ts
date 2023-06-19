import { User } from "../models/user.model";

export function checkRequestParams(body: any, params: string[]): boolean {
  const paramsEmpty = params.filter((param) => {
    return !body[param];
  });
  return paramsEmpty.length === 0;
}

// export function checkSessionToken(headers: object) {
//   const type = {
//     1: "User",
//     2: "Freelancer",
//   };

//   const Table = type[headers.type];
// }
