import { NextFunction, Request, Response } from "express";

export function stringMiddleWare(
  req: Request,
  _: Response,
  next: NextFunction
): void {
  const keys = Object.keys(req.body);
  keys.forEach((key) => {
    if (typeof req.body[key] === "string") {
      req.body[key] = req.body[key].trim();
    }
  });
  next();
}
