import express from "express";
import { userRoutesPublic } from "./routes/user.route";
import { freelancerRoutesPublic } from "./routes/freelancer.route";
import protectedRoutes from "./routes/protected.route";
import verificationRoutes from "./routes/verification.route";
import { authentication } from "./middlewares/authMiddleWare";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

//public routes
app.use("/api/public/user", userRoutesPublic);
app.use("/api/public/freelancer", freelancerRoutesPublic);
app.use("/api/verification_code", verificationRoutes);

//middleware
app.use(authentication);

//protected routes

export default app;
