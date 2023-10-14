import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from "react-native-config";
import { getToken } from "./actions";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Config.API_URL}/api`,
    prepareHeaders: async (headers, { getState }) => {
      const token = await getToken();

      if (token) {
        headers.set("Authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Groups"], // add this line
  endpoints: (builder) => ({}),
});
