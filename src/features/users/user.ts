import { Schema, model, Types } from 'mongoose';
import { IAuditable, AuditableSchema } from '../../shared/models/auditable';
import { IPermission } from '../auth/permission';
import { IUserActivity } from './user-activity';
import { IHasId } from '../../shared/models/hasId';

const USER_SCHEMA = "User";
/**
 * Represents a User entity.
 * @interface
 * @extends {IAuditable}
 */
interface IUser extends IAuditable, IHasId {
  profile: IUserProfile;
  permissions: Array<IPermission>,
  credentials: IUserCredentials,
  activity: Array<IUserActivity>
}

/**
 * Interface representing the user credentials.
 * @interface IUserCredentials
 */
interface IUserCredentials {
  /**
   * The Google ID of the user.
   * @type {string}
   */
  googleId: string;

}

/**
 * Interface representing the user profile.
 * @interface IUserProfile
 */
interface IUserProfile {
  /**
   * The email address of the user.
   * @type {string}
   */
  email: string;

  /**
   * The first name of the user.
   * @type {string}
   */
  firstName: string;

  /**
   * The last name of the user.
   * @type {string}
   */
  lastName: string;

  /**
   * The phone number of the user.
   * @type {string}
   */
  phone?: string;
}

const userSchema = new Schema<IUser>({
  profile: {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, maxLength: 10, minLength: 10 }
  },
  credentials: { googleId: { type: String, required: true }, tokens: { type: Array<string> } },
  permissions: [{ type: Types.ObjectId, ref: "Permission" }],
  activity: [{ type: Types.ObjectId, ref: "UserActivity" }],
});

userSchema.add(AuditableSchema);

const User = model<IUser>(USER_SCHEMA, userSchema);

export { User, IUser, IUserProfile }
