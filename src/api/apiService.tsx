import axiosInstance from "./baseServie";

export const ApiService = {
  fetchService(params: any) {
    return new Promise((resolve, reject) => {
      axiosInstance(params)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },
};
