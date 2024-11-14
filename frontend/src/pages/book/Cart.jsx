import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearItem, removeItem } from '../../redux/cart/cartSlice';
import { getImgUrl } from '../../utils/getImageUrl';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItem);
  const totalPrice = cartItems.reduce((total, item) => total + item.newPrice * item.quantity, 0);

  // Function to handle clearing the cart
  const handleClearCart = () => {
    dispatch(clearItem());
  };

  // Function to handle removing an item
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id)); 
    
  };

  return (
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="text-lg font-medium text-gray-900">Shopping cart</div>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="ml-3 bg-red-500 text-white rounded-md py-1 px-2 hover:bg-secondary transition-all duration-200"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Cart Items */}
        <div className="mt-8">
          <div className="flow-root">
            {cartItems.length > 0 ? (
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map(item => (
                  <li key={item._id} className="flex py-6">
                    {/* Product Image */}
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={item?.title}
                        src={getImgUrl(item?.coverImage)}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/product/${item._id}`}>{item.title}</Link>
                          </h3>
                          <p className="sm:ml-4">${item.newPrice}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 capitalize">
                          <strong>Category:</strong> {item.category}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">
                          <strong>Qty:</strong> {item.quantity}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No products in the cart</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        {cartItems.length > 0 && (
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
        )}
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
            Continue Shopping &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
