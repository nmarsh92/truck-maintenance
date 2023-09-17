import { ConflictError } from '../domain/error/conflict';
import { CreateTruckRequest } from '../api/truck/createTruckRequest';
import { UpdateTruckRequest } from '../api/truck/updateTruckRequest';
import { Truck } from '../domain/truck/truck';
import { AuditableTruck } from '../domain/truck/auditableTruck';
import { TruckRepository } from '../repositories/truckRepository';
import { ArgumentNullError } from '../domain/error/argument-null-error';
import { PagedRequest } from '../api/pagedRequest';
import { PagedQuery } from '../domain/pagedQuery';
import { PagedResult } from '../domain/pagedResult';
import { Auditable } from '../domain/auditable';

const truckRepository = new TruckRepository();
/**
* Creates a new truck.
* 
* @param request - The create truck request.
* @returns A promise that resolves to a resource response with the created truck's information.
*/
export const createHandler = async (request: CreateTruckRequest): Promise<AuditableTruck> => {
  const truck: Truck = {
    fleet: request.fleet,
    driver: request.driver,
    totalMiles: request.totalMiles,
    truckName: request.truckName,
    truckNo: request.truckNo,
  };

  return await truckRepository.create(truck);
}

/**
 * Updates an existing truck.
 * 
 * @param id - The ID of the truck to update.
 * @param request - The update truck request.
*/
export const updateHandler = async (id: string, request: UpdateTruckRequest) => {
  await truckRepository.ensureVersion(id, request.version);

  const truck: Truck = request;
  truckRepository.update(id, truck);
}

/**
* Retrieves a truck by its ID.
* 
* @param id - The ID of the truck to retrieve.
* @returns A promise that resolves to the retrieved truck.
* @throws NotFoundError if the truck with the specified ID is not found.
*/
export const getHandler = async (id: string): Promise<AuditableTruck> => {
  if (!id) throw new ArgumentNullError('id');
  return await truckRepository.get(id);
}

/**
 * Deletes a truck by its ID.
 * 
 * @param id - The ID of the truck to delete.
 * @param version - The version of the record to delete.
 * @throws NotFoundError if the truck with the specified ID is not found.
 */
export const deleteHandler = async (id: string, version: number) => {
  const truck = await getHandler(id);
  if (version !== truck.__v) {
    throw new ConflictError();
  }
  await truckRepository.softDelete(id);
}

export const findHandler = async (query: PagedRequest): Promise<PagedResult<Truck & Auditable>> => {
  const pagedQuery: PagedQuery = query;

  return await truckRepository.find(pagedQuery);
}