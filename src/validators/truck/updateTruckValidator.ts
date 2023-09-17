import { checkSchema } from 'express-validator';
import { validate } from '../validator';

/**
 * Validate request based on provided rules.
 */
export const updateTruckValidator = validate(checkSchema({
  id: {
    in: ['params'],
    errorMessage: 'Id must be provided',
    isString: {
      errorMessage: 'Id must be a string',
      bail: true
    },
    notEmpty: {
      errorMessage: 'Id must not be empty',
      bail: true
    },
  },
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
  version: {
    in: ['body'],
    errorMessage: 'Version must be provided',
    isInt: {
      errorMessage: 'Version must be an integer',
      options: {
        min: 0
      },
      bail: true
    },
    notEmpty: {
      errorMessage: 'Version must not be empty',
      bail: true
    },
  }
}));
