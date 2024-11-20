import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSearchBooksQuery } from "../redux/books/bookApi";
import { getImgUrl } from "../utils/getImageUrl";

const SearchResults = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const title = queryParams.get("title");

  const { data, isLoading, isError } = useSearchBooksQuery(title);

  // Debugging: Log the response data to check its structure
  useEffect(() => {
    console.log("Search Data:", data);  // Logs the API response when data is updated
  }, [data]);

  // Check for loading state
  if (isLoading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  // Check for error state
  if (isError) {
    return <div className="text-center p-6 text-red-600">Error fetching books. Please try again.</div>;
  }

  // Debugging: Check if 'data' is available
  if (!data) {
    console.error("No data returned from API.");
    return <div>No data available. Something went wrong.</div>;
  }

  // Now 'data' is an array of books, directly map over it
  if (Array.isArray(data)) {
    if (data.length > 0) {
      // Display books in cards if available
      return (
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-semibold text-center mb-8">Search Results for "{title}"</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((book) => (
              <div key={book._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img 
                  src={getImgUrl(book.coverImage)} 
                  alt={book.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
                  <p className="text-gray-600 text-sm mt-2">{book.description}</p>
                  <p className="text-lg font-bold mt-4">Price: ${book.newPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Handle case where books array is empty
      return <div className="text-center p-6">No books found for "{title}".</div>;
    }
  } else {
    // If 'data' is not an array, show an error
    console.error("Data is not an array:", data);
    return <div className="text-center p-6 text-red-600">Error: Invalid data format.</div>;
  }
};

export default SearchResults;
