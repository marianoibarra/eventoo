import { configureStore , getDefaultMiddleware } from "@reduxjs/toolkit";
import { categorieSlice } from "../Slice/Filter/categorieSlice";
import { UserSlice } from "../Slice/User/UserSlice";
import { eventsSlice } from "../Slice/Events/EventsSlice";
import { eventSlice } from "../Slice/CreateEvent/CreateEvent";
import { forgot } from "../Slice/ForgotPass/ForgotPassSlice";
import { recover } from "../Slice/RecoverPass/RecoverPassSlice";
import { eventDetailSlice } from "../Slice/EventDetail/EventDetailSlice";
import { combinedFilterSlice } from "../Slice/Filter/combinedFilterSlice";
import { locationSlice } from "../Slice/Location/LocationSlice";
import { locationIpSlice } from "../Slice/Location/locationIpSlice";
import { bankAccountSlice } from "../Slice/BankAcount/BankAcount";
import { adminSlice } from "../Slice/Admin/AdminSlice";
import {newFilterSlice} from "../Slice/newFilter/newFilterSlice";
import { favoritesSlice } from "../Slice/Favorites/FavoritesSlice";
import { eventsManagementSlice } from "../Slice/eventsManagement/eventsManagementSlice";
import { premiumEvents } from "../Slice/PremiumEvents/PremiumEventsSlice";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  reducer: {
    categories: categorieSlice.reducer,
    user: UserSlice.reducer,
    premiumEvents: premiumEvents.reducer,
    events: eventsSlice.reducer,
    event: eventSlice.reducer,
    forgot: forgot.reducer,
    recover: recover.reducer,
    eventDetail: eventDetailSlice.reducer,
    combinedFilter: combinedFilterSlice.reducer,
    locationSlice: locationSlice.reducer,
    locationIpSlice:locationIpSlice.reducer,
    bankAccounts: bankAccountSlice.reducer,
    admin:adminSlice.reducer,
    newFilter: newFilterSlice.reducer,
    favorites: favoritesSlice.reducer,
    eventsManagement: eventsManagementSlice.reducer
  },
});

export default store;

//RECUERDA AVISARLE AL STORECOMMITER DE LOS CAMBIOS REALIZADOS EN ESTE ARCHIVO PARA QUE SUBA EL STORE DE FORMA CORRECTA.
