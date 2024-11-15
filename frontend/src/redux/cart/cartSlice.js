import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItem: JSON.parse(localStorage.getItem("cart")) || [], // Initialize from local storage if available
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.cartItem.find(item => item._id === action.payload._id);
      if (!existingItem) {
        state.cartItem.push({ ...action.payload, quantity: 1 });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Product already in cart",
          icon: "warning",
          confirmButtonText: "OK!",
        });
      }
      // Save to local storage
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },
    removeItem: (state, action) => {
      state.cartItem = state.cartItem.filter(item => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItem)); // Save updated cart
    },
    clearItem: (state) => {
      state.cartItem = [];
      localStorage.setItem("cart", JSON.stringify(state.cartItem)); // Clear cart in local storage
    },
    initializeCart: (state, action) => {
      state.cartItem = action.payload;
    },
  },
});

export const { addItem, removeItem, clearItem, initializeCart } = cartSlice.actions;
export default cartSlice.reducer;
