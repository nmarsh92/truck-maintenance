import { checkSchema } from 'express-validator';
import { validate } from '../validator';

/**
 * Validate request based on provided rules.
 */
export const createTruckValidator = validate(checkSchema({
  fleet: {
    in: ['body'],
    errorMessage: 'Fleet must be provided',
    isString: {
      errorMessage: 'Fleet must be a string',
      bail: true
    },
    notEmpty: {
      errorMessage: 'Fleet must not be empty',
      bail: true
    },
  },
}));
