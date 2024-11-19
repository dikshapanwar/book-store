import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../../redux/orders/orderApi";
import { FaEye } from "react-icons/fa";
function AllOrder() {
  const navigate = useNavigate();
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-4">Loading orders...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-4">
        Failed to load orders. Please try again later.
      </p>
    );
  }

  // Pagination logic
  const totalOrders = orders?.length || 0;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Orders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-900 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Customer Name</th>
              <th className="py-3 px-6 text-left">Customer Email</th>
              <th className="py-3 px-6 text-left">Customer Phone</th>
              <th className="py-3 px-6 text-left">Products</th>
              <th className="py-3 px-6 text-left">Total Amount</th>
              <th className="py-3 px-6 text-left">Order Date</th>
              {/* <th className="py-3 px-6 text-center">Actions</th> */}
            </tr>
          </thead>
          <tbody className="text-gray-900 text-sm font-light">
            {currentOrders?.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{order._id}</td>
                <td className="py-3 px-6">{order.name}</td>
                <td className="py-3 px-6">{order.email}</td>
                <td className="py-3 px-6">{order.phone}</td>
                <td className="py-3 px-6">
                  {order.productIds?.map((product, index) => (
                    <div
                      key={index}
                      className="mb-2 text-gray-800 flex items-center space-x-2"
                    >
                      <span>{product.title}</span>
                    </div>
                  ))}
                </td>
                <td className="py-3 px-6">{`$${order.totalPrice.toFixed(
                  2
                )}`}</td>
                <td className="py-3 px-6">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => navigate(`/dashboard/order/${order._id}`)}
                    className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`py-2 px-4 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`py-2 px-4 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`py-2 px-4 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllOrder;
