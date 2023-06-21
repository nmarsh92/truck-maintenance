import { Schema, Document, model, Types } from 'mongoose';
import { IAuditableDocument, AuditableSchema } from '../../../shared/models/auditable-document';
import { ITruck } from './truck';

/**
 *  Event.
 */
enum Maintenance {
  OilChange = 'OIL_CHANGE',
  Inspection = 'INSPECTION'
}

/**
 * Represents a User entity.
 * @interface
 * @extends {IAuditableDocument}
 */
interface TruckMaintenance extends IAuditableDocument, Document {
  type: Maintenance;
  frequency: number | Date;
  truck: Types.ObjectId | ITruck;
}

const truckMaintenanceSchema = new Schema<TruckMaintenance>({
  type: { type: String, required: true, enum: Object.values(Maintenance) },
  truck: { type: Types.ObjectId, ref: 'Truck' },
});

truckMaintenanceSchema.add(AuditableSchema);

export const TruckMaintenance = model<TruckMaintenance>('TruckMaintenance', truckMaintenanceSchema);


