// SearchPage.js (React)

import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchPage() {
  const location = useLocation();
  const books = location.state ? location.state.books : []; // Get books passed via state

  return (
    <div>
      <h2>Search Results</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="books-list">
          {books.map((book) => (
            <div key={book._id} className="book-item">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              {/* Other book details */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
