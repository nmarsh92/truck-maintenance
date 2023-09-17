import { Truck } from "../domain/truck/truck";
import { TruckModel } from "../models/truck/truck";
import { TruckHistoryModel } from "../models/truck/truckHistory";
import { RepositoryBase } from "./repositoryBase";

/**
 * Represents a truck repository.
 */
export class TruckRepository extends RepositoryBase<typeof TruckModel, Truck> {
  constructor() {
    super(TruckModel, TruckHistoryModel);
  }
}
