import { Schema, Document, model, Types } from 'mongoose';
import { IAuditableDocument, AuditableSchema } from '../../shared/models/auditable-document';

/**
 * Represents a User entity.
 * @interface
 * @extends {AuditableDocument}
 */
interface IUserProfile extends IAuditableDocument, Document {
  // forUser: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const userProfileSchema = new Schema<IUserProfile>({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true, maxLength: 10, minLength: 10 }
});

userProfileSchema.add(AuditableSchema);

const UserProfile = model<IUserProfile>('UserProfile', userProfileSchema);

export { UserProfile, IUserProfile }
