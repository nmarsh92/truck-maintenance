import { Schema, Document, model, Types } from 'mongoose';
import { IAuditableDocument, AuditableSchema } from '../../shared/models/auditable-document';

/**
 * Represents a Note entity.
 * @interface
 * @extends {IAuditableDocument}
 */
interface Note extends IAuditableDocument, Document {
  forUser: Types.ObjectId;
  message: string;
  title: string;
  truck: Types.ObjectId;
  user: Types.ObjectId;
}

const noteSchema = new Schema<Note>({
  forUser: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
  title: { type: String, required: true },
  truck: { type: Schema.Types.ObjectId, ref: 'Truck' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

noteSchema.add(AuditableSchema);

const Note = model<Note>('Note', noteSchema);

export { Note }
