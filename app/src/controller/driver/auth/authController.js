"use strict";
import container from '../../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../../util/responseHandler.js';
import roleConstants from '../../../../util/roleConstants.js';

class authController {
  constructor() {
    this.authService = container.resolve('authService');
    this.driverService = container.resolve('driverService');
    this.generateToken = container.resolve('generateToken');
  }

  //login with username and password
  driverAuth = async (req, res) => {
    const { email, password } = req.body;
    const type = roleConstants.USER.slug;
    try {
      const user = await this.authService.loginWithEmail(email, password, type);
      if (user.status === 'INACTIVE') {
        return sendErrorResponse(res, 'USER_IS_NOT_ACTIVE');
      }
      if (user) {
        const userToken = await this.generateToken.createToken(user, type);
        await this.authService.saveLoginHistory(userToken);
        return sendSuccessResponse(res, 'OK', 'registration successful.', userToken);
      }
      else {
        return sendErrorResponse(res, 'UNAUTHORIZED');
      }

    } catch (error) {
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }
 //get driver profile
  getDriverProfile = async (req, res) => {
    try {
      const result = await this.driverService.Profile(req);
      return sendSuccessResponse(res, 'OK', 'Success.', result);
    } catch (error) {
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);

    }
  }

  //for logout 
  driverLogOut = async (req, res) => {
    const userId = req.body.user_id;
    const authHeader = req.headers.authorization;
    try {
      await this.authService.logOut(userId, authHeader);
      return sendSuccessResponse(res, 'OK', 'Logout Success');
    } catch (error) {
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }

}
export default new authController();
