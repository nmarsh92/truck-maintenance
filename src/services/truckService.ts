import { ConflictError } from '../domain/error/conflict';
import { NotFoundError } from '../domain/error/not-found';
import { createHistory } from './historyService';
import { TruckModel } from '../models/truck/truck';
import { CreateTruckRequest } from '../api/truck/createTruckRequest';
import { UpdateTruckRequest } from '../api/truck/updateTruckRequest';
import { Truck } from '../domain/truck/truck';
import { TruckHistory } from '../domain/truck/truckHistory';
import { TruckHistoryModel } from '../models/truck/truckHistory';

/**
* Creates a new truck.
* 
* @param request - The create truck request.
* @returns A promise that resolves to a resource response with the created truck's information.
*/
export const createHandler = async (request: CreateTruckRequest) => {
  const truck = new TruckModel(request);
  const savedTruck = await truck.save();
  return savedTruck;
}

/**
 * Updates an existing truck.
 * 
 * @param id - The ID of the truck to update.
 * @param request - The update truck request.
*/
export const updateHandler = async (id: string, request: UpdateTruckRequest) => {
  const truck = await TruckModel.findById(id);
  if (!truck || truck.isDeleted) throw NotFoundError.CreateWithId(id);

  // Verify version
  if (request.version !== truck.__v) {
    throw new ConflictError();
  }

  const history = await createHistory<Truck, TruckHistory>(truck, TruckHistoryModel);

  //todo: some sort of AutoMapper?
  truck.fleet = request.fleet;
  truck.driver = request.driver;
  truck.totalMiles = request.totalMiles;
  truck.truckName = request.truckName;
  truck.truckNo = request.truckNo;

  truck.history.push(history);


  await truck.save();
}

/**
* Retrieves a truck by its ID.
* 
* @param id - The ID of the truck to retrieve.
* @returns A promise that resolves to the retrieved truck.
* @throws NotFoundError if the truck with the specified ID is not found.
*/
export const getHandler = async (id: string): Promise<Truck> => {
  const truck = await TruckModel.findById(id);
  if (!truck || truck.isDeleted) throw NotFoundError.CreateWithId(id);
  return truck;
}

/**
 * Deletes a truck by its ID.
 * 
 * @param id - The ID of the truck to delete.
 * @param version - The version of the record to delete.
 * @throws NotFoundError if the truck with the specified ID is not found.
 */
export const deleteHandler = async (id: string, version: number) => {
  const truck = await TruckModel.findById(id);
  if (!truck) throw NotFoundError.CreateWithId(id);
  if (version !== truck.__v) {
    throw new ConflictError();
  }
  truck.isDeleted = true;
  truck.save();
}