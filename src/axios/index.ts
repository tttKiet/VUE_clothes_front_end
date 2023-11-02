import axios, { AxiosRequestHeaders } from "axios";
import { userLoginStore } from "@/pinia/store";
const instance = axios.create({
  withCredentials: true,
  // baseURL: "http//:localhost:8080"
});

// Request interceptor for API calls
instance.interceptors.request.use(
  async (config) => {
    const { accessToken } = userLoginStore();

    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    } as AxiosRequestHeaders;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { saveToken, logout } = userLoginStore();
      return instance
        .post("/api/v1/auth/refresh")
        .then((response) => {
          saveToken(response.data.data.accessToken);
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.access_token;
          return instance(error.response.config);
        })
        .catch((error2) => {
          console.log("error2", error2);
          // logout
          logout();
          return Promise.reject(error2);
        });
    }
    return Promise.reject(error);
  },
);


export default instance;
