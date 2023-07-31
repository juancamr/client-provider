import { Router } from "express";
import { validateParams } from "../middlewares/validatorMiddleWare";
import * as controllers from "../controllers/user.controller";
import * as schemas from "./joiSchemas/user.schema";
import { sessionDetail } from "../middlewares/sessionDetailMiddleWare";

const userRoutesPublic = Router();

userRoutesPublic.post(
  "/register",
  validateParams(schemas.userRegisterSchema),
  controllers.userRegister
);
userRoutesPublic.post(
  "/login",
  validateParams(schemas.loginUserSchema),
  controllers.userLogin
);
userRoutesPublic.post(
  "/forgot_password",
  validateParams(schemas.forgotPasswordSchema),
  controllers.forgotPassword
);
userRoutesPublic.post(
  "/reset_password",
  validateParams(schemas.resetPasswordSchema),
  controllers.resetPassword
);
if (process.env.NODE_ENV === "testing") {
  userRoutesPublic.delete("/delete/:username", controllers.deleteUser);
}

const userRoutes = Router();
userRoutes.patch("/profile", sessionDetail, controllers.updateProfile);

export { userRoutesPublic, userRoutes };
