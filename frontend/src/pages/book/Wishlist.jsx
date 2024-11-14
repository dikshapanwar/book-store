import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../../redux/books/Favroute';
import { getImgUrl } from '../../utils/getImageUrl';
import { useNavigate } from 'react-router-dom';



function Wishlist() {
  const favorites = useSelector((state) => state.fav.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveFavorite = (bookId) => {
    dispatch(removeFavorite(bookId)); 
  }

  return (
    <div className="wishlist-container">
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>

      {/* Check if there are no favorites */}
      {favorites.length === 0 ? (
        <p className="text-lg text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((book) => (
            <div key={book._id} className="card rounded-lg shadow-md p-4">
              <img
                src={`${getImgUrl(book?.coverImage)}`} // Assuming the coverImage URL is available
                alt={book.title}
                className="w-full h-45 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-2">{book.title}</h3>
              <p className="text-gray-600">{book.description.slice(0, 100)}...</p>
              <p className="font-medium mt-2">${book.newPrice}</p>

              {/* Remove button */}
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