import express, { Router } from 'express';
import { TruckController } from './truck.controller';
export const base = '/truck';
export const router: Router = express.Router();
const truckController = new TruckController();

router.get("/", truckController.get);
router.post("/", truckController.create);
router.get("/find", truckController.find);

