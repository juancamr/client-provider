import { Router } from "express";
import * as controllers from "../controllers/freelancer.controller";
import { updateProfile } from "../controllers/user.controller";
import { validateParams } from "../middlewares/validatorMiddleWare";
import { loginUserSchema, userRegisterSchema } from "./joiSchemas/user.schema";
import { sessionDetail } from "../middlewares/sessionDetailMiddleWare";

const freelancerRoutesPublic = Router();

freelancerRoutesPublic.post(
  "/register",
  validateParams(userRegisterSchema),
  controllers.freelancerRegister
);
freelancerRoutesPublic.post(
  "/login",
  validateParams(loginUserSchema),
  controllers.freelancerLogin
);
freelancerRoutesPublic.get("/all", controllers.getAllFreelancers);

if (process.env.NODE_ENV === "testing") {
  freelancerRoutesPublic.delete(
    "/delete/:username",
    controllers.deleteFreelancer
  );
}

const freelancerRoutes = Router();
freelancerRoutes.patch("/profile", sessionDetail, updateProfile);

export { freelancerRoutesPublic, freelancerRoutes };
