import { NextFunction, Request, Response } from "express";

export function verifyRole(role: number) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | undefined => {
    const data = req.body.data;
    if (data.type == role) {
      next();
      return undefined;
    } else {
      console.log("Acceso no autorizado");
      return res.status(401).send("Acceso no autorizado");
    }
  };
}
