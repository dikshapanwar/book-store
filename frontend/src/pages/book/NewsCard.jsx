import React from 'react';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImageUrl';

function NewsCard({ news }) {
    const plainTextDescription = news.description.replace(/<[^>]*>/g, ''); // Remove HTML tags

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
            {/* Content */}
            <div className="py-4">
                <Link to={`/news/${news.id}`}>
                    <h3 className="text-lg font-medium hover:text-blue-800 mb-4">{news.title}</h3>
                    <span>{news.createdAt}</span>
                </Link>
                <div className="w-14 h-[5px] bg-primary mb-5"></div>
                <p className="text-sm text-gray-800">{plainTextDescription}</p>
            </div>
            <div className="flex-shrink-0 mb-3">
                <img src={getImgUrl(news.image)} alt={news.title} className="w-full object-cover" />
            </div>
        </div>
    );
}

export default NewsCard;
