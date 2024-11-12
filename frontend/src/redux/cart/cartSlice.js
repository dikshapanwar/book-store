import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';

const initialState = {
  cartItem: [],
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
    },
    removeItem: (state, action) => {
      state.cartItem = state.cartItem.filter(item => item._id !== action.payload);
    },
    clearItem: state => {
      state.cartItem = [];
    },
  },
});

export const { addItem, removeItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;
