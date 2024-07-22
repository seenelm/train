import axios from "axios";
import { apiUrl } from "../common/config";
import { getToken } from "../api/actions";

const api = axios.create({
  //baseURL: `${apiUrl}/api`,
  baseURL: "http://192.168.1.24:3000/api"
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
