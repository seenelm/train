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
      addGroup: builder.mutation({
        query: ({ groupName, userId }) => ({
          url: `/groups`,
          method: "POST",
          body: { groupName, userId },
        }),
        async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
          try {
            const { data: createdGroup } = await queryFulfilled;
            console.log("Mutation successful:", createdGroup);

            dispatch(
              apiSlice.util.updateQueryData("fetchGroups", userId, (groups) => {
                console.log("cached groups:", groups);
                if (groups) {
                  groups.push(createdGroup);
                }
              })
            );
          } catch (error) {
            console.log(error);
          }
        },
      }),
      updateGroupBio: builder.mutation({
        query: ({ groupId, groupBio }) => {
          return {
            url: `/groups/${groupId}/bio`,
            method: "PUT",
            body: { groupBio },
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

const selectGroups = groupsApi.endpoints.addGroup.select();

export const selectAddGroup = createSelector(
  selectGroups,
  (groups) => groups?.newGroup
);

// Optionally, you can create a selector for deleteGroup as well, if needed.

export const {
  useAddGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupBioMutation,
  useFetchGroupQuery,
} = groupsApi;
