import { Schema, model } from 'mongoose';
import { IAuditableDocument, AuditableSchema } from '../../../shared/models/auditable-document';
import { HistorySchemaFactory, IHistoryDocument } from '../../../shared/models/history-document';

/**
 * Represents a Truck entity.
 * @interface
 * @extends {AuditableDocument}
 */
interface ITruck extends IAuditableDocument {
  fleet?: string;
  driver?: string;
  totalMiles?: number;
  truckName?: string;
  truckNo?: string;
  history: ITruckHistory[];
}

/**
 * todo
 */
interface ITruckHistory extends IHistoryDocument<ITruck> {
  fleet?: string;
  driver?: string;
  totalMiles?: number;
  truckName?: string;
  truckNo?: string;
}

/**
 * todo
 */
const truckSchema = new Schema<ITruck>({
  fleet: { type: String },
  driver: { type: String },
  totalMiles: { type: Number },
  truckName: { type: String },
  truckNo: { type: String },
  history: [{ type: Schema.Types.ObjectId, ref: 'TruckHistory' }]
}).add(AuditableSchema);

/**
 * todo
 */
const truckHistorySchema = new Schema<ITruckHistory>({
  fleet: { type: String },
  driver: { type: String },
  totalMiles: { type: Number },
  truckName: { type: String },
  truckNo: { type: String },
}).add(HistorySchemaFactory.create("Truck"));

const Truck = model<ITruck>('Truck', truckSchema);
const TruckHistory = model<ITruckHistory>('TruckHistory', truckHistorySchema)

export { Truck, ITruck, TruckHistory, ITruckHistory }
