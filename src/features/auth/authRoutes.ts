import express, { NextFunction, Request, Response, Router } from "express";
import { authorize, google, getUserInfo, token, invalidate } from "./authController";
import { getUserById } from "../users/userStore";


export const name = 'auth';
export const router: Router = express.Router();

router.post("/google", google)
router.get("/authorize", authorize);
router.get("/userinfo", getUserInfo)
router.get("/token", token);
router.get("/invalidate", invalidate)
router.get("/user/:id", async (req: Request, res: Response, next: NextFunction) => {
  const user = await getUserById(req.params.id);
  res.status(200).json(user);
})