import axios from "axios";
import { BASE_URL, API_PREFIX } from "./api.constant";
import axiosInstance from "./baseServie";
// import { ApiService } from "./apiService";

export const getApi = async (api: any) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${BASE_URL}${API_PREFIX}${api}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const postApi = (api: any, data: any, isFormData: any = false) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(
        `${BASE_URL}${API_PREFIX}${api}`,
        { ...data },
        isFormData && {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
