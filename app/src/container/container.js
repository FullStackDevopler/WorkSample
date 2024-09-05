"use strict";
import serviceLocator from './serviceLocator.js';
import driverService from '../service/driverService.js';
import authService from '../service/authService.js';
import roleService from '../service/roleService.js';
import userService from '../service/userService.js';

//import helper
import redisServerHelper from '../../redis/redisServerHelper.js';
import globalHelper from './../../helper/globalHelper.js';
import mailServiceHelper from './../../helper/mailServiceHelper.js';
import generateToken from '../../helper/generateToken.js';

//import twilioServiceHelper from '../../helper/twilioServiceHelper.js';

//register service
serviceLocator.register('authService', authService);
serviceLocator.register('driverService', driverService);
serviceLocator.register('roleService', roleService);
serviceLocator.register('userService', userService);

//register helper
serviceLocator.register('redisServerHelper', redisServerHelper);
serviceLocator.register('globalHelper', globalHelper);
serviceLocator.register('generateToken', generateToken);
serviceLocator.register('mailServiceHelper', mailServiceHelper);

export default serviceLocator;