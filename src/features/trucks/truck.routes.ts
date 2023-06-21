import express, { Router } from 'express';
import { TruckController } from './truck.controller';
import { validate } from '../../shared/validator';
import { ValidationChain } from "express-validator"
export const base = '/trucks';
export const router: Router = express.Router();
const truckController = new TruckController();
const createRules: ValidationChain[] = [
  //body('fleet').notEmpty().withMessage("Fleet must be provided")
];



router.get("/:id", truckController.get);
router.post("/", validate(createRules), truckController.create);
router.put("/:id", validate(createRules), truckController.update);
router.get("/find", truckController.find);

