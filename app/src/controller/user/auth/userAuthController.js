"use strict";
import container from '../../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../../util/responseHandler.js';
import roleConstants from '../../../../util/roleConstants.js';
class userAuthController {
  constructor() {
    this.authService = container.resolve('authService');
    this.userService = container.resolve('userService');
    this.generateToken = container.resolve('generateToken');
  }

  //login with username and password
  userAuth = async (req, res) => {
    const { email, password } = req.body;
    const type = roleConstants.USER.slug;
    try {
      const user = await this.authService.loginWithEmail(email, password, type);
      if (user.status === 'INACTIVE') {
        return sendErrorResponse(res, 'USER_IS_NOT_ACTIVE');
      }
      console.log(user.status) //LOGIN_FAILED
      if (user.status == 'LOGIN_FAILED') {
        return sendErrorResponse(res, 'NOUSERFOUND', 'No User Found!');
      }

      if (user) {
        const userToken = await this.generateToken.createToken(user, type);
        await this.authService.saveLoginHistory(userToken);
        return sendSuccessResponse(res, 'OK', 'Login successful.', userToken);
      }
      else {
        return sendErrorResponse(res, 'NOUSERFOUND', "No User Found!");
      }

    } catch (error) {
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
    }
  }



  //for logout 
  userLogOut = async (req, res) => {
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
export default new userAuthController();
