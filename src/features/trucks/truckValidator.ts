import { body } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export const createTruckValidator = (req: Request, res: Response, next: NextFunction) => {
  return body('fleet').notEmpty()(req, res, next);
}