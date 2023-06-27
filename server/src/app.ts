import express from "express";
import userRoutes from "./routes/user.route";
import freelancerRoutes from './routes/freelancer.route'
import verificationRoutes from './routes/verification.route'
import { authentication } from "./middlewares/authMiddleWare";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(authentication);

//routes
app.use("/api/user", userRoutes);
app.use('/api/freelancer', freelancerRoutes)
app.use('/api/verification_code', verificationRoutes)

export default app;
