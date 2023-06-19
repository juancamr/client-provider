export const constants = {
  PASSWORD_NOT_MATCH: "password_not_match",
  USER_NOT_EXIST: "user_not_exist",
  USER_ALREADY_EXIST: "user_already_exist",
};

export const errors: { [key: string]: string } = {
  user_already_exist: "El correo se encuentra en uso",
  password_not_match: "Contrasenia incorrecta",
  user_not_exist: "La cuenta ingresada no existe, pruebe creandose una cuenta",
};
