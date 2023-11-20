import { PRODUCTS_URL, UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({keyword, pageNumber}) => ({
        url: PRODUCTS_URL,
        params:{
          keyword,
          pageNumber
        },
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `${PRODUCTS_URL}/${product._id}`,
        method: "PUT",
        credentials: "include",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query:(data)=>({
        url: `/api/upload`,
        method: "POST",
        credentials: "include",
        body: data
      })
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    createReview:  builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body:data,
        credentials: "include",
      }),
      invalidatesTags: ["Product"]
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery
} = productsApiSlice;
