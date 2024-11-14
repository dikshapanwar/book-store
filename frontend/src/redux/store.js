import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cart/cartSlice';
import booksApi from './books/bookApi';
import ordersApi from './orders/orderApi';
import favoritesReducer from './books/Favroute';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    fav:favoritesReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer, 

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware,ordersApi.middleware), 
});

export default store;
