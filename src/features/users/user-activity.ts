import { Schema, Document, model, Types } from 'mongoose';
import { IAuditable, AuditableSchema } from '../../shared/models/auditable';
import { IUser } from './user';

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
  user: Types.ObjectId | IUser;
}

const userActivitySchema = new Schema<IUserActivity>({
  type: { type: String, required: true, enum: Object.values(Activity) },
  user: { type: Types.ObjectId, ref: 'User' },
});

userActivitySchema.add(AuditableSchema);

const UserActivity = model<IUserActivity>('UserActivity', userActivitySchema);

export { IUserActivity, UserActivity, Activity }

