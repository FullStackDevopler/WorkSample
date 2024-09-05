"use strict";
import bcrypt from 'bcryptjs';
import globalHelper from '../../helper/globalHelper.js';
import driverRepository from '../repository/driverRepository.js';
import roleRepository from '../repository/roleRepository.js';
import roleConstants from '../../util/roleConstants.js';

class driverService {
    constructor() {
        this.helper = new globalHelper();
    }

    async isPhoneExists(phone) {
        const existingUser = await driverRepository.findPhone(phone);
        return !!existingUser;
    }

    async isEmailExists(email) {
        const existingUser = await driverRepository.findEmail(email);
        return !!existingUser;
    }

    async isUsernameExists(username) {
        const existingUser = await driverRepository.findUserName(username);
        return !!existingUser;
    }
    async getRole(slug) {
        const roleData = await roleRepository.getRolebySlug(slug);
        return roleData;
    }
    async createDriver(data) {
        const roleSlugToCheck = roleConstants.DRIVER;
        const existingRole = await this.getRole(roleSlugToCheck.slug);
        const driverData = {
            full_name: data.full_name,
            phone: data.phone,
            email: data.email,
            dob: data.dob,
            gender: data.gender,
            //photo:data.photo,
            role_id: existingRole._id,
            password: bcrypt.hashSync(data.password, 8),
            isActive: true,
            isBlocked: false,
            isVerify: false
        }
        try {
            const insertDriverData = await driverRepository.insertDriver(driverData);
            const driverMetaData = {
                user_id: insertDriverData._id,
                address1: data.address1,
                address2: data.address2,
                city: data.city,
                state: data.state,
                zipcode: data.zipcode,
            }
            await driverRepository.insertMetaModel(driverMetaData);
            return {
                driver_id: insertDriverData._id,
                phone: data.phone,
                isDriver: true
            };
        }
        catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    async Profile(req) {
        try {
            return await driverRepository.findUserById(req.user.userId);

        } catch (error) {
            console.error(error)
            throw new Error(error)
        }

    }


}

export default new driverService();