import { apiSlice } from "../../api/apiSlice";
import { storeToken } from "../../api/actions";
import { setIsLoggedIn, setUserId } from "./usersSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
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
        transformErrorResponse: (response, meta, arg) => {
          return response.data.errors;
        },
      }),
      loginUser: builder.mutation({
        query: (credentials) => {
          return {
            url: "/login",
            method: "POST",
            body: credentials,
          };
        },
        onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled;

            const token = data.token;
            const username = data.username;
            const userId = data.userId;

            await storeToken(username, token);
            dispatch(setIsLoggedIn(true));
            dispatch(setUserId(userId));
          } catch (error) {
            console.log("Error storing token: ", error);
          }
        },
        transformErrorResponse: (response, meta, arg) => {
          return response.data.errors;
        },
      }),
    };
  },
});

export const { useRegisterUserMutation, useLoginUserMutation } = usersApiSlice;
