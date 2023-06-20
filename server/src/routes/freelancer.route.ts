import { Router } from "express";
import { freelancerLogin, freelancerRegister, getAllFreelancers } from "../controllers/freelancer.controller";

const router = Router()

router.post('/register', freelancerRegister)
router.post('/login', freelancerLogin)
router.get('/all', getAllFreelancers)

export default router