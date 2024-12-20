import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/orders/orderApi";
import { useAuth } from "../../context/AuthContext";
import { getImgUrl } from "../../utils/getImageUrl";

function Order() {
  const { currentUser } = useAuth();

  // Check if `currentUser` or `currentUser.email` is missing
  if (!currentUser || !currentUser.email) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
        <p>Please log in to view your orders.</p>
      </div>
    );
  }

  const {
    data: orders = [],
    isLoading,
    error,
  } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   // Handle specific error cases if needed
  //   return (
  //     <div className="container mx-auto p-6 text-center text-red-500">
  //       <h2 className="text-2xl font-semibold mb-4">Error</h2>
  //       <p>Failed to fetch orders. Please try again later.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length > 0 ? (
        <div>
          {orders.map((order, index) => (
            <div key={order._id} className="border p-4 mb-4">
              <p className="bg-yellow-300 w-5 rounded-full">#{index + 1}</p>
              <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
              <p className="text-gray-600">Email: {order.email}</p>
              <p className="text-gray-600">Phone: {order.phone}</p>
              <h3 className="text-gray-600">Address: {order.address.city}</h3>
              <h3 className="mb-2">Books:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.productIds.map((product, productIndex) => (
                  <div key={productIndex} className="flex items-center space-x-4">
                    {product.coverImage ? (
                      <img
                        src={`${getImgUrl(product.coverImage)}`}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-300 rounded-md">No Image</div>
                    )}
                    <p>{product.title || "No Title"}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mt-10">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Total Amount: ₹{order.totalPrice}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">No Orders Found</h2>
          <p>You haven't placed any orders yet.</p>
        </div>
      )}
    </div>
  );
}

export default Order;
