import { OAuth2Client, TokenPayload } from "google-auth-library";
import { UnauthorizedError } from "../../shared/errors/unauthorized";
import { ServerError } from "../../shared/errors/server-error";
import { IUser, User } from "./user";
import { UserCredentials } from "./user-credentials";
import { Activity } from "./user-activity";

export const googleLogin = async (idToken: string) => {
  const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_CLIENT_SECRET);
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
  });


  const payload = ticket.getPayload();
  if (!payload) throw new ServerError(); //todo figure out appropriate error here

  if (payload.hd !== process.env.VERIFIED_DOMAIN)
    throw new UnauthorizedError();
  if (!payload.email_verified)
    throw new UnauthorizedError("Email address is not verified.");
  let user = await User.findOne({ "profile.email": payload.email });
  if (!user)
    user = await User.create({
      profile: {
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
      },
      credentials: {
        providers: [
          {
            id: payload.sub,
            name: 'Google'
          }
        ]
      },
      activity: [
        {
          type: Activity.Login
        }
      ]
    })
  return user;
}