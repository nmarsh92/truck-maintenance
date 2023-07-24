import { Schema, Document, model, Types } from 'mongoose';
import { IAuditable, AuditableSchema } from '../../shared/models/auditable';
import { IUserProfile } from './user-profile';
import { IPermission } from '../auth/permission';
import { IUserCredentials } from './user-credentials';
import { IUserActivity } from './user-activity';

const USER_SCHEMA = "User";
/**
 * Represents a User entity.
 * @interface
 * @extends {IAuditable}
 */
interface IUser extends IAuditable {
  profile: Types.ObjectId | IUserProfile;
  permissions: Array<IPermission>,
  credentials: IUserCredentials,
  activity: Array<IUserActivity>
}

const userSchema = new Schema<IUser>({
  profile: { type: Types.ObjectId, ref: 'UserProfile' },
  permissions: [{ type: Types.ObjectId, ref: "Permission" }],
  credentials: { type: Types.ObjectId, ref: "UserCredential" },
  activity: [{ type: Types.ObjectId, ref: "UserActivity" }]
});

userSchema.add(AuditableSchema);

const User = model<IUser>(USER_SCHEMA, userSchema);

export { User, IUser }
