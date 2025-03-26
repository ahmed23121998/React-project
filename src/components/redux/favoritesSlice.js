import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      if (state.favorites.find((item) => item.id === movie.id)) {
        state.favorites = state.favorites.filter(
          (item) => item.id !== movie.id
        );
      } else {
        state.favorites.push(movie);
      }
    },
    remove: (state, action) => {
      const movie = action.payload;
      state.favorites = state.favorites.filter((item) => item.id !== movie.id);
    },
  },
});

export const { toggleFavorite, remove } = favoritesSlice.actions;
export default favoritesSlice.reducer;
