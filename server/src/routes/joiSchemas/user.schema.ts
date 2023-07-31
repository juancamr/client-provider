import joi from "joi";

const loginUser = {
  username: joi.string().min(5).required(),
  password: joi.string().min(8).required(),
};
export const loginUserSchema = joi.object(loginUser);

const resetPassword = {
  password: joi.string().min(8).required(),
  confirm_password: joi
    .string()
    .valid(joi.ref("password"))
    .required()
    .messages({
      "any.only": "Password not match",
    }),
};
export const resetPasswordSchema = joi.object(resetPassword);

const forgotPassword = {
  email: joi.string().email().required(),
};
export const forgotPasswordSchema = joi.object(forgotPassword);

export const userRegisterSchema = joi.object({
  ...loginUser,
  ...resetPassword,
  ...forgotPassword,
  name: joi.string().required(),
  last_name: joi.string().required(),
});
