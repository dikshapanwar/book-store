import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../utils/baseUrl";

// Define the base query with proper configuration
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/books`,
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
const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    // Fetch all books
    fetchAllBooks: builder.query({
      query: () => "/",
      providesTags: ["Books"],
    }),

    // Fetch book by ID
    fetchBookByID: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),

    // Add a new book
    addBook: builder.mutation({
      query: (newBook) => ({
        url: `/create-book`,
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    // Update a book by ID
    updateBook: builder.mutation({
      query: ({ id, updatedBook }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: updatedBook, // Fix: corrected from `rest` to `updatedBook`
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Books", id }],
    }),

    // Delete a book by ID
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Books", id }],
    }),
  }),
});

// Exporting the hooks for the defined endpoints
export const {
  useFetchAllBooksQuery,
  useFetchBookByIDQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;

export default booksApi;
