import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/orders/orderApi";
import { useAuth } from "../../context/AuthContext";

function Order() {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    error,
  } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders && orders.length > 0 ? (
        <div>
          {orders.map((order, index) => (
            <div key={order._id} className="border p-4 mb-4">
              <p className="bg-yellow-300 w-5 rounded-full">#{index + 1}</p>
              <h3 className="text-lg font-semibold mb-2">
                Order ID: {order._id}
              </h3>
              <p className="text-gray-600">Email: {order.email}</p>
              <p className="text-gray-600">Order Status: {order.phone}</p>
              <h3 className="text-gray-600">
                Address:
                <p> {order.address.city}</p>
              </h3>
              <p className="text-gray-600">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Total Amount: ${order.totalPrice}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">No orders found.</h2>
        </div>
      )}
    </div>
  );
}

export default Order;
