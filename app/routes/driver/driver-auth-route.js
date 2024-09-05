"use strict";
import configApi from '../../../config/configApi.js';
import authController from '../../src/controller/driver/auth/authController.js';
import verifyTokenMiddleware from '../../middleware/auth/verifyTokenMiddleware.js';
import RegistrationValidation from '../../middleware/validation/registrationValidation.js';
import globalController from '../../src/controller/global/globalController.js';

//
const { apiPrefix } = configApi;
export default function setupAuthRoutes(app) {
    app.post(`${apiPrefix}/login`,RegistrationValidation.userLoginValidation,authController.driverAuth);
    app.post(`${apiPrefix}/profile`,verifyTokenMiddleware, authController.getDriverProfile);
    app.post(`${apiPrefix}/logout`,verifyTokenMiddleware, authController.driverLogOut);
}
 