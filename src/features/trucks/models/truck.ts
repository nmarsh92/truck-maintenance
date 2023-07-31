import { Schema, model } from 'mongoose';
import { Auditable, AuditableSchema } from '../../../shared/models/auditable';
import { HistorySchemaFactory, History, HistoryParent } from '../../../shared/models/history';
const TRUCK_SCHEMA = 'Truck';
const TRUCK_HISTORY_SCHEMA = 'TruckHistory';
/**
 * Represents a Truck entity.
 * @interface
 */
interface Truck {
  fleet?: string;
  driver?: string;
  totalMiles?: number;
  truckName?: string;
  truckNo?: string;
}

/**
 * Represents a Truck entity.
 * @interface
 * @extends {Auditable}
 * @extends {HistoryParent<TruckHistory> }
 */
interface AuditableTruck extends Truck, Auditable, HistoryParent<TruckHistory> { }

/**
 * Historical record of a truck.
 */
interface TruckHistory extends Truck, History<Truck> { }

/**
 * The truck schema.
 * @type {Schema<AuditableTruck>}
 */
const TruckSchema = new Schema<AuditableTruck>({
  fleet: { type: String },
  driver: { type: String },
  totalMiles: { type: Number },
  truckName: { type: String },
  truckNo: { type: String },
}).add(AuditableSchema)
  .add(HistorySchemaFactory.createParent(TRUCK_HISTORY_SCHEMA))

/**
 * The truck history schema.
 * @type {Schema<TruckHistory>}
 */
const TruckHistorySchema = new Schema<TruckHistory>({
  fleet: { type: String },
  driver: { type: String },
  totalMiles: { type: Number },
  truckName: { type: String },
  truckNo: { type: String },
}).add(HistorySchemaFactory.createChild(TRUCK_SCHEMA));

const TruckModel = model<AuditableTruck>(TRUCK_SCHEMA, TruckSchema);
const TruckHistoryModel = model<TruckHistory>(TRUCK_HISTORY_SCHEMA, TruckHistorySchema)

export { TruckModel, Truck, AuditableTruck, TruckHistory, TruckHistoryModel }
