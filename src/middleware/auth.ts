
import axios from "axios";
import { UnauthorizedError } from "../domain/error/unauthorized";
import { NextFunction, Request, Response } from "express";

export const isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //TODO: Implement this
    // console.log(req.headers.authorization?.split(" ")[1]);
    // const result = await axios.post("https://seashell-app-oc9as.ondigitalocean.app/api/v1/introspect", {
    //   token: req.headers.authorization?.split(" ")[1]
    // }, {
    //   headers: {
    //     "csrf_token": "abc",
    //     "Cookie": "csrf_token=abc"
    //   },
    //   withCredentials: true
    // });
    // console.log(result.data);
    next();
  } catch (error) {
    console.error(error);
    next(error)
  }

}