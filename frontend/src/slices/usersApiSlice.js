import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation
} = usersApiSlice;
