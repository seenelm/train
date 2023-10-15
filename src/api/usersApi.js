import { apiSlice } from "./apiSlice";
import { createSelector } from "@reduxjs/toolkit";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      fetchGroups: builder.query({
        query: (userId) => {
          return {
            url: `/users/${userId}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

const selectGroups = usersApi.endpoints.fetchGroups.select();
console.log("Select Groups: ", selectGroups);

export const selectUserGroups = createSelector(selectGroups, (user) => {
  console.log("User Selector: ", user);
  return user?.groups;
});

// export const selectUserGroupsById = (userId) =>
//   createSelector(
//     [(state) => usersApi.endpoints.fetchGroups.select(userId)(state)],
//     (user) => user?.groups
//   );

export const { useFetchGroupsQuery } = usersApi;
