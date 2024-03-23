import { apiSlice } from "./apiSlice";
import { createSelector } from "@reduxjs/toolkit";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      fetchGroups: builder.query({
        query: (userId) => {
          return {
            url: `/users/${userId}/groups`,
            method: "GET",
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),

      fetchUserProfile: builder.query({
        query: (userId) => {
          return {
            url: `/${userId}`,
            method: "GET",
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),
      fetchUserData: builder.query({
        query: (userId) => {
          return {
            url: `${userId}/profile-data`,
            method: "GET",
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),

      fetchFollowData: builder.query({
        query: (userId) => {
          return {
            url: `users/${userId}/followData`,
            method: "GET",
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),

      updateUserProfile: builder.mutation({
        query: ({ userId, userBio, name, accountType }) => {
          return {
            url: `users/${userId}/profile`,
            method: "PUT",
            body: { userBio, name, accountType },
          };
        },
      }),
    };
  },
});

const selectGroups = usersApi.endpoints.fetchGroups.select();

export const selectUserGroups = createSelector(selectGroups, (user) => {
  return user?.groups;
});

export const {
  useFetchGroupsQuery,
  useFetchUserProfileQuery,
  useUpdateUserProfileMutation,
  useFetchUserDataQuery,
  useFetchFollowDataQuery,
} = usersApi;
