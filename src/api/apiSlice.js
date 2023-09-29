import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.59:3000/api" }),
  endpoints: (builder) => {
    return {
      registerUser: builder.mutation({
        query: ({ username, password, name }) => {
          return {
            url: "/register",
            method: "POST",
            body: {
              username: username,
              password: password,
              name: name,
            },
          };
        },

        transformResponse: (responseData) => {
          return responseData.userId;
        },
        transformErrorResponse: (response, meta, arg) => {
          return response.data.errors;
        },
      }),
      loginUser: builder.mutation({
        query: ({ username, password }) => {
          return {
            url: "/login",
            method: "POST",
            body: {
              username: username,
              password: password,
            },
          };
        },
        transformResponse: (responseData) => {
          return responseData.userId;
        },
        transformErrorResponse: (response, meta, arg) => {
          return response.data.errors;
        },
      }),
    };
  },
});

export const { useRegisterUserMutation, useLoginUserMutation } = apiSlice;
