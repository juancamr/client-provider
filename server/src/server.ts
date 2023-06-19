require('dotenv').config()
import app from "./app";
import { appConfig } from "./config/appConfig";
import { connectToDatabase } from "./config/databaseConfig";

async function startServer() {
  await connectToDatabase();
  app.listen(appConfig.port, () => {
    console.log("The server is running on port 3000");
  });
}

startServer();