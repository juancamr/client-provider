import { Router } from "express";
import {
  freelancerLogin,
  freelancerRegister,
  getAllFreelancers,
} from "../controllers/freelancer.controller";

const freelancerRoutesPublic = Router();

freelancerRoutesPublic.post("/register", freelancerRegister);
freelancerRoutesPublic.post("/login", freelancerLogin);
freelancerRoutesPublic.get("/all", getAllFreelancers);

const freelancerRoutes = Router();

export { freelancerRoutesPublic, freelancerRoutes };