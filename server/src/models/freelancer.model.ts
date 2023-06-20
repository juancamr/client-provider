import { ObjectId, Schema, model } from "mongoose";

export interface Freelancer {
  _id: ObjectId;
  name: string;
  last_name: string;
  email: string;
  password: string;
  picture: string;
}

export interface FreelancerPublic
  extends Pick<Freelancer, "name" | "last_name" | "email" | "picture"> {}

const freelancerSchema = new Schema<Freelancer>({
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
  picture: {
    type: String,
    default: "",
  },
});

export const FreelancerModel = model<Freelancer>(
  "freelancer",
  freelancerSchema
);
