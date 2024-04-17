import { apiSlice } from "./apiSlice";

export const productsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url:"/api/v1/products"
            }),
            providesTags:["Products"],
            keepUnusedDataFor:5
        }),
        
        getOneProduct: builder.query({
            query: (id) => ({
                url:`/api/v1/products/${id}`
            }),
            keepUnusedDataFor:5
        }),
        
        addNewProduct: builder.mutation({
            query: () => ({
                url: "/api/v1/products/",
                method: "POST",
                credentials:"include"
            }),
            invalidatesTags: ["Product"],
            
        }),
        
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/api/v1/products/${data._id}`,
                method: "PUT",
                body:data,
                credentials:"include"
            }),
            invalidatesTags: ["Products"],
            
        }),
    })
})

export const { useGetAllProductsQuery,useGetOneProductQuery,useAddNewProductMutation, useUpdateProductMutation } = productsSlice;