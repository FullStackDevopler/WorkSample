
"use strict";
import container from '../../../src/container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../util/responseHandler.js';
class globalController {
  constructor() {
    this.authService = container.resolve('authService');
    this.driverService = container.resolve('driverService');
    this.generateToken = container.resolve('generateToken');
  }

  sendOtpToMail = async (req, res) => {
    const { phoneNumber } = req.body;
    try {
      //  const user = await this.authService.loginWithPhoneNumber(phoneNumber);
    } catch (error) {
       return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR');

    }
  }
}

export default new globalController();
