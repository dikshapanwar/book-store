import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import getBaseUrl from "../utils/baseUrl";

function SearchResults() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query") || "";
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch books from your BookAPI when the query changes
  useEffect(() => {
    const fetchBooks = async () => {
      if (!query) return;
      
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${getBaseUrl()}/books?search=${query}`
        );
        setFilteredBooks(response.data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="max-w-screen-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <div key={book._id} className="p-4 border rounded-lg shadow-md">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <h3 className="text-lg font-semibold mt-4">{book.title}</h3>
              <p className="text-gray-600">{book.description.slice(0, 100)}...</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;
