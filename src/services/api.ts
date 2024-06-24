import axios from "axios";
import { apiUrl } from "../common/config";
import { getToken } from "../api/actions";

const api = axios.create({
  // baseURL: `${apiUrl}/api`,
  baseURL: "http://10.0.0.203:3000/api"
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
