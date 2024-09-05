"use strict";
import globalHelper from '../../helper/globalHelper.js';
import authRepository from '../repository/authRepository.js';
import mailServiceHelper from '../../helper/mailServiceHelper.js';
import moment from 'moment';
const mailServiceHelperInstance = new mailServiceHelper();

class authService {
  constructor() {
    this.helper = new globalHelper();

  }
  async generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  async loginWithEmail(userEmail, password, type) {
    try {
      const getData = await authRepository.userLogin(userEmail, password, type);
      if (getData) {
        const otp = await this.generateOTP();
        await mailServiceHelperInstance.sendMailWithOTP(userEmail, 'Login OTP', otp);
        return {
          status: 'OTP_SENT',
          data: {
            userData: getData,
            otp: otp,
          }
        };
      } else {
        return {
          status: 'LOGIN_FAILED',
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }


  async saveLoginHistory(data) {
    try {
      const userData = {
        user_id: data.user.userId,
        userToken: data.accessToken,
        deviceType: null,
        deviceId: null,
        isActive: true,
        isBlacklist: false,
        lastLogin: moment().format('DD-MM-YYYY hh:mm:ss A'),
      }
      const insert = await authRepository.createLoginHistory(userData);
      return insert;

    }
    catch (error) {
      throw new Error(error)
    }
  }

  async logOut(userId, authHeader) {
    const token = authHeader.substring(7);
    const newData = {
      isActive: false,
      isBlacklist: true,
    }
    try {
      const result = await authRepository.updateLoginHistory(userId, token, newData);
      return result;
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async checkBlackListToken(authHeader) {
    const token = authHeader.substring(7);
    try {

      return await authRepository.checkToken(token);

    }
    catch (error) {
      throw new Error(error)
    }
  }


}

export default new authService();