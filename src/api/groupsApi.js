import { apiSlice } from "./apiSlice";
import { createSelector } from "@reduxjs/toolkit";

export const groupsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      addGroup: builder.mutation({
        query: ({ name, userId }) => {
          return {
            url: `/groups`,
            method: "POST",
            body: { name, userId },
          };
        },
        invalidatesTags: (result, error, { userId }) => [
          { type: "Groups", id: userId },
        ],
      }),
      deleteGroup: builder.mutation({
        query: ({ groupId, roleId, userId }) => {
          return {
            url: `/groups/${groupId}`,
            method: "DELETE",
            body: { roleId, userId },
          };
        },
        invalidatesTags: (result, error, { userId }) => [
          { type: "Groups", id: userId },
        ],
      }),
    };
  },
});

const selectGroups = groupsApi.endpoints.addGroup.select();

export const selectAddGroup = createSelector(
  selectGroups,
  (groups) => groups?.newGroup
);

// Optionally, you can create a selector for deleteGroup as well, if needed.

export const { useAddGroupMutation, useDeleteGroupMutation } = groupsApi;
