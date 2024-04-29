import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/api/v1/users/login",
                method: "POST",
                body: data,
                credentials:"include"
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "/api/v1/users",
                method: "POST",
                body: data,
                credentials:"include"
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/api/v1/users/logout",
                method: "POST",
                credentials:"include"
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: "/api/v1/users/profile",
                method: "PUT",
                credentials:"include"
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "/api/v1/users",
        
                credentials:"include"
            }),
            providesTags: ["Users"],
            keepUnusedDataFor:7
        }),
        getOneUser: builder.query({
            query: (id) => ({
                url: `/api/v1/users/${id}`,
        
                credentials:"include"
            }),
        }),
        deleteOneUser: builder.mutation({
            query: (id) => ({
                url: `/api/v1/users/${id}`,
                method:"DELETE",
                credentials:"include"
            }),
        }),
        
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation,useProfileMutation,useGetAllUsersQuery,useGetOneUserQuery, useDeleteOneUserMutation } = authApiSlice;
