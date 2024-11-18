import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite, initializeFavorites } from '../../redux/books/Favroute';
import { getImgUrl } from '../../utils/getImageUrl';
import axios from 'axios';
import getBaseUrl from '../../utils/baseUrl';

function Wishlist() {
  const favorites = useSelector((state) => state.fav.favorites);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

 
  const handleAddToWishlist = async (userId, productId) => {
    try {
      const response = await axios.post(`${getBaseUrl()}api/wishlist/wishlist`, { user_id: userId, product_id: productId });
      console.log('Product added to wishlist:', response.data);
      // Optionally, you can update the local state or notify the user
    } catch (err) {
      setError(err.response ? err.response.data : 'Server error');
      console.error('Error adding product to wishlist:', err);
    }
  };

  // Remove favorite from local storage and Redux store
  const handleRemoveFavorite = (bookId) => {
    dispatch(removeFavorite(bookId)); // This will also update local storage
  };

  return (
    <div className="wishlist-container">
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>

      {/* Display error message if there is any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Check if there are no favorites */}
      {favorites.length === 0 ? (
        <p className="text-lg text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((book) => (
            <div key={book._id} className="card rounded-lg shadow-md p-4">
              <img
                src={getImgUrl(book?.coverImage)}
                alt={book.title}
                className="w-full h-45 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-2">{book.title}</h3>
              <p className="text-gray-600">{book.description.slice(0, 100)}...</p>
              <p className="font-medium mt-2">${book.newPrice}</p>

              {/* Add to wishlist button */}
              <button
                onClick={() => handleAddToWishlist('user-id-placeholder', book._id)} // Replace with actual user ID
                className="text-blue-500 hover:text-blue-600 mt-2"
              >
                Add to Wishlist
              </button>

              {/* Remove from wishlist button */}
              <button
                onClick={() => handleRemoveFavorite(book._id)}
                className="text-red-500 hover:text-red-600 mt-2"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
