import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CheckOut() {
  const [isChecked, setIsChecked] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // Sample current user data (replace this with your actual user object)
  const currentUser = {
    email: "user@example.com"
  };
  
  const cartItems = useSelector(state => state.cart.cartItem);
  const totalPrice = cartItems.reduce((total, item) => total + item.newPrice * item.quantity, 0);
  
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };
  
  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
          <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
          <p className="text-gray-500 mb-6">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>

          {cartItems.length > 0 && (
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    {/* Full Name */}
                    <div className="md:col-span-5">
                      <label htmlFor="name">Full Name</label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">Full name is required</p>}
                    </div>

                    {/* Email */}
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        disabled
                        defaultValue={currentUser?.email}
                      />
                    </div>

                    {/* Phone */}
                    <div className="md:col-span-5">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        {...register("phone", { required: true })}
                        type="text"
                        id="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">Phone number is required</p>}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        {...register("address", { required: true })}
                        type="text"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">Address is required</p>}
                    </div>

                    {/* City */}
                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        {...register("city", { required: true })}
                        type="text"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    {/* Checkbox */}
                    <div className="md:col-span-5 mt-3">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          {...register("terms", { required: true })}
                          className="form-checkbox"
                          onChange={() => setIsChecked(!isChecked)}
                        />
                        <label htmlFor="terms" className="ml-2">
                          I agree to the{" "}
                          <Link to="/terms" className="underline text-blue-600">Terms & Conditions</Link> and{" "}
                          <Link to="/policy" className="underline text-blue-600">Shopping Policy</Link>.
                        </label>
                      </div>
                      {errors.terms && <p className="text-red-500 text-xs mt-1">You must agree to the terms</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-5 text-right">
                      <button
                        type="submit"
                        disabled={!isChecked}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Place an Order
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CheckOut;
