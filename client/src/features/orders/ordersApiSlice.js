import { apiSlice } from "../apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createNewOrder: builder.mutation({
            query: (data) => ({
                url: "/api/v1/orders",
                method: "POST",
                body: { ...data },
                credentials: "include"
            })
        })
    })
});

export const { useCreateNewOrderMutation } = ordersApiSlice;