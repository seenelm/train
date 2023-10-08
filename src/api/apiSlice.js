import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./actions";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.59:3000/api",
    prepareHeaders: async (headers, { getState }) => {
      const token = await getToken();
      console.log("Prepare Headers Token: ", token);
      if (token) {
        headers.set("Authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
