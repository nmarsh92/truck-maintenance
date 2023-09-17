import { Auditable } from "../auditable";
import { HistoryParent } from "../history/historyParent";
import { Truck } from "./truck";
import { TruckHistory } from "./truckHistory";

/**
 * Represents a Truck entity.
 * @interface
 * @extends {Auditable}
 * @extends {HistoryParent<TruckHistory> }
 */
export interface AuditableTruck extends Truck, Auditable, HistoryParent<TruckHistory> { }