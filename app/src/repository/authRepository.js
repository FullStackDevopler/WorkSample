"use strict";
import userModel from '../../model/userModel.js';
import roleModel from '../../model/roleModel.js';
import loginHistory from '../../model/loginHistory.js';
import bcrypt from 'bcryptjs';

class authRepository {
  constructor() {
    //
  }

  async userLogin(userEmail, password, type) {
    try {
      const user = await userModel.findOne({ email: userEmail });
      if (!user) {
        return !!user;
      }
      if (user.isActive == false || user.isBlocked == true) {
        return { status: 'INACTIVE' };
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return !!passwordMatch;
      }
      const roleId = user.role_id;
      const roleData = await roleModel.findById({ _id: roleId });
      if (roleData.role_slug !== type) {
        return false;
      }
      return {
        userId: user._id,
        username: user.full_name,
        email: user.email,
        role: roleData.role_slug,
        isActive: user.isActive,
        isBlocked: user.isBlocked,
      };
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async createLoginHistory(data) {
    try {
      return loginHistory.create(data);
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async updateLoginHistory(userId, token, newData) {
    try {
      return await loginHistory.findOneAndUpdate({ user_id: userId, userToken: token }, { $set: newData }, { new: true });
    }
    catch (error) {
      throw new Error(error)
    }
  }
  async checkToken(token) {
    try {
      const result = await loginHistory.findOne({ userToken: token, isBlacklist: true });
      return !!result;
    }
    catch (error) {
      throw new Error(error)
    }
  }



}

export default new authRepository();