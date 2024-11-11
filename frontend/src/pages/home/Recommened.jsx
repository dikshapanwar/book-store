import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import Card from '../book/Card';

function Recommened() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("book.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommened For You</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
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
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {books.length > 0 &&
          books.slice(8,18).map((book, index) => {
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

export default Recommened;
