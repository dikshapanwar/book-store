import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteNewsMutation,
  useFetchAllNewsQuery,
} from "../../../redux/news/newsApi";

const ManageNews = () => {
  const navigate = useNavigate();
  const { data, refetch, isLoading, isError } = useFetchAllNewsQuery();
  const [deleteNews] = useDeleteNewsMutation();

  // Handle deleting a news item
  const handleDeleteNews = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this news article?"
      );
      if (!confirmDelete) return;

      await deleteNews(id).unwrap();
      alert("News article deleted successfully!");
      await refetch();
    } catch (error) {
      console.error("Failed to delete news:", error?.message);
      alert("Failed to delete news. Please try again.");
    }
  };

  // Handle navigating to Edit News page
  const handleEditClick = (id) => {
    navigate(`/dashboard/edit-news/${id}`);
  };

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.news) return <div>Failed to load news articles.</div>;

  const { news } = data;

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">#</th>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Title</th>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Description</th>
                  
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Published Date</th>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.length > 0 ? (
                  news.map((article, index) => (
                    <tr key={article._id} className="border-b">
                      <td className="px-6 py-4 text-xs text-left">{index + 1}</td>
                      <td className="px-6 py-4 text-xs">{article.title}</td>
                      <td className="px-6 py-4 text-xs">{article.description}</td>
                      
                      <td className="px-6 py-4 text-xs">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-xs space-x-4">
                      
                        <button
                          onClick={() => handleDeleteNews(article._id)}
                          className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No news articles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageNews;
