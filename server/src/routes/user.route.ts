import { Router } from "express";
import {
  userRegister,
  userLogin,
  isUsernameExist,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", userRegister);
router.post('/login', userLogin)
router.post('/is_username_exist', isUsernameExist)

export default router;
