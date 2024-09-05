"use strict";
import bcrypt from 'bcryptjs';
import globalHelper from '../../helper/globalHelper.js';
import userRepository from '../repository/userRepository.js';
import roleRepository from '../repository/roleRepository.js';
import roleConstants from '../../util/roleConstants.js';

class userService {
    constructor() {
        this.helper = new globalHelper();
    }

    async getRole(slug) {
        const roleData = await roleRepository.getRolebySlug(slug);
        return roleData;
    }
    async createUser(data) {
        console.log("hii");
        if (await userRepository.findPhone(data.phone)) {
            console.log("findPhone");
            return { status: 'PHONE_EXIST' };
        }
        console.log("hii2");
        if (await userRepository.findByEmail(data.email)) {
            console.log("findByEmail");
            return { status: 'EMAIL_EXIST' };
        }

        const roleSlugToCheck = roleConstants.USER;
        const existingRole = await this.getRole(roleSlugToCheck.slug);
        console.log(existingRole)
        const driverData = {
            full_name: data.full_name,
            phone: data.phone,
            email: data.email,
            role_id: existingRole._id,
            password: bcrypt.hashSync(data.password, 8),
            isActive: true,
            isBlocked: false,
            isVerify: false
        }

        try {
            const insertDriverData = await userRepository.insertDriver(driverData);
            return {
                user_id: insertDriverData._id,
                phone: data.phone,
                isUser: true
            };
        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async Profile(req) {
        try {
            return await userRepository.findUserById(req.user.userId);
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }

    }


}

export default new userService();