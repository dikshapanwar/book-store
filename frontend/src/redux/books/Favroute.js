import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            const book = action.payload;
            // Check if the book is already in the favorites list
            const exists = state.favorites.some(fav => fav._id === book._id);
            if (!exists) {
                state.favorites.push(book);
            }
        },
        removeFavorite: (state, action) => {
            const bookId = action.payload;
            state.favorites = state.favorites.filter(fav => fav._id !== bookId);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
