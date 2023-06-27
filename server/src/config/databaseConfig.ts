import mongoose, { MongooseError } from "mongoose";

export async function connectToDatabase() {
  await mongoose
    .connect(process.env.DB_URI ?? "")
    .then(() => console.log('Connected to MongoDB'))
    .catch((error: MongooseError) => console.log(error))
}
