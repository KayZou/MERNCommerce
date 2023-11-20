import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const ordersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
        credentials: "include",
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation
} = ordersSlice;
