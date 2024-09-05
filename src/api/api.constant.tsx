// export const BASE_URL = "http://3.111.233.200:8090"; //Development URL
// export const BASE_URL = "http://192.168.1.19:8090"; // Local network URL
export const BASE_URL = "https://kindraapi.developmentrecords.com"; //Production URL

export const API_PREFIX = "/api/v1/admin";
export const PERSIST_STORAGE = "persist:root";

export const APIS = {
  GET_USERS: "/view/user",
  LOGIN: "/login",
  VERIFY_OTP: "/verify/otp",
  RESEND_OTP: "/resend/otp",
  USER_LISTING: "/view/user",
  UPDATE_USER: "/update/user",
  GET_USER_BY_ID: "/user/details",
  DRIVER_LISTING: "/view/driver",
  BLOCK_USER: "/block",
  UN_BLOCK_USER: "/unblock",
  GET_DRIVER_LISTING: "/view/driver",
  UPDATE_DRIVER: "/update/driver",
  GET_DRIVER_BY_ID: "/driver/details",
  GET_NEW_DRIVER: "/new/driver",
  GET_CMS: "/view/cms",
  UPDATE_CMS: "/cms",
  ACCEPT_DRIVER: "/verify/driver",
  REJECT_DRIVER: "/reject/driver",
  CHANGE_PASSWORD: "/changepassword",
};
