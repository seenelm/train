import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSelector } from "@reduxjs/toolkit";
import { storeToken } from "./actions";
import {
  setUserId,
  setIsLoggedIn,
  setCheckingLoginStatus,
  setHasToken,
} from "../features/auth/usersSlice";
import * as Keychain from "react-native-keychain";
import { useDispatch } from "react-redux";
import { getToken } from "./actions";

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

        // transformResponse: async (responseData) => {
        //   //   const token = responseData.token;
        //   //   await storeToken(token).catch((error) => {
        //   //     console.log("Error storing token: ", error);
        //   //   });
        //   //   const dispatch = useDispatch();
        //   //   dispatch(setHasToken(true));
        //   //   return responseData.userId;
        // },
        transformErrorResponse: (response, meta, arg) => {
          return response.data.errors;
        },
        // onQueryStarted: async (args, { dispatch }) => {
        //   try {
        //     const credentials = getToken();
        //     console.log("Credentials: ", credentials.password);
        //     if (credentials.password) {
        //       dispatch(setUserId(credentials.username));
        //       dispatch(setIsLoggedIn(true));
        //     } else {
        //       dispatch(setIsLoggedIn(false));
        //     }
        //   } catch (error) {
        //     console.error("Error fetching credentials from Keychain:", error);
        //     dispatch(setIsLoggedIn(false));
        //   }
        // },
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

// export const selectUserId = (state, userId) => userId;
const selectUsers = apiSlice.endpoints.registerUser.select();

export const selectUserId = createSelector(selectUsers, (usersData) => {
  usersData.userId;
});

export const { useRegisterUserMutation, useLoginUserMutation } = apiSlice;
