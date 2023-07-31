require("dotenv").config();
import app from "./app";
import { appConfig } from "./config/appConfig";
import { connectToDatabase } from "./config/databaseConfig";
import { startMailerService } from "./config/nodemailer";

async function startServer() {
  startMailerService();
  await connectToDatabase();
  app.listen(appConfig.port, () => {
    console.log(`Magic is happen on port ${appConfig.port}`);
  });
}

startServer();
