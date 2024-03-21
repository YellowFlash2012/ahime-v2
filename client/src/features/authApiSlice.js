import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/api/v1/users/login",
                method: "POST",
                
                body:data,
            }),
            
        }),
        
    }),
});

export const { useLoginMutation } = authApiSlice;
