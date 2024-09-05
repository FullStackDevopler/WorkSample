"use strict";
import container from '../../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../../util/responseHandler.js';

class GlobalController {
  constructor() {
    this.roleService = container.resolve('roleService');
  }

  viewRole = async (req, res) => {
    try {
      const result = await this.roleService.viewRoleList(req.body);
      return sendSuccessResponse(res, 'OK', result);
    } catch (error) {
      return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR');

    }
  }


}
export default new GlobalController();
