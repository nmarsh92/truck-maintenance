import { Schema, model } from 'mongoose';
import { AuditableSchema } from '../auditable';
import { HistorySchemaFactory } from '../history';
import { Auditable } from '../../domain/auditable';
import { HistoryParent } from '../../domain/history/historyParent';
import { Truck } from '../../domain/truck/truck';
import { TruckHistory } from '../../domain/truck/truckHistory';
import { TRUCK_SCHEMA, TRUCK_HISTORY_SCHEMA } from '../../constants/schemas';



/**
 * The truck schema.
 * @type {Schema<AuditableTruck>}
 */
const TruckSchema = new Schema<Truck & Auditable & HistoryParent<TruckHistory>>({
  fleet: { type: String },
  driver: { type: String },
  totalMiles: { type: Number },
  truckName: { type: String },
  truckNo: { type: String },
}).add(AuditableSchema)
  .add(HistorySchemaFactory.createParent(TRUCK_HISTORY_SCHEMA))



const TruckModel = model<Truck & Auditable & HistoryParent<TruckHistory>>(TRUCK_SCHEMA, TruckSchema);


export { TruckModel }
