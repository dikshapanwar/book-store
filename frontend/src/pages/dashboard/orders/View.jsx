import React from 'react';
import { useFetchOrderByIDQuery } from '../../../redux/orders/orderApi';
import { useParams } from 'react-router-dom';

function View() {
  const { id } = useParams(); // Get the ID from the URL parameters
  const { data: orders, isLoading, isError, error } = useFetchOrderByIDQuery(id); // Fetch order by ID

  // Loading state
  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  // Error state
  if (isError) {
    return <div className="text-center p-4 text-red-500">Error: {error.message}</div>;
  }

  // Print the order details
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {orders ? (
        <div>
          <h2 className="text-2xl font-semibold text-center mb-6">Order Details</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <p><strong>Order ID:</strong> {orders._id}</p>
              <p><strong>Customer Name:</strong> {orders.name}</p>
            </div>

            <div className="flex justify-between">
              <p><strong>Order Date:</strong> {new Date(orders.createdAt).toLocaleDateString()}</p>
              {/* <p><strong>Status:</strong> {orders.status}</p> */}
            </div>

            <h3 className="text-xl font-medium mt-6">Items:</h3>
            {orders.productIds.map((order, index) => (
              <div key={index} className="border-b py-2">
                <p><strong>Product ID:</strong> {order._id}</p>
                <p><strong>Book Title:</strong> {order.title}</p>
                <p><strong>Price:</strong> {order.newPrice}</p>
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <p className="font-semibold"><strong>Total Price:</strong> ${orders.totalPrice}</p>
            </div>
          </div>

          {/* Print Button */}
          <div className="text-center mt-8">
            <button 
              onClick={handlePrint} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              Print Order Details
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-4">No order data available</div>
      )}
    </div>
  );
}

export default View;
