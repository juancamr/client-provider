import express from "express";
import userRoutes from "./routes/user.route";
// import { authentication } from "./middlewares/authMiddleWare";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(authentication);

//routes
app.use("/api/user", userRoutes);

export default app;
