import { ObjectId, Schema, Types, model } from "mongoose";
import { AuditableSchema, IAuditable } from "../../shared/models/auditable";

const REFRESH_TOKEN_SCHEMA = "Refresh";
/**
 * Interface representing the user credentials.
 * @interface IUserCredentials
 */
interface IRefreshTokenStore extends IAuditable {
  /**
   * The Google ID of the user.
   * @type {string}
   */
  userId: ObjectId;

  /**
   * Hashed refresh tokens.
   */
  hashedTokenIdentifiers: string[];
}

const refreshTokenSchema = new Schema<IRefreshTokenStore>({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  hashedTokenIdentifiers: [{ type: String, required: true }]
});

refreshTokenSchema.add(AuditableSchema);

const RefreshToken = model<IRefreshTokenStore>(REFRESH_TOKEN_SCHEMA, refreshTokenSchema);

export { RefreshToken, IRefreshTokenStore }