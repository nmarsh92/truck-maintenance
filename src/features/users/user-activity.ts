import { Schema, Document, model, Types } from 'mongoose';
import { IAuditable, AuditableSchema } from '../../shared/models/auditable';
import { IUserProfile } from './user-profile';

/**
 *  Actvity.
 */
enum Activity {
  Login = 'LOGIN',
  LoginAttemptFailed = 'LOGIN_ATTEMPT_FAILED',
  LockedOut = 'LOCKED_OUT'
}

/**
 * Represents a User entity.
 * @interface
 * @extends {IAuditable}
 */
interface IUserActivity extends IAuditable, Document {
  type: Activity,
  user: Types.ObjectId | IUserProfile;
}

const userActivitySchema = new Schema<IUserActivity>({
  type: { type: String, required: true, enum: Object.values(Activity) },
  user: { type: Types.ObjectId, ref: 'UserProfile' },
});

userActivitySchema.add(AuditableSchema);

export const UserActivity = model<IUserActivity>('UserActivity', userActivitySchema);


