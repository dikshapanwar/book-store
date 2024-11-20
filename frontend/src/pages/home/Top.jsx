import React, { useState } from "react";
import Card from "../book/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/books/bookApi";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAddWishlistMutation, useRemoveWishlistMutation } from "../../redux/wishlist/WishlistApi";

function Top() {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const { data: books = [], isLoading, error } = useFetchAllBooksQuery();
  const favorites = useSelector((state) => state.fav.favorites);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("user_id");
  
  // Add and remove wishlist mutations from wishlistApi
  const [addWishlist] = useAddWishlistMutation();
  const [removeWishlist] = useRemoveWishlistMutation();

  const isBookInWishlist = (bookId) => {
    return favorites.some((book) => book._id === bookId); // Check local state
  };

  const handleWishlistToggle = async (book) => {
    if (!userId) {
      alert("Please log in to add items to your wishlist.");
      return;
    }
    if (isBookInWishlist(book._id)) {
      try {
        await removeWishlist({ user_id: userId, product_id: book._id });
      } catch (error) {
        console.error("Error removing book from wishlist:", error);
      }
    } else {
      try {
        await addWishlist({ productId: book._id, user_id: userId });
        console.log("Book added to wishlist:", book._id);
      } catch (error) {
        console.error("Error adding book to wishlist:", error);
      }
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
                  onClick={() => handleWishlistToggle(book)} // Toggle wishlist on heart icon click
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
