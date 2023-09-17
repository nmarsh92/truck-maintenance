import { NextFunction, Request, Response } from 'express';
import { ServerError } from '../domain/error/server-error';
import { updateHandler, createHandler, deleteHandler, getHandler } from '../services/truckService';
import { CreateTruckRequest } from '../api/truck/createTruckRequest';
import { UpdateTruckRequest } from '../api/truck/updateTruckRequest';
import { ResourceResponse } from '../api/resource';
import { mapTo } from '../helpers/autoMapper';
import { AuditableTruck } from '../domain/truck/auditableTruck';
import { TruckResponse } from '../api/truck/truck';
import { AuditableToApiMap } from '../mappings/auditable';

/**
 * TruckController.
 */
export const find = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    throw new ServerError("Endpoint not implemented.");
  } catch (error) {
    next(error);
  }
};

/**
 * Get a truck by ID.
 * @route GET /trucks/:id
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the truck is not found.
 * @throws {ServerError} If there is a server error.
 */
export const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const truck = await getHandler(req.params.id);
    const response = mapTo<AuditableTruck, TruckResponse>(
      truck,
      AuditableToApiMap
    );
    res.status(200).json(response);
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
export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const request: CreateTruckRequest = req.body;
    const truck = await createHandler(request);
    const resource: ResourceResponse = { id: truck._id.toString(), version: truck.__v, createdAt: truck.createdAt }
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a truck by ID.
 * @param req 
 * @param res 
 * @param next 
 */
export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const request: UpdateTruckRequest = req.body;
    await updateHandler(req.params.id, request);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a truck by ID.
 * @param req 
 * @param res 
 * @param next 
 */
export const deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const version: number = Number.parseInt(req.params.version);
    await deleteHandler(req.params.id, version);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
