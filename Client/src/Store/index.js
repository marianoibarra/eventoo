import { configureStore } from "@reduxjs/toolkit";
import { categorieSlice } from "../Slice/Filter/categorieSlice";

const store = configureStore({
  reducer: {
    categories: categorieSlice.reducer
  },
});

export default store;

//RECUERDA AVISARLE AL STORECOMMITER DE LOS CAMBIOS REALIZADOS EN ESTE ARCHIVO PARA QUE SUBA EL STORE DE FORMA CORRECTA.