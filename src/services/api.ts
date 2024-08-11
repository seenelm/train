import axios from "axios";
import { apiUrl, chatUrl } from "../common/config";
import { getToken } from "../api/actions";

export const api = axios.create({
  baseURL: `${apiUrl}/api`,
});

export const chatApi = axios.create({
  baseURL: `${chatUrl}/chat/api`,
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


/** TODO: add in endpoints
 * 1. /conversations
 * 2. /messages
 * 3. send messages over the socket
 * 4. clean up api folders
 * 
 * 
 */
