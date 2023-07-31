import { Response } from "express";
import { Error } from "../models/zglobal";
import { HTTP_STATUS_CODES } from "../common/httpStatusCode";

export function ok(res: Response, resBody?: any): void {
  res.status(HTTP_STATUS_CODES.OK.status).json({ success: true, ...resBody });
}

export function created(res: Response, data: any, accessToken?: string): void {
  res.status(HTTP_STATUS_CODES.CREATED.status).json({
    success: true,
    data,
    accessToken,
  });
}

export function errorByType(res: Response, error?: Error): void {
  if (error != undefined) {
    res.status(error.status).json({
      success: false,
      ...error,
    });
  } else {
    res.status(500).json({
      success: false,
      error: "Error en responseHelpers",
    });
  }
}

export function simpleRes(
  res: Response,
  code: number,
  isSuccess: boolean,
  body: any
) {
  res.status(code).json({ success: isSuccess, ...body });
}

export function genericRes(
  res: Response,
  code: number,
  isSuccess: boolean,
  message: string
) {
  res.status(code).json({ success: isSuccess, message });
}
