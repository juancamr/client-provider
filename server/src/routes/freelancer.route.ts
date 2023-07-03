import { Router } from "express";
import {
  freelancerLogin,
  freelancerRegister,
  getAllFreelancers,
} from "../controllers/freelancer.controller";
import { updateProfile } from "../controllers/user.controller";

const freelancerRoutesPublic = Router();

freelancerRoutesPublic.post("/register", freelancerRegister);
freelancerRoutesPublic.post("/login", freelancerLogin);
freelancerRoutesPublic.get("/all", getAllFreelancers);

const freelancerRoutes = Router();
freelancerRoutes.patch('/profile', updateProfile)

export { freelancerRoutesPublic, freelancerRoutes };