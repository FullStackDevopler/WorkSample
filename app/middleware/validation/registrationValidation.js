import { checkSchema, validationResult } from 'express-validator';
import ResponseStatus from '../../util/responseStatus.js';

class RegistrationValidation {
  static rejectIfInvalid(req, res, next) {
    const errors = validationResult(req).array();
    if (errors && Array.isArray(errors) && errors.length > 0) {
      const errorMessages = errors.map((errElem) => errElem.msg);
      const { code, message } = ResponseStatus.getStatus('BAD_REQUEST');
      return res.status(code).send({
        status: 'failed',
        message,
        error: errorMessages,
      });
    }
    return next();
  }

  static async registrationStep1(req, res, next) {
    await checkSchema({
      role_id: {
        errorMessage: 'role id required',
        isString: true,
        trim: true,
      },
      first_name: {
        errorMessage: 'first name required',
        isString: true,
        trim: true,
      },
      last_name: {
        errorMessage: 'last name required',
        isString: true,
        trim: true,
      },
      username: {
        errorMessage: 'username required',
        isString: true,
        trim: true,
      },
      phone: {
        errorMessage: 'phone required',
        isString: true,
        trim: true,
        isLength: {
          options: { min: 10, max: 12 }, // Adjust min and max values as needed
          errorMessage: 'Phone number must be between 10 and 12 characters.',
        },
      },
      email: {
        errorMessage: 'email required',
        isEmail: true,
        trim: true,
      },
      password: {
        errorMessage: 'password is required and should be at least 8 characters long',
        isString: true,
        isLength: { options: { min: 8 } },
        trim: true,
      },
      dob: {
        errorMessage: 'dob is required and should be a valid date',
        isString: true,
        trim: true,
      },
    }).run(req);
    RegistrationValidation.rejectIfInvalid(req, res, next);
  }

  static async userLoginValidation(req, res, next) {
    await checkSchema({
      email: {
        errorMessage: 'email id required',
        isEmail: true,
        isString: true,
        trim: true,
      },
      password: {
        errorMessage: 'password is required and should be at least 8 characters long',
        isString: true,
        isLength: { options: { min: 8 } },
        trim: true,
      },

    }).run(req);
    RegistrationValidation.rejectIfInvalid(req, res, next);
  }

  static async phoneNumberValidation(req, res, next) {
    await checkSchema({
      phone: {
        errorMessage: 'phone required',
        isString: true,
        trim: true,
        isLength: {
          options: { min: 10, max: 12 }, // Adjust min and max values as needed
          errorMessage: 'Phone number must be between 10 and 12 characters.',
        },
      },

    }).run(req);
    RegistrationValidation.rejectIfInvalid(req, res, next);
  }
}
export default RegistrationValidation;
