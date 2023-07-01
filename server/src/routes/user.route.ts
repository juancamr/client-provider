import { Router } from "express";
import {
  userRegister,
  userLogin,
  isUsernameExist,
} from "../controllers/user.controller";

const userRoutesPublic = Router();

userRoutesPublic.post("/register", userRegister);
userRoutesPublic.post("/login", userLogin);
userRoutesPublic.post("/is_username_exist", isUsernameExist);

const userRoutes = Router();

export { userRoutesPublic, userRoutes };
