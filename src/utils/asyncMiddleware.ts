import { NextFunction, Request, Response } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncMiddleware = (handler: AsyncHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      console.error(`Async Error: ${error.message}`, { stack: error.stack });
      next(error);
    }
  };
};
