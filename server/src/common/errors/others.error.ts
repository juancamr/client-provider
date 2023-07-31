import { HTTP_STATUS_CODES } from "../httpStatusCode";

export const errOther = {
  NUMBER_FORMAT: {
    code: "NUMBER_FORMAT",
    message: "Numero invalido",
    ...HTTP_STATUS_CODES.UNPROCESSABLE,
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    message: "Esto no es lo que estas buscando",
    ...HTTP_STATUS_CODES.NOT_FOUND,
  },
  UNAUTHORIZED_ACCESS: {
    code: "UNAUTHORIZED ACCESS",
    message: "Acceso no autorizado",
    ...HTTP_STATUS_CODES.UNAUTHORIZED,
  },
  INSUFICIENT_PARAMS: {
    code: "INSUFICIENT_PARAMS",
    message: "Par&acute;metros insuficientes",
    ...HTTP_STATUS_CODES.BAD_REQUEST,
  },
  WRONG_CODE: {
    code: "WRONG_CODE",
    message: "El código es incorrecto",
    ...HTTP_STATUS_CODES.UNPROCESSABLE,
  },
  CODE_EXPIRED: {
    code: "CODE_EXPIRED",
    message: "El código ingresado expiró",
    ...HTTP_STATUS_CODES.GONE,
  },
};
