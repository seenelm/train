import { apiSlice } from "./apiSlice";
import { createSelector } from "@reduxjs/toolkit";

export const groupsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      addGroup: builder.mutation({
        query: ({ name, userId }) => ({
          url: `/groups`,
          method: "POST",
          body: { name, userId },
        }),
        async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
          try {
            const { data: createdGroup } = await queryFulfilled;
            console.log("Mutation successful:", createdGroup);

            dispatch(
              apiSlice.util.updateQueryData("fetchGroups", userId, (data) => {
                if (data && data.groups) {
                  data.groups.push(createdGroup);
                }
              })
            );
          } catch (error) {
            console.log(error);
          }
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
