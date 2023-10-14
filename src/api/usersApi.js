import { apiSlice } from "./apiSlice";
import { createSelector } from "@reduxjs/toolkit";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      fetchGroups: builder.query({
        query: ({ userId, token }) => {
          return {
            url: `/users/${userId}`,
            method: "GET",
          };
        },
        providesTags: (result, error, args) => [
          { type: "Groups", id: args.userId },
        ],
      }),
    };
  },
});

const selectGroups = usersApi.endpoints.fetchGroups.select();

export const selectUserGroups = createSelector(
  selectGroups,
  (user) => user.groups
);

export const { useFetchGroupsQuery } = usersApi;
