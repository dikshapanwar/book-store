import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImageUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cart/cartSlice";

function Card({ book }) {
  const dispatch=useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addItem(product))
  }
  return (
    <div className="rounded-lg transition-shadow duration-300 shadow-md hover:shadow-lg p-4 max-w-xs md:max-w-sm mx-auto">
      <div className="flex flex-col md:flex-row md:items-start md:h-72 md:justify-center gap-4">
        {/* BOOK IMAGE */}
        <div className="md:h-72 md:w-56 flex-shrink-0 border rounded-md overflow-hidden">
          <Link to={`/books/${book?._id}`}>
            <img
              src={getImgUrl(book?.coverImage)}
              alt={book?.title || "Book Cover"}
              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* BOOK DETAILS */}
        <div className="flex flex-col justify-between flex-1">
          {/* Book Title */}
          <Link to={`/books/${book?._id}`}>
            <h3 className="text-xl md:text-2xl font-semibold hover:text-blue-600 mb-3 line-clamp-2">
              {book?.title}
            </h3>
          </Link>

          {/* Book Description */}
          <p className="text-gray-600 mb-5 line-clamp-3">
            {book?.description?.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book?.description}
          </p>

          {/* Price Information */}
          <p className="font-medium text-lg mb-3">
            $ {book?.newPrice}
            {book?.oldPrice && (
              <span className="line-through font-normal ml-2 text-gray-500">
                $ {book.oldPrice}
              </span>
            )}
          </p>

          {/* Add to Cart Button */}
          <button
          onClick={()=>handleAddToCart(book)}
            className="flex items-center justify-center gap-1 bg-blue-500 text-white rounded-md py-1 px-3 text-sm hover:bg-blue-600 transition-colors"
            aria-label="Add to Cart"
          >
            <FiShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
