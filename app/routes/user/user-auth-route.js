"use strict";
import configApi from '../../../config/configApi.js';
import userTokenVerify from '../../middleware/auth/userTokenVerify.js';
import RegistrationValidation from '../../middleware/validation/registrationValidation.js';
import globalController from '../../src/controller/global/globalController.js';
import userAuthController from '../../src/controller/user/auth/userAuthController.js';

//
const { apiPrefixUser } = configApi;
export default function setupAuthRoutes(app) {
    app.post(`${apiPrefixUser}/login`,RegistrationValidation.userLoginValidation,userAuthController.userAuth);
    app.post(`${apiPrefixUser}/sendOtp`,  globalController.sendOtpToMail);
 }
 