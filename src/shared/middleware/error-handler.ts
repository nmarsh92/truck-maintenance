import type { ErrorRequestHandler } from "express";
import { Request, Response, NextFunction } from 'express';
import { HttpError } from "../errors/http-error";
/**
 * Error handling middleware for HttpErrors.
 * @param {Error} error 
 * @param {Request} _ 
 * @param {Request} res 
 * @param {NextFunction} next 
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ ...error, message: error.message });
    return;
  }

  res.status(500).json({ ...error, message: error.message })
}