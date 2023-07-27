import { TokenPayload } from "google-auth-library";
import { UnauthorizedError } from "../../shared/errors/unauthorized";
import { ServerError } from "../../shared/errors/server-error";
import { IUser, User } from "./user";
import { Activity } from "./user-activity";
import { Environment } from "../../shared/environment";
import bcrypt from "bcrypt";
import { ArgumentNullError } from "../../shared/errors/argument-null-error";
import { NotFoundError } from "../../shared/errors/not-found";
import { HydratedDocument } from "mongoose";
import { Jwt } from "jsonwebtoken";
export const getOrCreateUser = async (payload?: TokenPayload): Promise<HydratedDocument<IUser>> => {
  if (!payload) throw new ServerError(); //todo figure out appropriate error here

  if (!payload.hd || !Environment.getInstance().verifiedDomains.includes(payload.hd))
    throw new UnauthorizedError();
  if (!payload.email_verified)
    throw new UnauthorizedError("Email address is not verified.");
  let user = await User.findOne({ "credentials.googleId": payload.sub });
  if (!user)
    user = await User.create({
      profile: {
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
      },
      credentials: {
        googleId: payload.sub
      },
      activity: [
        {
          type: Activity.SignUp
        }
      ]
    });
  return user;
}

export const getUserByGoogleId = async (googleId: string): Promise<HydratedDocument<IUser>> => {
  if (!googleId) throw new ArgumentNullError('googleId');
  const user = await User.findOne({ "credentials.googleId": googleId });
  if (!user) throw new NotFoundError("User not found.")
  return user;
}

export const getUserById = async (id: string): Promise<HydratedDocument<IUser>> => {
  const user = await User.findById(id);
  if (!user) throw new NotFoundError("User not found.")
  return user;
}