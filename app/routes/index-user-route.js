"use strict";
import authRoutes from './user/user-auth-route.js';
import registrationRoutes from './user/user-registration-route.js';
const setupUserRoutes = (app) => {
     registrationRoutes(app);
     authRoutes(app);
};
export default setupUserRoutes;