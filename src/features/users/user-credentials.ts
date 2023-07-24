import { Schema, model } from 'mongoose';


const USER_CREDENTIALS_SCHEMA = "UserCredentials";

/**
 *  Identity provider.
 */
interface IIdentityProvider {
  id: string | number,
  name: string,
}

/**
 * Represents a UserCredentials entity.
 * @interface
 * @extends {IAuditable}
 */
interface IUserCredentials {
  providers: Array<IIdentityProvider>
}

const userSchema = new Schema<IUserCredentials>({
  providers: { type: [{ id: Schema.Types.Mixed, name: String }] },
});

const UserCredentials = model<IUserCredentials>(USER_CREDENTIALS_SCHEMA, userSchema);

export { UserCredentials, IUserCredentials }
