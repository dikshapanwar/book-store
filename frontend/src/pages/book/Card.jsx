import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getImgUrl } from '../../utils/getImageUrl';
import { addItem } from '../../redux/cart/cartSlice';
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { addFavorite, removeFavorite } from '../../redux/books/Favroute';


const Card = ({ book }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const favorites = useSelector((state) => state.fav.favorites);
    const isFavorite = favorites.some((favBook) => favBook._id === book._id);

    // Handle adding/removing a book from favorites
    const handleToggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(book._id)); // Remove from favorites
        } else {
            dispatch(addFavorite(book));
            navigate('/wishlist') // Add to favorites
        }
    };

    // Handle adding a book to the cart
    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        navigate('/cart');
    };

    return (
        <div className="rounded-lg transition-shadow duration-300 mt-10 w-44">
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-6">
                <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
                    <Link to={`/books/${book._id}`}>
                        <img
                            src={`${getImgUrl(book?.coverImage)}`}
                            alt=""
                            className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                    </Link>
                </div>

                <div>
                    <Link to={`/books/${book._id}`}>
                        <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                            {book?.title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 mb-5">
                        {book?.description.length > 50 ? `${book.description.slice(0, 50)}...` : book?.description}
                    </p>
                    <p className="font-medium mb-5">
                        ${book?.newPrice} <span className="line-through font-normal ml-2">$ {book?.oldPrice}</span>
                    </p>

                    {/* Buttons container */}
                    <div className="flex gap-2 items-center">
                        {/* Heart button */}
                        <button
                            onClick={handleToggleFavorite}
                            className={`p-2 rounded-full border transition-all duration-200 ${
                                isFavorite
                                    ? "text-red-600 border-red-600"
                                    : "text-red-500 border-red-500 hover:text-red-600 hover:border-red-600"
                            }`}
                        >
                            {isFavorite ? (
                                <FaHeart className="w-6 h-6" />
                            ) : (
                                <FiHeart className="w-6 h-6" />
                            )}
                        </button>

                        {/* Add to Cart button */}
                        <button
                            onClick={() => handleAddToCart(book)}
                            className="btn-primary text-sm py-1 px-2 flex items-center gap-1 border rounded-md transition-all duration-200"
                        >
                            <FiShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
