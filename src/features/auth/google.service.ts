import { TokenPayload } from "google-auth-library";
import jws from "jws";
import { Environment } from "../../shared/environment";
export const getCode(googlePayload: TokenPayload): string => {
  return jws.sign({
    header: { alg: "HS256" },
    payload: {
      sub: googlePayload.sub,
      redirect_uri: "http://localhost:8080/api/auth/google",
      clientId: "truck_maintenance",
      exp: Date.now() + (1000 * 30),
      iat: Date.now()
    },
    secret: Environment.getInstance().authSecret,
  })
}