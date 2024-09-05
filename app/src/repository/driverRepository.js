// service/global/globalService.js
"use strict";
import userModel from '../../model/userModel.js';
import userMetaModel from '../../model/userMetaModel.js';

class driverRepository {
  constructor() {

  }
  async findPhone(phone) {
    const existingUser = await userModel.findOne({ phone });
    return !!existingUser;
  }

  async findEmail(email) {
    const existingUser = await userModel.findOne({ email });
    return !!existingUser;
  }

  async findUserName(username) {
    const existingUser = await userModel.findOne({ username });
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
  async insertMetaModel(data) {
    try {
      return await userMetaModel.create(data);
    } catch (error) {
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


export default new driverRepository();