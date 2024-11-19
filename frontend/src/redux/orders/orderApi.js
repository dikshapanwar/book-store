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
    // Get ALl Ordrers
    getAllOrders: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ["Orders"]
}),

    // Get one order
    fetchOrderByID: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),
  }),
});
 export const { useCreateOrderMutation,useGetOrderByEmailQuery,useGetAllOrdersQuery,useFetchOrderByIDQuery} = ordersApi;

export default ordersApi;
