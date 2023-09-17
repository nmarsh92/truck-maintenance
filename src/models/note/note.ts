import { Schema, model } from 'mongoose';
import { AuditableSchema } from '../auditable';
import { Note } from '../../domain/note/note';

const noteSchema = new Schema<Note>({
  forUser: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
  title: { type: String, required: true },
  truck: { type: Schema.Types.ObjectId, ref: 'Truck' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

noteSchema.add(AuditableSchema);

const NoteModel = model<Note>('Note', noteSchema);

export { NoteModel }
