import { Request, Response } from "express";

export function getClientes(req: Request, res: Response) {
  res.json({
    success: true,
    cliente: {
      name: "Juan Carlos",
      last_name: "Molero Rojas",
    },
  });
}
