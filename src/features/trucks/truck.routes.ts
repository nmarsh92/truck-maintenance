import express, { Router } from 'express';
import { TruckController } from './truck.controller';
import { validate } from '../../shared/validator';
import { ValidationChain } from "express-validator"
import { isAuthorized } from '../../shared/middleware/auth';
export const base = '/trucks';
export const router: Router = express.Router();
const truckController = new TruckController();
const createRules: ValidationChain[] = [
  //body('fleet').notEmpty().withMessage("Fleet must be provided")
];



router.get("/:id", isAuthorized, truckController.get);
router.post("/", isAuthorized, validate(createRules), truckController.create);
router.put("/:id", isAuthorized, validate(createRules), truckController.update);
router.get("/find", isAuthorized, truckController.find);

