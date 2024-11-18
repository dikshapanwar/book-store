import React, { useEffect, useState } from "react";
import { useGetOrderByEmailQuery } from "../../redux/orders/orderApi";
import { useAuth } from "../../context/AuthContext";

function Order() {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    error,
  } = useGetOrderByEmailQuery(currentUser.email);

  const [products, setProducts] = useState([]);

  // Fetch product details using the product IDs in the orders
  useEffect(() => {
    if (orders.length > 0) {
      const productIds = orders[0].productIds; // Get productIds from the first order (you can loop over if multiple orders)
      
      // Fetch product details for each productId
      const fetchProducts = async () => {
        const fetchedProducts = await Promise.all(
          productIds.map((productId) => {
            return fetch(`/api/orders/${productId}`) // Replace with the correct API call
              .then((response) => response.json())
              .catch((err) => console.error("Error fetching product:", err));
          })
        );
        setProducts(fetchedProducts);
      };
      fetchProducts();
    }
  }, [orders]);

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
                <p>{order.address.city}</p>
              </h3>
              <h3 className="">Books:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product, productIndex) => {
                  // Check if product is available and has the expected properties
                  if (!product || !product.coverImage || !product.title) {
                    return (
                      <div key={productIndex} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-300 rounded-md">No Image</div>
                        <p>No Title</p>
                      </div>
                    );
                  }
                  return (
                    <div key={productIndex} className="flex items-center space-x-4">
                      <img
                        src={product.coverImage} // Safely access coverImage
                        alt={product.title} // Safely access title
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <p>{product.title}</p>
                    </div>
                  );
                })}
              </div>
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
