import express, { Router } from 'express';
import { find, get, create, deleteOne, update } from './controllers/truckController';
import { VERSION_1 } from './constants/api';
import { createTruckValidator } from './validators/truck/createTruckValidator';
import { updateTruckValidator } from './validators/truck/updateTruckValidator';
export const router: Router = express.Router();
const route = `/api/${VERSION_1}/`;


//TRUCK ROUTES
router.get(`${route}truck/:id`, get);
router.post(`${route}truck/`, createTruckValidator, create);
router.put(`${route}truck/:id`, updateTruckValidator, update);
router.get(`${route}truck/find`, find);

export default router;