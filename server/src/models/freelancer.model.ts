import { Schema, ObjectId, model, Types, Document } from "mongoose";

export interface Freelancer {
  _id: ObjectId;
  name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  picture: string;
}

const freelancerSchema = new Schema<Freelancer>({
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
  picture: {
    type: String,
    default: "",
  },
});

export interface FreelancerPublic
  extends Pick<
    Freelancer,
    "name" | "last_name" | "username" | "email" | "picture"
  > {}

export type DocumentFreelancer = Document<unknown, {}, Freelancer> &
  Omit<
    Freelancer & {
      _id: Types.ObjectId;
    },
    never
  >;

export const FreelancerModel = model<Freelancer>(
  "freelancer",
  freelancerSchema
);
