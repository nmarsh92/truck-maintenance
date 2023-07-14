import { Schema, model } from 'mongoose';
import { IAuditable, AuditableSchema } from '../../../shared/models/auditable';
import { HistorySchemaFactory, IHistory, IHistoryParent } from '../../../shared/models/history';
const TRUCK_SCHEMA = 'Truck';
const TRUCK_HISTORY_SCHEMA = 'TruckHistory';
/**
 * Represents a Truck entity.
 * @interface
 */
interface ITruck {
  fleet?: string;
  driver?: string;
  totalMiles?: number;
  truckName?: string;
  truckNo?: string;
}

/**
 * Represents a Truck entity.
 * @interface
 * @extends {IAuditable}
 * @extends {IHistoryParent<ITruckHistory> }
 */
interface IAuditableTruck extends ITruck, IAuditable, IHistoryParent<ITruckHistory> { }

/**
 * Historical record of a truck.
 */
interface ITruckHistory extends ITruck, IHistory<ITruck> { }

/**
 * The truck schema.
 * @type {Schema<IAuditableTruck>}
 */
const truckSchema = new Schema<IAuditableTruck>({
  fleet: { type: String },
  driver: { type: String },
  totalMiles: { type: Number },
  truckName: { type: String },
  truckNo: { type: String },
}).add(AuditableSchema)
  .add(HistorySchemaFactory.createParent(TRUCK_HISTORY_SCHEMA))

/**
 * The truck history schema.
 * @type {Schema<ITruckHistory>}
 */
const truckHistorySchema = new Schema<ITruckHistory>({
  fleet: { type: String },
  driver: { type: String },
  totalMiles: { type: Number },
  truckName: { type: String },
  truckNo: { type: String },
}).add(HistorySchemaFactory.createChild(TRUCK_SCHEMA));

const Truck = model<IAuditableTruck>(TRUCK_SCHEMA, truckSchema);
const TruckHistory = model<ITruckHistory>(TRUCK_HISTORY_SCHEMA, truckHistorySchema)

export { Truck, ITruck, IAuditableTruck, TruckHistory, ITruckHistory }
