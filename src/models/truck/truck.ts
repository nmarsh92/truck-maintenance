import { Schema, model } from 'mongoose';
import { AuditableSchema } from '../auditable';
import { HistorySchemaFactory } from '../history';
import { AuditableTruck } from '../../domain/truck/auditableTruck';
import { TRUCK_HISTORY_SCHEMA } from './truckHistory';

export const TRUCK_SCHEMA = 'Truck';


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



const TruckModel = model<AuditableTruck>(TRUCK_SCHEMA, TruckSchema);


export { TruckModel }
