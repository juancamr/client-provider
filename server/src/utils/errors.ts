export const constants = {
  PASSWORD_NOT_MATCH: "password_not_match",
  USER_NOT_EXIST: "user_not_exist",
  USERNAME_ALREADY_IN_USE: "username_already_in_use",
  EMAIL_ALREADY_IN_USE: "email_already_in_use"
};

export const errors: { [key: string]: string } = {
  username_already_in_use: "Este usuario ya se encuentra en uso",
  email_already_in_use: "El correo electr&oacute;nico se encuentra en uso",
  password_not_match: "Contraseña incorrecta",
  user_not_exist: "La cuenta ingresada no existe, pruebe creandose una cuenta",
};
