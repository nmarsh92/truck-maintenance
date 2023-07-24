import express, { Router } from "express";
import { checkCsrf } from "../../shared/middleware/csrf";
import { login } from "./auth.controller";


export const base = '/auth';
export const router: Router = express.Router();

router.post("/google-login", checkCsrf, login);