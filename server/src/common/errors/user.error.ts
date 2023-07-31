import { HTTP_STATUS_CODES } from "../httpStatusCode";

export const errUser = {
  USERNAME_ALREADY_IN_USE: {
    code: "USERNAME_ALREADY_IN_USE",
    message: "Este usuario ya se encuentra en uso",
    ...HTTP_STATUS_CODES.CONFLICT,
  },
  USER_NOT_EXIST: {
    code: "USER_NOT_EXIST",
    message: "La cuenta no existe",
    ...HTTP_STATUS_CODES.NOT_FOUND,
  },
};
