import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statuCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statuCode);
  const responseBody = {
    status: statuCode,
    message: err.message,
    stack: err.stack,
  };
  console.log("Error:", responseBody);
  res.json(responseBody);
};
