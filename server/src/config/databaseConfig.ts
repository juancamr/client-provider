import mongoose from "mongoose";

export async function connectToDatabase() {
  await mongoose.connect(process.env.DB_URI ?? "");
}
