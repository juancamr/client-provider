import NextAuth from "next-auth";
import { User } from "./user.model";

interface ResponseAuth extends User {
  accessToken: string;
  success: boolean;
}

declare module "next-auth" {
  interface Session {
    user: ResponseAuth;
  }
}
