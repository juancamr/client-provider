import { Request, Response, NextFunction } from "express";
import { decodeTokenJWT } from "../utils/encryptionUtils";
import { errorByType } from "../utils/requestUtils";
import { errOther } from "../common/errors/others.error";

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
    // console.log("no se pudo obtener el token");
    return errorByType(res, errOther.UNAUTHORIZED_ACCESS);
  }
  try {
    const data = decodeTokenJWT(token);
    req.body.data = data;
    next();
    return undefined;
  } catch (err) {
    console.log(err);
    return errorByType(res, {
      ...errOther.UNAUTHORIZED_ACCESS,
      message: "Token invalido",
    });
  }
}
