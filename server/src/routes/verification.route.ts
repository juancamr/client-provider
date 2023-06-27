import { Router } from "express";
import { generateEmailVerificationCode, verifyEmail } from "../controllers/verification.controller";

const router = Router()

router.post('/generate', generateEmailVerificationCode)
router.post('/verify', verifyEmail)

export default router;