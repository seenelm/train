import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from "react-native-config";
import { getToken } from "./actions";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Config.API_URL}/api`,
    // baseUrl: "http://192.168.1.59:3000/api",
    prepareHeaders: async (headers, { getState }) => {
      const token = await getToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // tagTypes: ["Group"], // add this line
  endpoints: (builder) => ({}),
});
