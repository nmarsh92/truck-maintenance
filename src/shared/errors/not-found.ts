import { HTTP_STATUS_CODES } from "../constants/http";
import { HttpError } from "./http-error";

/***
 *  404 No record found.
 */
class NotFoundError extends HttpError {
  constructor(message = 'No record found.') {
    super(message, HTTP_STATUS_CODES.NOT_FOUND);
    this.name = 'NotFoundError';

  }
}

export default NotFoundError;