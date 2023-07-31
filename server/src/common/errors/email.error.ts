import { ErrorResponse } from "../../models/zglobal";
import { HTTP_STATUS_CODES } from "../httpStatusCode";

export const errEmail: {[key: string]: ErrorResponse} = {
  EMAIL_ALREADY_IN_USE: {
    code: "EMAIL_ALREADY_IN_USE",
    message: "El correo electr&oacute;nico se encuentra en uso",
    ...HTTP_STATUS_CODES.CONFLICT,
  },
  INVALID_EMAIL: {
    code: "INVALID_EMAIL",
    message: "El correo es invalido",
    ...HTTP_STATUS_CODES.UNPROCESSABLE,
  },
  EMAIL_NOT_REGISTERED: {
    code: "EMAIL_NOT_REGISTERED",
    message: "No existe una cuenta registrada con este correo",
    ...HTTP_STATUS_CODES.NOT_FOUND,
  },
};
