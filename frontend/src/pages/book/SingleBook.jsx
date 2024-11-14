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


  if (isLoading) return <div>Loading...</div>;

  // Render error state
  if (isError || !book?.data) {
    return <div>Error loading book info</div>;
  }

  const bookData = book.data;

  return (
    <div className="max-w-lg shadow-md p-5">
      <h1 className="text-2xl font-bold mb-6">{bookData.title}</h1>
      <div>
        <div>
          <img
            src={getImgUrl(bookData.coverImage)}
            alt={bookData.title}
            className="mb-8"
          />
        </div>
        <div className="mb-5">
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong> {bookData.author || "admin"}
          </p>
          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {bookData.category}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> {bookData.description}
          </p>
        </div>

        <button
          onClick={() => handleAddToCart(bookData)}
          className="btn-primary px-6 space-x-1 flex items-center gap-1"
        >
          <FiShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
