import { ArgumentNullError } from "../../shared/errors/argument-null-error";
import { getUserById } from "../users/user.service";
import bcrypt from "bcrypt";
import { IRefreshTokenStore, RefreshToken } from "./token";
import { HydratedDocument } from "mongoose";
import { NotFoundError } from "../../shared/errors/not-found";
import { v4 as uuidv4 } from 'uuid';
import jwt, { SignOptions } from "jsonwebtoken";
import { IRefreshTokenPayload } from "./token-payload";
import { Environment } from "../../shared/environment";
import { UnauthorizedError } from "../../shared/errors/unauthorized";
const saltRounds = 10;

/**
 * Adds a new refresh token to the database or retrieves an existing one.
 *
 * @param {string} userId - The ID of the user for whom the refresh token is associated.
 * @param {boolean} create - A flag indicating whether to create a new refresh token if it doesn't exist.
 * @returns {Promise<string>} - The newly generated token key if a new refresh token is created.
 * @throws {ArgumentNullError} - When `userId` is empty or not provided.
 * @throws {NotFoundError} - When `create` is false and the refresh token doesn't exist.
 */
export const addAndGetRefreshToken = async (userId?: string, clientId?: string, createRecord?: boolean): Promise<string> => {
  if (!userId) throw new ArgumentNullError('id');
  if (!clientId) throw new ArgumentNullError('clientId');
  const env = Environment.getInstance();
  const tokenKey = uuidv4();
  const user = await getUserById(userId);
  let refreshToken = await RefreshToken.findOne({ userId });

  if (!refreshToken) {
    if (createRecord) {
      // If create flag is true and the refreshToken doesn't exist, create a new one
      refreshToken = new RefreshToken({
        userId: userId,
        hashedTokenIdentifiers: [] // Initialize an empty array for storing hashed tokens
      });
    } else {
      throw new NotFoundError();
    }
  }
  const refreshPayload: IRefreshTokenPayload = {
    key: tokenKey,
    email: user.profile.email,
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
  }
  const hash = await getTokenHash(tokenKey);
  refreshToken.hashedTokenIdentifiers.push(hash);



  await refreshToken.save();
  return jwt.sign(refreshPayload, env.getSecret(clientId), { expiresIn: 864000, subject: userId, audience: env.audience, issuer: env.issuer });
}

/**
 * Invalidates a specific refresh token for a user.
 *
 * @param {string} userId - The ID of the user associated with the refresh token.
 * @param {string} tokenKey - The token key to be invalidated.
 * @throws {ArgumentNullError} - When `userId` or `tokenKey` is empty or not provided.
 */
export const invalidateRefreshToken = async (userId?: string, tokenKey?: string) => {
  if (!userId) throw new ArgumentNullError('id');
  if (!tokenKey) throw new ArgumentNullError('tokenId');
  const user = await getUserById(userId);
  const token = await getRefreshToken(userId);
  const hash = await getTokenHash(tokenKey);
  token.hashedTokenIdentifiers = token.hashedTokenIdentifiers.filter(tHash => {
    return tHash !== hash;
  });
}

/**
 * Validates the refresh token for the given user.
 * @param {string} userId - The ID of the user for whom to validate the refresh token.
 * @param {string} tokenKey - The token key to be validated.
 * @returns {Promise<void>} A Promise that resolves when the validation is successful.
 * @throws {ArgumentNullError} If the `userId` or `tokenKey` parameters are null or empty.
 * @throws {NotFoundError} If the user is not found.
 * @throws {UnauthorizedError} If the refresh token is invalid.
 */
export const validateRefreshToken = async (userId?: string, tokenKey?: string): Promise<void> => {
  if (!userId) throw new ArgumentNullError('id');
  if (!tokenKey) throw new ArgumentNullError('tokenId');

  // Retrieve the user from the database
  const user = await getUserById(userId);

  // Get the refresh token document for the user
  const token = await getRefreshToken(userId);

  // Hash the token key for comparison
  const hash = await getTokenHash(tokenKey);

  // Check if the provided token key matches any of the hashed token identifiers in the document
  if (!token.hashedTokenIdentifiers.some(tHash => tHash === hash)) {
    throw new UnauthorizedError("Invalid refresh token.");
  }
};


/**
 * Gets the refresh token for a specific user.
 *
 * @param {string} userId - The ID of the user for whom to retrieve the refresh token.
 * @returns {Promise<HydratedDocument<IRefreshTokenStore>>} - The retrieved refresh token document.
 * @throws {ArgumentNullError} - When `userId` is empty or not provided.
 * @throws {NotFoundError} - When the refresh token for the user is not found.
 */
const getRefreshToken = async (userId: string): Promise<HydratedDocument<IRefreshTokenStore>> => {
  if (!userId) throw new ArgumentNullError('userId');
  const token = await RefreshToken.findOne({ userId: userId });
  if (!token) throw new NotFoundError("No refresh tokens found.");
  return token;
}

/**
 * Generates a hash for the provided token identifier using bcrypt.
 *
 * @param {string} tokenIdentifier - The token identifier to be hashed.
 * @returns {Promise<string>} - The hashed token identifier.
 * @throws {ArgumentNullError} - When `tokenIdentifier` is empty or not provided.
 */
const getTokenHash = async (tokenIdentifier: string) => {
  if (!tokenIdentifier) throw new ArgumentNullError("TokenIdentifer");
  return await bcrypt.hash(tokenIdentifier, saltRounds);
}