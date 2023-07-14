import { Schema, Document, model, Types } from 'mongoose';
import { IAuditable, AuditableSchema } from '../../../shared/models/auditable';
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
 * @extends {IAuditable}
 */
interface TruckMaintenance extends IAuditable {
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


