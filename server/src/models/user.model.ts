import { Schema, model, Document } from "mongoose";

interface user {
  name: string;
  last_name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<user>({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<user>("user", userSchema);
export { user, User };
