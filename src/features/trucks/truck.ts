import { Schema, Document, model } from 'mongoose';
import { AuditableDocument, AuditableSchema } from '../../shared/models/auditable-document';

/**
 * Represents a Truck entity.
 * @interface
 * @extends {AuditableDocument}
 */
interface Truck extends AuditableDocument, Document {
  fleet: string;
  driver: string;
}

const truckSchema = new Schema<Truck>({
  fleet: { type: String, required: true },
  driver: { type: String, required: true },
});

truckSchema.add(AuditableSchema);

const Truck = model<Truck>('Truck', truckSchema);

export { Truck }
