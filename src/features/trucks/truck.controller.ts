import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../../shared/errors/not-found';
import { Truck } from './truck';
import { HttpError } from '../../shared/errors/http-error';
/**
 * TruckController.
 */
export class TruckController {
  async find(req: Request, res: Response, next: NextFunction): Promise<void> {
    //todo search for Trucks
  }
  /**
   * Get a truck by ID.
   * @route GET /trucks/:id
   * @returns {Promise<void>} 
   * @throws {NotFoundError} If the user is not found.
   * @throws {ServerError} If there is a server error.
*/
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.query.error === 'true') return next(new NotFoundError("Record does not exist."));
    console.log(req.query);

    res.status(200).json(req.query);
  }

  /**
   * Create a new truck.
   * @route POST /trucks/:id
   * @returns {Promise<void>} 
   * @throws {NotFoundError} If the user is not found.
   * @throws {ServerError} If there is a server error.
  */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const truck = new Truck({
      fleet: req.body?.fleet,
      driver: req.body?.driver
    })

    try {
      const savedTruck = await truck.save();
      res.status(201).json(savedTruck);
      return;
    } catch (error) {
      next(error);
    }
    res.status(500).json(new HttpError("Something went wrong"));
  }
}