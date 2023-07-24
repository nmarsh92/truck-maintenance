import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../shared/errors/unauthorized";
import { googleLogin } from "../users/user.service";

/**
 *  Login using Google Identity.
 * @param res 
 * @param req 
 * @param next 
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.query.id_token) throw new UnauthorizedError();
    const idToken: string = req.query.id_token.toString();
    const user = await googleLogin(idToken);
    res.status(204).json(user);
    //todo: generate access token


  } catch (error) {
    next(error)
  }
}