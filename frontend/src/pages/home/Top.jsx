import React, { useState } from "react";
import Card from "../book/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/books/bookApi";

function Top() {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  // Fetching books data using Redux Toolkit Query
  const { data: books = [], isLoading, error } = useFetchAllBooksQuery();
 // console.log(books);
  // Handling loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Category filter options
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

  // Filtering books based on selected category
  const filterBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) =>
            book.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>

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
          delay: 2500,
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
              <Card book={book} />
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
