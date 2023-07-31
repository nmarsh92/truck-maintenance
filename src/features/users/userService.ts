import { TokenPayload } from "google-auth-library";
import { UnauthorizedError } from "../../shared/errors/unauthorized";
import { ServerError } from "../../shared/errors/server-error";
import { User, UserModel } from "./models/user"
import { Activity, UserActivityModel } from "./models/userActivity";
import { Environment } from "../../shared/environment";
import { ArgumentNullError } from "../../shared/errors/argument-null-error";
import { NotFoundError } from "../../shared/errors/not-found";
import { HydratedDocument } from "mongoose";
/**
 * Gets an existing user or creates a new user based on the provided Google token payload.
 * @param {TokenPayload} payload - The Google token payload containing user information.
 * @returns {Promise<HydratedDocument<User>>} A promise that resolves with the user document.
 * @throws {ServerError} If the payload is not provided.
 * @throws {UnauthorizedError} If the Google domain (hd) is not verified or the email address is not verified.
 */
export const getOrCreateUser = async (payload?: TokenPayload): Promise<HydratedDocument<User>> => {
  if (!payload) throw new ServerError(); //todo figure out appropriate error here

  if (!payload.hd || !Environment.getInstance().verifiedDomains.includes(payload.hd))
    throw new UnauthorizedError();
  if (!payload.email_verified)
    throw new UnauthorizedError("Email address is not verified.");
  let user = await UserModel.findOne({ "providers.googleId": payload.sub });
  let activity = Activity.Login;
  if (!user) {
    user = await UserModel.create({
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email,
      providers: {
        googleId: payload.sub
      }
    });
    activity = Activity.SignUp;
  }
  await UserActivityModel.create({ type: activity, user: user });
  return user;
}

/**
 * Retrieves a user from the database based on their Google ID.
 * @param {string} googleId - The Google ID of the user.
 * @returns {Promise<HydratedDocument<User>>} A promise that resolves with the user document.
 * @throws {ArgumentNullError} If the googleId is not provided.
 * @throws {NotFoundError} If the user with the provided Google ID is not found in the database.
 */
export const getUserByGoogleId = async (googleId: string): Promise<HydratedDocument<User>> => {
  if (!googleId) throw new ArgumentNullError('googleId');
  const user = await UserModel.findOne({ "credentials.googleId": googleId });
  if (!user) throw new NotFoundError("User not found.")
  return user;
}

/**
 * Retrieves a user from the database based on their user ID.
 * @param {string} id - The ID of the user.
 * @returns {Promise<HydratedDocument<User>>} A promise that resolves with the user document.
 * @throws {NotFoundError} If the user with the provided ID is not found in the database.
 */
export const getUserById = async (id: string): Promise<HydratedDocument<User>> => {
  const user = await UserModel.findById(id);
  if (!user) throw new NotFoundError("User not found.")
  return user;
}