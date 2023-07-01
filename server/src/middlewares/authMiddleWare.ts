import { Request, Response, NextFunction } from "express";
import { decodeTokenJWT } from "../utils/utils";

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }
  try {
    const decodedToken = decodeTokenJWT(token);
    req.body.user = decodedToken;
    next();
    return undefined;
  } catch (error) {
    return res.status(401).json({ message: "Token invalido" });
  }
}
