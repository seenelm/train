import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSelector } from "@reduxjs/toolkit";
import { storeToken } from "./actions";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.107:3000/api" }),
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
        onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled;
            await storeToken(data.token);
          } catch (err) {
            console.error("Error storing token: ", err);
          }
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

const selectUsers = apiSlice.endpoints.registerUser.select();

export const selectUserId = createSelector(selectUsers, (usersData) => {
  usersData.userId;
});

export const { useRegisterUserMutation, useLoginUserMutation } = apiSlice;
