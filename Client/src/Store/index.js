import { configureStore } from "@reduxjs/toolkit";
import { categorieSlice } from "../Slice/Filter/categorieSlice";

const store = configureStore({
  reducer: {
    categories: categorieSlice.reducer
  },
});

export default store;
