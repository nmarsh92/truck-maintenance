import { HTTP_STATUS_CODES } from "../constants/http";
import { HttpError } from "./http-error";

/***
 *  400 Bad request.
 */
class BadRequestError extends HttpError {
  constructor(message = 'Bad request.') {
    super(message, HTTP_STATUS_CODES.BAD_REQUEST);
    this.name = 'BadRequestError';

  }
}

export default BadRequestError;