import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cart/cartSlice";
import { getImgUrl } from "../../utils/getImageUrl";
import { useFetchBookByIDQuery } from "../../redux/books/bookApi";

const SingleBook = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const dispatch = useDispatch();
  const { data: book, isLoading, isError } = useFetchBookByIDQuery(id);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;

  // Render error state
  if (isError || !book?.data) {
    return (
      <div className="text-center text-xl text-red-500">
        Error loading book info
      </div>
    );
  }

  const bookData = book.data;

  return (
    <div className="max-w-screen-lg mx-auto p-8">
      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12">
        {/* Image Section (Top on small screens, Right on large screens) */}
        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src={getImgUrl(bookData.coverImage)}
            alt={bookData.title}
            className="w-full h-96 md:h-[400px] lg:h-[500px] max-w-full object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
        </div>

        {/* Content Section (Left on large screens, Bottom on small screens) */}
        <div className="w-full md:w-1/2 text-gray-800">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {bookData.title}
          </h1>

          {/* Description */}
          <p className="text-lg mb-6">{bookData.description}</p>
          <div className="text-lg mb-6">
            <span className="font-semibold">Category:</span>{" "}
            <span>{bookData.category}</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-6 mb-6">
            <p className="text-2xl font-bold text-gray-900">
              ${bookData.newPrice}
            </p>
            {bookData.oldPrice && (
              <p className="text-sm text-gray-600 line-through">
                ${bookData.oldPrice}
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(bookData)}
            className="btn-primary flex items-center gap-2 py-3 px-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200"
          >
            <FiShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
