import { apiSlice } from "./apiSlice";
import { createSelector } from "@reduxjs/toolkit";

export const groupsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      fetchGroup: builder.query({
        query: (groupId) => {
          return {
            url: `/groups/${groupId}`,
            method: "GET",
          };
        },

        transformResponse: (response) => {
          console.log("Fetch Group Response: ", response);
          return response;
        },
      }),
      updateGroupProfile: builder.mutation({
        query: ({ groupId, groupBio, groupName, accountType }) => {
          return {
            url: `/groups/${groupId}/profile`,
            method: "PUT",
            body: { groupBio, groupName, accountType },
          };
        },
      }),

      joinGroup: builder.mutation({
        query: ({ groupId }) => {
          return {
            url: `/groups/${groupId}/join`,
            method: "PUT",
          };
        },
      }),

      requestGroup: builder.mutation({
        query: ({ groupId }) => {
          return {
            url: `/groups/${groupId}/request`,
            method: "POST",
          };
        },
      }),

      groupRequests: builder.query({
        query: ({ userId }) => {
          return {
            url: `/groups/${userId}/requests`,
            method: "GET",
          };
        },
      }),

      deleteGroup: builder.mutation({
        query: ({ groupId, roleId, userId }) => {
          return {
            url: `/groups/${groupId}`,
            method: "DELETE",
            body: { roleId, userId },
          };
        },
      }),
    };
  },
});

export const {
  useAddGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupProfileMutation,
  useFetchGroupQuery,
  useJoinGroupMutation,
  useRequestGroupMutation,
  useGroupRequestsQuery,
} = groupsApi;
