"use strict";
import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt.js';

class generateToken {
    constructor() {

    }

    async createToken(user, type) {
        try {
            // Access Token
            const accessToken = jwt.sign(
                { userId: user.userId, email: user.email, role: user.role, type: type },
                jwtConfig.JWT_SECRET, {
                expiresIn: '15d', // 60m shorter lifespan for access token
                //algorithm: 'RS256',
            });

            // Refresh Token
            const refreshToken = jwt.sign(
                { userId: user.userId, email: user.email, role: user.role, type: type },
                jwtConfig.JWT_SECRET, {
                expiresIn: '30d', // longer lifespan for refresh token
                //algorithm: 'RS256',
            });

            let responseObj = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: {
                    userId: user.userId,
                    email: user.email,
                    role: user.role,
                    isActive: user.isActive,
                    isBlocked: user.isBlocked,
                },
            }
            return responseObj;
        } catch (error) {
            console.error('Error generating tokens:', error);
            throw error;
        }
    }

    async getNewAccessToken(req, res) {
        try {
            const { refreshToken } = req.body;
            const decoded = jwt.verify(refreshToken, jwtConfig.JWT_SECRET);
            const user = await getUserById(decoded.userId);
            if (!user) {
                return !!user;
            }
            const newAccessToken = this.createToken(user);
            let responseObj = {
                accessToken: newAccessToken,
                refreshToken: refreshToken,
                user: {
                    userId: user.userId,
                    email: user.email,
                    isActive: user.isActive,
                    isBlocked: user.isBlocked,
                },
            }
            return responseObj;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


}
export default new generateToken();
