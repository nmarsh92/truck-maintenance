import { HTTP_STATUS_CODES } from "../constants/http";
import { HttpError } from "./http-error";

/***
 *  500 internal server error.
 */
export class UnauthorizedError extends HttpError {
  constructor(message = 'User is not authorized.') {
    super(message, HTTP_STATUS_CODES.UNAUTHORIZED);
    this.name = 'UnauthorizedError';
  }
}