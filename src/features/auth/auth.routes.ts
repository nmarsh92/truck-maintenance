import express, { Router } from "express";
import { authorize, google, getUserInfo, token, invalidate } from "./auth.controller";


export const name = 'auth';
export const router: Router = express.Router();

router.post("/google", google)
router.get("/authorize", authorize);
router.get("/userinfo", getUserInfo)
router.get("/token", token);
router.get("/invalidate", invalidate)