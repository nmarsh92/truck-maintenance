import { Schema, Document, model, Types } from 'mongoose';
import { IAuditableDocument, AuditableSchema } from '../../shared/models/auditable-document';
import { IUserProfile } from './user-profile';
/**
 * Represents a User entity.
 * @interface
 * @extends {IAuditableDocument}
 */
interface IUserCredentials extends IAuditableDocument, Document {
  hashedPassword: string;
  salt: string;
  lockedAt: Date;
  lockedMins: number;
  attempts: number;
  isAdmin: boolean;
  profile: Types.ObjectId | IUserProfile;
}

const userCredentialsSchema = new Schema<IUserCredentials>({
  hashedPassword: { type: String, required: true },
  salt: { type: String, required: true },
  lockedAt: { type: Date },
  lockedMins: { type: Number, default: 0 },
  attempts: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  profile: { type: Types.ObjectId, ref: 'UserProfile' },
});

userCredentialsSchema.add(AuditableSchema);

export const UserCredentials = model<IUserCredentials>('UserCredentials', userCredentialsSchema);
