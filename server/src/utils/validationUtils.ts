// import { error, insufficientParams } from "./requestUtils";
// import { Response } from "express";
// import { VERIFICATION_TYPE } from "../common/constants";

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function isNumber(value: any): boolean {
  return !isNaN(value);
}

// export function checkRequestParams(
//   res: Response,
//   data: object,
//   other: object,
//   options: number[]
// ): void {
//   const dataFinal: any = { ...other, ...data };
//   const keys = Object.keys(dataFinal);
//   if (options) {
//     checkFromOptions(res, dataFinal, options, keys);
//   }
//   const keysUndefined = keys.filter(
//     (key: string) => dataFinal[key] === undefined || dataFinal[key].length === 0
//   );
//   const flag = keysUndefined.length === 0;
//   if (!flag) {
//     insufficientParams(res);
//   }
// }

// function checkFromOptions(
//   res: Response,
//   dataFinal: any,
//   options: number[],
//   keys: string[]
// ) {
//   options.forEach((option) => {
//     switch (option) {
//       case VERIFICATION_TYPE.EMAIL:
//         const emailKeys = keys.filter((key) => key.startsWith("email"));
//         emailKeys.forEach((emailKey) => {
//           !isValidEmail(dataFinal[emailKey]) &&
//             error(res, {
//               ...erremail.INVALID_EMAIL,
//               message: `El valor ${dataFinal[emailKey]} no es un email valido`,
//             });
//         });
//         break;
//       case VERIFICATION_TYPE.NUMBER:
//         const numberKeys = keys.filter((key) => key.endsWith("number"));
//         numberKeys.forEach((numberKey) => {
//           !isNumber(dataFinal[numberKey]) &&
//             error(res, {
//               ...errother.NUMBER_FORMAT,
//               message: `El valor ${dataFinal[numberKey]} no es un numero`,
//             });
//         });
//         break;
//       case VERIFICATION_TYPE.PASSWORD:
//         const passwordKeys = keys.filter((key) => key.startsWith("password"));
//         passwordKeys.forEach((passwordKey) => {
//           const password = dataFinal[passwordKey] as string;
//           password.length < 8 &&
//             error(res, errpass.PASSWORD_INSUFICIENT_CHARACTERS);
//         });
//         break;
//       case VERIFICATION_TYPE.PASSWORD_CONFIRM:
//         const password: string = dataFinal.password;
//         const passwordConfirm: string = dataFinal.passwordConfirm;
//         (!password ||
//           !passwordConfirm ||
//           password.trim() != passwordConfirm.trim()) &&
//           error(res, errpass.PASSWORD_NOT_MATCH);
//         break;

//       default:
//         break;
//     }
//   });
// }
