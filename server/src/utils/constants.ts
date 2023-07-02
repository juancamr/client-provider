import { FreelancerModel } from "../models/freelancer.model";
import { UserModel } from "../models/user.model";

export const BASE_URL = "https://192.168.1.150:3000";

export const errors = {
  USERNAME_ALREADY_IN_USE: "Este usuario ya se encuentra en uso",
  EMAIL_ALREADY_IN_USE: "El correo electr&oacute;nico se encuentra en uso",
  EMAIL_INVALID: "El correo es invalido",
  INCORRECT_PASSWORD: "Contraseña incorrecta",
  PASSWORD_NOT_MATCH: "Las contrase&ntilde;ias no coinciden",
  USER_NOT_EXIST: "La cuenta no existe",
  WRONG_CODE: "El código es incorrecto",
  EMAIL_NOT_REGISTERED: "No existe una cuenta registrada con este correo",
  CODE_EXPIRED: "El código ingresado expiró",
};

export const table: { [key: string]: any } = {
  user: UserModel,
  freelancer: FreelancerModel,
};
