"use strict";
import container from '../../../container/container.js';
import responseStatus from '../../../../util/responseStatus.js';

class registrationController {
  constructor() {
    this.driverService = container.resolve('driverService');
  }
  driveDataCreate = async (req, res) => {
    try {
      const userImage = req.uploadedFiles;
      const result = await this.driverService.createDriver(req.body, userImage);
      const { code, message } = responseStatus.getStatus('CREATED', 'registration successful.');
      return res.status(code).send({ status: code, message, data: result });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }
}

export default new registrationController();
