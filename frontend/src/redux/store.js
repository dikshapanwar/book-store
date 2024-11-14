import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cart/cartSlice';
import booksApi from './books/bookApi';
import ordersApi from './orders/orderApi';
import favoritesReducer from './books/Favroute'
import bookReducer from './books/bookS;lice';
import newsApi from './news/newsApi';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    fav:favoritesReducer,
    books:bookReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer, 
    [newsApi.reducerPath]: newsApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware,ordersApi.middleware,newsApi.middleware), 
});

export default store;
