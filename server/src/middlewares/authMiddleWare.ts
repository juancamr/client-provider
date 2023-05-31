import { Request, Response, NextFunction } from "express";

export function authentication(req: Request, res: Response, next: NextFunction) {
    //realizar la autenticacion por jwt
    next();
}
