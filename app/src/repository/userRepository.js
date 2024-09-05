// service/global/globalService.js
"use strict";
import userModel from '../../model/userModel.js';
import userMetaModel from '../../model/userMetaModel.js';

class userRepository {
  constructor() {

  }
  async findPhone(phone) {
    const existingUser = await userModel.findOne({ phone });
    return !!existingUser;
  }

  async findByEmail(email) {
    const existingUser = await userModel.findOne({ email });
    return !!existingUser;
  }
  async insertDriver(userData) {
    try {
      return userModel.create(userData);
    }
    catch (error) {
      throw new Error(error);
    }
  }
  async findUserById(id) {
    try {
      return await userModel.findOne({ _id: id }).select('-password');
    } catch (error) {
      throw new Error(error);
    }
  }

}


export default new userRepository();