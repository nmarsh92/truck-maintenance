import jwt, { JwtPayload } from "jsonwebtoken";
import { Environment } from "../../shared/environment";
import { UnauthorizedError } from "../../shared/errors/unauthorized";

const environment = Environment.getInstance();

export const validateAccessToken = (accessToken: string, clientIdRequired: boolean, clientId?: string): JwtPayload => {
  if (!accessToken) throw new UnauthorizedError("Access token is required.");
  if (clientIdRequired && !clientId) throw new UnauthorizedError("Client id required.");
  const decoded = jwt.decode(accessToken, { complete: true }) as { payload: JwtPayload } | null;
  if (!decoded || !decoded.payload) throw new UnauthorizedError("Invalid access token.");
  let verified: JwtPayload | null = null;
  const { payload } = decoded;

  if (clientId) {
    // If clientId is provided, verify the token with the specific client secret
    verified = <JwtPayload>jwt.verify(accessToken, environment.getSecret(clientId), {
      subject: payload.sub,
      audience: environment.audience,
      issuer: environment.issuer,
    });

    if (!verified) throw new UnauthorizedError("Invalid access token.");
  } else {
    if (!payload.client_id) throw new UnauthorizedError("Invalid access token");
    // If clientId is not provided, just verify the token without specific client secret
    verified = <JwtPayload>jwt.verify(accessToken, environment.getSecret(payload.client_id), {
      subject: payload.sub,
      audience: environment.audience,
      issuer: environment.issuer,
    });


  }
  if (!verified) throw new UnauthorizedError("Invalid access token.");
  return verified;
};