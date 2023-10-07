import { createSlice } from "@reduxjs/toolkit";
import { addGroup } from "./addGroup";
import { fetchGroups } from "./fetchGroups";
import { apiSlice } from "../../api/apiSlice";
import { createSelector } from "@reduxjs/toolkit";

export const extendedGroupsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      fetchGroups: builder.query({
        query: ({ userId, token }) => {
          return {
            url: `/users/${userId}`,
            method: "GET",
            headers: {
              Authorization: `bearer ${token}`,
            },
          };
        },
      }),
    };
  },
});

const selectGroups = extendedGroupsSlice.endpoints.fetchGroups.select();

export const selectUserGroups = createSelector(
  selectGroups,
  (user) => user.groups
);

export const { useFetchGroupsQuery } = extendedGroupsSlice;

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    name: "",
    groups: [],
    errors: {},
    loading: false,
    success: null,
  },
  reducers: {
    setGroupName: (state, action) => {
      state.name = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(addGroup.pending, (state, action) => {
      state.loading = true;
      state.success = null;
    });
    builder.addCase(addGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = {};
      state.success = action.payload;
      state.groups = [...state.groups, action.payload.newGroup];
    });
    builder.addCase(addGroup.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
      state.success = null;
    });
    builder.addCase(fetchGroups.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchGroups.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = {};
      state.groups = action.payload.groups;
    });
    builder.addCase(fetchGroups.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
      state.groups = [];
    });
  },
});

export const { setGroupName } = groupsSlice.actions;
export const groupsReducer = groupsSlice.reducer;
