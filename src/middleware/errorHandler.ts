import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode);

  const responseBody: any = {
    status: statusCode,
    message: err.message,
  };

  // Include stack trace only in development mode
  if (process.env.NODE_ENV === "development") {
    responseBody.stack = err.stack;
  }

  // Log the error
  console.log("Error:", responseBody);

  // Send the response
  res.json(responseBody);
};
