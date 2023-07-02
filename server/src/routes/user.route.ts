import { Router } from "express";
import {
  userRegister,
  userLogin,
  isUsernameExist,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller";

const userRoutesPublic = Router();

userRoutesPublic.post("/register", userRegister);
userRoutesPublic.post("/login", userLogin);
userRoutesPublic.post("/is_username_exist", isUsernameExist);
userRoutesPublic.post("/forgot_password", forgotPassword);
userRoutesPublic.post("/reset_password", resetPassword);

const userRoutes = Router();

export { userRoutesPublic, userRoutes };
