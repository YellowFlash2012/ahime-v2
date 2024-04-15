import { apiSlice } from "../apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createNewOrder: builder.mutation({
            query: (data) => ({
                url: "/api/v1/orders",
                method: "POST",
                body: { ...data },
                credentials: "include",
            }),
        }),
        getSingleOrderDetails: builder.query({
            query: (id) => ({
                url: `/api/v1/orders/${id}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 7,
        }),
        payOrder: builder.mutation({
            query: ({id, details}) => ({
                url: `/api/v1/orders/${id}/paid`,
                method: "PUT",
                body: { ...details },
                credentials: "include",
            }),
        }),
        getPaypalClientID: builder.query({
            query: (id) => ({
                url: "/api/config/paypal",
                credentials: "include",
            }),
            keepUnusedDataFor: 7,
        }),
        getAllMyOrders: builder.query({
            query: () => ({
                url: "/api/v1/orders/my-orders",
                credentials: "include",
            }),
            keepUnusedDataFor: 7,
        }),
        getAllOrdersByAdmin: builder.query({
            query: () => ({
                url: "/api/v1/orders",
                credentials: "include",
            }),
            keepUnusedDataFor: 7,
        }),
    }),
});

export const { useCreateNewOrderMutation, useGetSingleOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIDQuery,useGetAllMyOrdersQuery, useGetAllOrdersByAdminQuery } = ordersApiSlice;