import express from "express";
import { userRoutes, userRoutesPublic } from "./routes/user.route";
import {
  freelancerRoutes,
  freelancerRoutesPublic,
} from "./routes/freelancer.route";
import verificationRoutes from "./routes/verification.route";
import { authentication } from "./middlewares/authMiddleWare";
import cors from "cors";
import { verifyRole } from "./middlewares/roleMiddleWare";
import { typeUser } from "./utils/constants";

const app = express();

app.use(cors());
app.use(express.json());

//public routes
app.use("/api/public/user", userRoutesPublic);
app.use("/api/public/freelancer", freelancerRoutesPublic);
app.use("/api/verification_code", verificationRoutes);

//middleware
app.use(authentication);

app.use("/api/user", verifyRole(typeUser.USER));
app.use("/api/user", userRoutes);

//mis rutas de usuario

app.use("/api/freelancer", verifyRole(typeUser.FREELANCER));
app.use('/api/freelancer', freelancerRoutes)

//mis rutas de freelancer

export default app;
