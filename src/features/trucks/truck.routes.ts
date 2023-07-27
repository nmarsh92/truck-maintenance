import express, { Router } from 'express';
import { find, get, create, deleteOne, update } from './truck.controller';
import { validate } from '../../shared/validator';
import { ValidationChain } from "express-validator"
import { isAuthorized } from '../../shared/middleware/auth';
import { checkCsrf } from '../../shared/middleware/csrf';
export const name = 'trucks';
export const router: Router = express.Router();
const createRules: ValidationChain[] = [
  //body('fleet').notEmpty().withMessage("Fleet must be provided")
];



router.get("/:id", checkCsrf, get);
router.post("/", checkCsrf, validate(createRules), create);
router.put("/:id", checkCsrf, validate(createRules), update);
router.get("/find", checkCsrf, find);

