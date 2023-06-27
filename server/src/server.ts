require('dotenv').config()
import app from "./app";
import { appConfig } from "./config/appConfig";
import { connectToDatabase } from "./config/databaseConfig";

async function startServer() {
  await connectToDatabase();
  app.listen(appConfig.port, () => {
    console.log(`Magic is happen on port ${appConfig.port}`);
  });
}

startServer();