import React from "react";
import { useParams } from "react-router-dom";
import { useFetchNewsByIDQuery } from "../../redux/news/newsApi";
import { getImgUrl } from "../../utils/getImageUrl";

const SingleBook = () => {
  const { id } = useParams();
  const { data: response, isLoading, isError } = useFetchNewsByIDQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !response?.success) return <div>Error loading blog post</div>;

  const news = response.news;

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-center">{news.title}</h1>

      {/* Metadata */}
      <div className="text-gray-500 text-sm text-center mb-6">
        <p>
          <strong>Published on:</strong> {new Date(news.createdAt).toLocaleDateString()}
        </p>
        {news.tags && (
          <p>
            <strong>Tags:</strong> {news.tags.join(", ")}
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-shrink-0 md:w-1/3">
          <img
            src={getImgUrl(news.image)}
            alt={news.title}
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>

        {/* Description Section */}
        <div className="md:w-2/3 text-gray-800">
          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: news.description }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t mt-8 pt-4 text-gray-500 text-sm">
        <p>
          <strong>Last updated:</strong> {new Date(news.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default SingleBook;
