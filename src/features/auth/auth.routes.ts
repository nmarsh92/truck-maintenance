import express, { Router } from "express";
import { checkCsrf } from "../../shared/middleware/csrf";
import { authorize, google, login, getUserInfo } from "./auth.controller";


export const name = 'auth';
export const router: Router = express.Router();

router.post("/google-login", checkCsrf, login);
router.post("/google", google)
router.get("/authorize", authorize);
router.get("/userinfo", getUserInfo)