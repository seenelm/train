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
    };
  },
});

const selectGroups = usersApi.endpoints.fetchGroups.select();

export const selectUserGroups = createSelector(selectGroups, (user) => {
  return user?.groups;
});

export const { useFetchGroupsQuery } = usersApi;
