import axios, { AxiosError, AxiosHeaders } from "axios";
import { BASE_URL, PERSIST_STORAGE } from "./api.constant";
import { getToast } from "utils";
import { TOAST_MESSAGE } from "constants/common";

const unAuthorised = [401];

const axiosInstance = axios.create({
  timeout: 6000,
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!navigator.onLine) {
      getToast("error", TOAST_MESSAGE.NO_INTERNET);
    }
    let token = "";
    let persisData = localStorage.getItem(PERSIST_STORAGE);
    if (persisData) {
      let authSlice = JSON.parse(persisData);
      let authStore = JSON.parse(authSlice?.authSlice);
      token = authStore?.token;
    }
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error instanceof AxiosError &&
      unAuthorised.includes(error?.response?.status || 0)
    ) {
      localStorage.clear();
      window.location.href = "/login?success=un-auth";
    } else {
      getToast("error", error?.response?.data?.error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
