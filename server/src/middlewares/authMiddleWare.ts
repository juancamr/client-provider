import { Request, Response, NextFunction } from "express";
import { decodeTokenJWT } from "../utils/utils";

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token: string = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    console.log("no se pudo obtener el token");
    return res.status(401).send("Acceso no autorizado");
  }
  try {
    const data = decodeTokenJWT(token);
    req.body.data = data;
    next();
    return undefined;
  } catch (error) {
    return res.status(401).json({ message: "Token invalido" });
  }
}
