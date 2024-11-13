import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../utils/baseUrl";
import { createOrder } from "../../../../backend/src/order/order.controller";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    // Fetch all orders
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
    // Fetch orders by email
    getOrderByEmail: builder.query({
     query: (email) => ({
        url: `/email/${email}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    
  }),
});
 export const { useCreateOrderMutation,useGetOrderByEmailQuery} = ordersApi;

export default ordersApi;
