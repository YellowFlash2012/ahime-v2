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
        logout: builder.mutation({
            query: () => ({
                url: "/api/v1/users/logout",
                method: "POST",
                credentials:"include"
            }),
        }),
        
    }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
