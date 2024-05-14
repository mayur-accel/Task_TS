import { NextFunction, Request, Response } from "express";

export const asyncMiddleware = (
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error("Async Error:", error);
      next(error);
      // res.status(500).json({ error: "Internal server error" });
    }
  };
};
