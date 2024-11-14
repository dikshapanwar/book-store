import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../utils/baseUrl";

// Define the base query with proper configuration
const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/news`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Define the booksApi using createApi
const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery,
  tagTypes: ["News"],
  endpoints: (builder) => ({
    // Fetch all books
    fetchAllNews: builder.query({
      query: () => "/get-news",
      providesTags: ["News"],
    }),

    // Fetch book by ID
    fetchNewsByID: builder.query({
      query: (id) => `/get-one/${id}`,
      providesTags: (result, error, id) => [{ type: "News", id }],
    }),

    // Add a new book
    addNews: builder.mutation({
      query: (newNews) => ({
        url: `/create-news`,
        method: "POST",
        body: newNews,
      }),
      invalidatesTags: ["News"],
    }),

    // Update a book by ID
    updateNews: builder.mutation({
      query: ({ id, updatedNews }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: updatedNews, // Fix: corrected from `rest` to `updatedBook`
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "News", id }],
    }),

    // Delete a book by ID
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "News", id }],
    }),
  }),
});

// Exporting the hooks for the defined endpoints
export const {
useFetchAllNewsQuery,
useFetchNewsByIDQuery,
useAddNewsMutation,
useUpdateNewsMutation,
useDeleteNewsMutation,
} = newsApi;

export default newsApi;
