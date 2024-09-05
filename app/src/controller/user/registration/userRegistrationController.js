"use strict";
import container from '../../../container/container.js';
import { sendSuccessResponse, sendErrorResponse } from '../../../../util/responseHandler.js';

class registrationController {
    constructor() {
        this.userService = container.resolve('userService');
    }
    driveDataCreate = async (req, res) => {
        try {
            const result = await this.userService.createUser(req.body);
            if (result.status === 'PHONE_EXIST') {
                return sendErrorResponse(res, 'EXISTING_PHONE_NUMBER');
            }
            if (result.status === 'EMAIL_EXIST') {
                return sendErrorResponse(res, 'EXISTING_EMAIL');
            }
            return sendSuccessResponse(res, 'CREATED', 'registration successful.', result);
        } catch (error) {
            return sendErrorResponse(res, 'INTERNAL_SERVER_ERROR', error.message);
        }
    }
}

export default new registrationController();
