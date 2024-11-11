import React, { useEffect, useState } from "react";

import Card from "../book/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay,Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
function Top() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Choose  a genre ");
  useEffect(() => {
    fetch("book.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const category = [
    "Choose  a genre ",
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
    selectedCategory === "Choose  a genre "
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase()
        );

  // console.log(filterBooks);
  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
      {/* CATEGORY FILTERS */}
      <div className=" mb-7 flex items-center">
        <select
          name="category"
          id="category"
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border bg-[#EAEAEA] border-gray-700 rounded-md px-2 py-1"
        >
          {category.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>

      {/* BOOKS */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },

          1280: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper"
      >
        {filterBooks.length > 0 &&
          filterBooks.map((book, index) => {
            return (
              <SwiperSlide key={index}>
                <Card book={book} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default Top;
