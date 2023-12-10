import { apiSlice } from "./apiSlice";

export const searchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      findUsers: builder.query({
        query: (search) => {
          return {
            url: `/users?search=${search}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

// const searchResult = searchApi.endpoints.findUsers.select();

export const { useFindUsersQuery } = searchApi;
