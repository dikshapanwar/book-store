// In your WishlistApi.js (or equivalent file)
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/wishlist`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery,
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    // Add a book to the wishlist
    addWishlist: builder.mutation({
      query: ({ productId, userId }) => ({
        url: `/add-wishlist`,
        method: "POST",
        body: { product_id: productId, user_id: userId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
    // Remove a book from the wishlist
    removeWishlist: builder.mutation({
      query: ({ productId, userId }) => ({
        url: `/remove/${productId}`, // or `/wishlist/remove/${productId}`
        method: "DELETE",
        body: { product_id: productId, user_id: userId }, // Passing both product_id and user_id
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const { useAddWishlistMutation, useRemoveWishlistMutation } =
  wishlistApi;
export default wishlistApi;
