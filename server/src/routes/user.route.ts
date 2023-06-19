import { Router } from "express";
import {
  userRegister,
  getAllUsers,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", userRegister);
router.get('/all', getAllUsers)

export default router;
