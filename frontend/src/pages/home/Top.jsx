import React, { useState } from "react";
import Card from "../book/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/books/bookApi";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/books/Favroute";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Top() {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const { data: books = [], isLoading, error } = useFetchAllBooksQuery();

  // Redux state for favorites
  const favorites = useSelector((state) => state.fav.favorites);
  const dispatch = useDispatch();

  // Function to check if a book is already in the wishlist
  const isBookInWishlist = (bookId) => {
    return favorites.some((book) => book._id === bookId);
  };

  // Function to handle adding/removing from wishlist
  const handleWishlistToggle = (book) => {
    if (isBookInWishlist(book._id)) {
      dispatch(removeFavorite(book._id));
    } else {
      dispatch(addFavorite(book));
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categories = [
    "Choose a genre",
    "Action",
    "Adventure",
    "Comedy",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
    "Western",
  ];

  const filterBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) =>
            book.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="py-10">
      <h2 className="text-2xl font-semibold mb-6">Top Sellers</h2>

      {/* Category Selector */}
      <div className="mb-7 flex items-center">
        <select
          name="category"
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border bg-[#EAEAEA] border-gray-700 rounded-md px-2 py-1"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Swiper Component for displaying books */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 2, spaceBetween: 50 },
          1180: { slidesPerView: 3, spaceBetween: 50 },
          1280: { slidesPerView: 3, spaceBetween: 50 },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {filterBooks.length > 0 ? (
          filterBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                {/* Book Card */}
                <Card book={book} />

                {/* Heart icon for wishlist */}
                <button
                  onClick={() => handleWishlistToggle(book)}
                  className="absolute top-4 right-4 text-red-500 text-xl"
                >
                  {isBookInWishlist(book._id) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>No books found for the selected genre.</p>
        )}
      </Swiper>
    </div>
  );
}

export default Top;
