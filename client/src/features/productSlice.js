import { apiSlice } from "./apiSlice";

export const productsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url:"/api/v1/products"
            }),
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
    })
})

export const { useGetAllProductsQuery,useGetOneProductQuery,useAddNewProductMutation } = productsSlice;