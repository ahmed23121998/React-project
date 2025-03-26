import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import MoviesReducer from "./movies";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    sliceMovies:MoviesReducer
    
  },
});

export default store;
