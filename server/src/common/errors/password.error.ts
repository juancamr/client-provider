import { HTTP_STATUS_CODES } from "../httpStatusCode";

export const errPass = {
  INCORRECT_PASSWORD: {
    code: "INCORRECT_PASSWORD",
    message: "Contrase&ntilde;a incorrecta",
    ...HTTP_STATUS_CODES.UNAUTHORIZED,
  },
  PASSWORD_NOT_MATCH: {
    code: "PASSWORD_NOT_MATCH",
    message: "Las contrase&ntilde;ias no coinciden",
    ...HTTP_STATUS_CODES.UNPROCESSABLE,
  },
  PASSWORD_INSUFICIENT_CHARACTERS: {
    code: "INSUFICIENT CHARACTERS OF PASSWORD",
    message: "La contrase&ntilde;ia debe tener al menos 8 caracteres",
    ...HTTP_STATUS_CODES.BAD_REQUEST,
  },
};
