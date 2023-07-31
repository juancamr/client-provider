import express from "express";
import { userRoutes, userRoutesPublic } from "./routes/user.route";
import { TYPE_MODEL } from "./common/constants";
import {
  freelancerRoutes,
  freelancerRoutesPublic,
} from "./routes/freelancer.route";
import verificationRoutes from "./routes/verification.route";
import cors from "cors";
import { authentication } from "./middlewares/authMiddleWare";
import helmet from "helmet";
const xssClean = require("xss-clean");
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import { verifyRole } from "./middlewares/roleMiddleWare";
import { stringMiddleWare } from "./middlewares/stringMiddleWare";

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

//default middlewares
app.use(stringMiddleWare);
app.use(helmet());
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());
app.use(limiter);

//public routes
app.use("/api/public/user", userRoutesPublic);
app.use("/api/public/freelancer", freelancerRoutesPublic);
app.use("/api/verification_code", verificationRoutes);

//authentication middleware jwt
app.use(authentication);

app.use("/api/user", verifyRole(TYPE_MODEL.USER));
app.use("/api/user", userRoutes);

app.use("/api/freelancer", verifyRole(TYPE_MODEL.FREELANCER));
app.use("/api/freelancer", freelancerRoutes);

export default app;
