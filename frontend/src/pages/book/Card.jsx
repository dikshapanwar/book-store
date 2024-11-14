import React from 'react'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getImgUrl } from '../../utils/getImageUrl'
import { addItem } from '../../redux/cart/cartSlice'
import { addFavorite } from '../../redux/books/Favroute'

const Card = ({ book }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAddToCart = (product) => {
        dispatch(addItem(product))
    }

    const handleAddToFavorites = (book) => {
        // Logic to add to favorites goes here
        dispatch(addFavorite(book));
        navigate('/wishlist');
        console.log('Added to favorites:', book);
    }

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
                    <div className="flex gap-2">
                        {/* Heart button */}
                        <button
                            onClick={() => handleAddToFavorites(book)}
                            className="text-red-500 hover:text-red-600 p-2 rounded-full border border-red-500 hover:border-red-600 transition-all duration-200"
                        >
                            <FiHeart className="w-6 h-6" />
                        </button>

                        {/* Add to Cart button */}
                        <button
                            onClick={() => handleAddToCart(book)}
                            className="btn-primary text-sm py-1 px-2 flex items-center gap-1 mb-2 border rounded-md transition-all duration-200"
                        >
                            <FiShoppingCart className="w-5 h-5" />
                           
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;
