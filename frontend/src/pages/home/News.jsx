import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import { Link } from 'react-router-dom';
import { useFetchAllNewsQuery } from '../../redux/news/newsApi';
import Loading from '../../components/Loading';
import NewsCard from '../book/NewsCard';

function News() {
    const { data, isLoading, error } = useFetchAllNewsQuery();
    const news = data?.news || []; // Destructure news from the response object

    if (isLoading) return <Loading />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="py-12">
            <h2 className="text-3xl font-semibold mb-6">News</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
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
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {news.length > 0 ? (
                    news.map((newsItem, index) => (
                        <SwiperSlide key={index}>
                            <NewsCard news={newsItem} />
                        </SwiperSlide>
                    ))
                ) : (
                    <p>No news available</p>
                )}
            </Swiper>
        </div>
    );
}

export default News;
