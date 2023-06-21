import { ConflictError } from '../../shared/errors/conflict';
import { NotFoundError } from '../../shared/errors/not-found';
import { ResourceResponse, Resource } from '../../shared/responses/resource';
import { HistoryService } from '../../shared/services/history.service';
import { Truck, TruckHistory, ITruck, ITruckHistory } from './models/truck';
import { CreateTruckRequest } from './requests/create-truck';
import { UpdateTruckRequest } from './requests/update-truck';

/**
 * Service for managing trucks.
 */
export class TruckService {

  private historyService: HistoryService<ITruck, ITruckHistory>;

  /**
  * Constructs a new instance of the TruckService class.
  */
  constructor() {
    this.historyService = new HistoryService()
  }

  /**
  * Creates a new truck.
  * 
  * @param request - The create truck request.
  * @returns A promise that resolves to a resource response with the created truck's information.
  */
  public async create(request: CreateTruckRequest): Promise<Resource<string>> {
    const truck = new Truck(request);
    const savedTruck = await truck.save();
    return new ResourceResponse(savedTruck.id, savedTruck.__v, savedTruck.createdAt);
  }

  /**
   * Updates an existing truck.
   * 
   * @param id - The ID of the truck to update.
   * @param request - The update truck request.
 */
  public async update(id: string, request: UpdateTruckRequest) {
    const truck = await Truck.findById(id);
    if (!truck) throw NotFoundError.CreateWithId(id);

    // Verify version
    if (request.version !== truck.__v) {
      throw new ConflictError();
    }

    const history = await this.historyService.createHistory(truck, TruckHistory);

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
  public async get(id: string): Promise<ITruck> {
    const truck = await Truck.findById(id);
    if (!truck) throw NotFoundError.CreateWithId(id);
    return truck;
  }

  /**
   * Deletes a truck by its ID.
   * 
   * @param id - The ID of the truck to delete.
   * @throws NotFoundError if the truck with the specified ID is not found.
   */
  public async delete(id: string) {
    const truck = await Truck.findById(id);
    if (!truck) throw NotFoundError.CreateWithId(id);
    truck.isDeleted = true;
    truck.save();
  }
}