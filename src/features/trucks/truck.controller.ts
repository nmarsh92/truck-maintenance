import { NextFunction, Request, Response } from 'express';
import { ServerError } from '../../shared/errors/server-error';
import { TruckService } from './truck.service';
import { CreateTruckRequest } from './requests/create-truck';
import { UpdateTruckRequest } from './requests/update-truck';

/**
 * TruckController.
 */
export class TruckController {
  truckService: TruckService;

  constructor() {
    this.truckService = new TruckService();
  }

  find = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // todo: search for Trucks
    next(new ServerError("Endpoint not implemented."));
  };

  /**
   * Get a truck by ID.
   * @route GET /trucks/:id
   * @returns {Promise<void>}
   * @throws {NotFoundError} If the truck is not found.
   * @throws {ServerError} If there is a server error.
   */
  get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const truck = await this.truckService.get(req.params.id);
      res.status(200).json(truck);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create a new truck.
   * @route POST /trucks/:id
   * @returns {Promise<void>}
   * @throws {ServerError} If there is a server error.
   */
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const request: CreateTruckRequest = req.body;
      const resource = await this.truckService.create(request);
      res.status(201).json(resource);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const request: UpdateTruckRequest = req.body;
      await this.truckService.update(req.params.id, request);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      throw new ServerError("Not implemented.");
    } catch (error) {
      next(error);
    }
  };
}