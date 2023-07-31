import { Schema, ObjectId, model, Types, Document } from "mongoose";

export interface User {
  _id: ObjectId;
  name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    reqired: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export type DocumentUser = Document<unknown, {}, User> &
  Omit<
    User & {
      _id: Types.ObjectId;
    },
    never
  >;

export const UserModel = model<User>("user", userSchema);
