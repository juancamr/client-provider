import { Freelancer } from "../models/freelancer.model";
import { User } from "../models/user.model";

export interface Response {
  success?: boolean;
  error?: Error;
  data?: any;
  dataList?: any[];
}

export interface ErrorResponse {
  code: string,
  message: string,
  status: number,
  type: string
}

export interface Error {
  code: string;
  message: string;
  status: number;
  type: string;
}
