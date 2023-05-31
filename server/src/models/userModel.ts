import { Schema, model, Document } from "mongoose";

interface User extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = model<User>("user", userSchema);
export { User, userModel };
