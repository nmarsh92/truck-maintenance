import { Truck } from "./truck";
import { History } from "../history/history"

/**
 * Historical record of a truck.
 */
export interface TruckHistory extends Truck, History<Truck> { }