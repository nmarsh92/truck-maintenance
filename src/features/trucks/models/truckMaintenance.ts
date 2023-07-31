import { Schema, model, Types } from 'mongoose';
import { Auditable, AuditableSchema } from '../../../shared/models/auditable';
import { Truck } from './truck';

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
 * @extends {Auditable}
 */
interface TruckMaintenance extends Auditable {
  type: Maintenance;
  frequency: number | Date;
  truck: Types.ObjectId | Truck;
}

const TruckMaintenanceSchema = new Schema<TruckMaintenance>({
  type: { type: String, required: true, enum: Object.values(Maintenance) },
  truck: { type: Types.ObjectId, ref: 'Truck' },
});

TruckMaintenanceSchema.add(AuditableSchema);

export const TruckMaintenanceModel = model<TruckMaintenance>('TruckMaintenance', TruckMaintenanceSchema);


