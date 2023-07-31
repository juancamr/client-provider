import { NextFunction, Request, Response } from "express";
import joi from "joi";

export function validateParams(schema: joi.ObjectSchema) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | undefined => {
    const { error } = schema.validate(req.body);
    if (error) {
      const err = error as any;
      return res.status(400).json({
        error: "Datos no validos o parametros insuficientes",
        message: err.details[0].message,
        details: err.details,
      });
    }
    next();
    return undefined;
  };
}
