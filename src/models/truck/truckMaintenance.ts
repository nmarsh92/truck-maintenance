import { Schema, model, Types } from 'mongoose';
import { AuditableSchema } from '../auditable';
import { Truck } from '../../domain/truck/truck';
import { Auditable } from '../../domain/auditable';

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


